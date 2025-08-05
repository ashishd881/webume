import pdf from 'pdf-parse'
import {clerkClient} from "@clerk/clerk-sdk-node"
import { userInfo } from "../models/userInfo.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import axios from "axios"

export const setData =  async(req,res)=> {
   try {
    const userId = req.userId
   //  console.log(userId)
    const resumeLocalPath = req.file?.path
    if(!resumeLocalPath)
      res.json({success:false,message:"Resume local path not found"})

    const resumeCloudinaryLink = await uploadOnCloudinary(resumeLocalPath)

    if(!resumeCloudinaryLink)
      res.json({success:false,message:"Resume cloudinary link not found"})
    const user = await clerkClient.users.getUser(userId);
        
        // Return clean user data
        
    const userData = await userInfo.create({
      clerkId:userId,
      userName:user.username,
      email:user.emailAddresses[0]?.emailAddress,
      resumelink:resumeCloudinaryLink.url ||""

    })


   //  console.log(userData)
   //  
   //  const {resume} = req.body
   //  console.log(resume)
    res.json({success:true,user:userData,message:"Resume uploaded"})
   } catch (error) {
        console.error("Error in setData:", error);
        res.status(500).json({ success: false, message: "Server error" });
   }

}


export const pdfparser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userInfo.findOne({ clerkId: userId });
    
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }
    
    const userResumeLink = user.resumelink;
    if (!userResumeLink) {
      return res.json({ success: false, message: "Resume not found" });
    }
    
    // Better URL handling
    let userNewResumeLink = userResumeLink;
    if (userResumeLink.startsWith('http://')) {
      userNewResumeLink = userResumeLink.replace('http://', 'https://');
    }
    
    // Validate URL
    try {
      new URL(userNewResumeLink);
    } catch (urlError) {
      return res.json({ success: false, message: "Invalid resume URL format" });
    }
    
    console.log("Fetching PDF from:", userNewResumeLink);
    
    const response = await axios.get(userNewResumeLink, {
      responseType: "arraybuffer",
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/pdf,*/*'
      },
      maxRedirects: 5
    });
    
    console.log("PDF fetched successfully, size:", response.data.length);
    
    const dataBuffer = Buffer.from(response.data);
    const parsed = await pdf(dataBuffer);
    
    return res.json({ success: true, text: parsed.text });
    
  } catch (error) {
    console.error("PDF Parser Error:", error);
    
    // Handle specific axios errors
    if (error.response) {
      // Server responded with error status
      return res.json({
        success: false,
        message: `HTTP Error: ${error.response.status} - ${error.response.statusText}`
      });
    } else if (error.request) {
      // Request was made but no response received
      return res.json({
        success: false,
        message: "Network error: Unable to reach the PDF URL"
      });
    } else if (error.code === 'ENOTFOUND') {
      return res.json({
        success: false,
        message: "DNS error: PDF URL not found"
      });
    } else if (error.code === 'ETIMEDOUT') {
      return res.json({
        success: false,
        message: "Timeout: PDF download took too long"
      });
    } else {
      return res.json({
        success: false,
        message: error.message || "Unknown error occurred"
      });
    }
  }
};