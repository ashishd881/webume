import fs from 'fs'
// import path from 'path'
import pdf from 'pdf-parse'
// import { fileURLToPath } from 'url';

import clerkClient from "@clerk/clerk-sdk-node"
import { userInfo } from "../models/userInfo.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

export const setData =  async(req,res)=> {
   try {
    const userId = req.userId
    console.log(userId)
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


    console.log(userData)
   //  
   //  const {resume} = req.body
   //  console.log(resume)
    res.json({success:true,user:userData,message:"Resume uploaded"})
   } catch (error) {
        console.error("Error in setData:", error);
        res.status(500).json({ success: false, message: "Server error" });
   }

}


export const pdfparser= async(req,res)=>{
   try {
      const userId = req.userId
      const user = await userInfo.findOne({userId})
      if(!user)
         res.json({success:false,message:"User Not Found"})
      const userResumeLink = user.resumelink
      if(!userResumeLink)
         res.json({success:false,message:"Resume not found"})
      
      let dataBuffer = fs.readFileSync(userResumeLink);
 
      pdf(dataBuffer).then(function(data) {
      
         // number of pages
         console.log(data.numpages);
         // number of rendered pages
         console.log(data.numrender);
         // PDF info
         console.log(data.info);
         // PDF metadata
         console.log(data.metadata); 
         // PDF.js version
         // check https://mozilla.github.io/pdf.js/getting_started/
         console.log(data.version);
         // PDF text
         console.log(data.text); 
        
});
   } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
   }
}
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath = path.resolve(__dirname, 'test', 'data', '05-versions-space.pdf')
// let dataBuffer = fs.readFileSync(filePath)

// pdf(dataBuffer).then(function(data){
//     // number of pages
//     console.log(data.numpages);
//     // number of rendered pages
//     console.log(data.numrender);
//     // PDF info
//     console.log(data.info);
//     // PDF metadata
//     console.log(data.metadata); 
//     // PDF.js version
//     // check https://mozilla.github.io/pdf.js/getting_started/
//     console.log(data.version);
//     // PDF text
//     console.log(data.text); 
// })
// .catch(function(error){
//     console.log(error)
// })