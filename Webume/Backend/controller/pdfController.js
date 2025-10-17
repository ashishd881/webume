import pdf from 'pdf-parse'
import fs from 'fs'
import { clerkClient } from '@clerk/clerk-sdk-node'
// import {clerkClient} from "@clerk/clerk-sdk-node"
import { userInfo } from "../models/userInfo.model.js"
import { History } from '../geminSession/geminiSession.js'




export const pdfparser = async (req, res) => {

 
  try {
    
    const resumeLocalPath = req.file?.path
    // console.log(req.file)
    const userId = req.userId
    if(!resumeLocalPath)
      res.json({success:false,message:"Resume local path not found"})
    
    const pdfPath = resumeLocalPath; // Change to your filename
    const dataBuffer = fs.readFileSync(pdfPath); // Load the PDF file into buffer

    const data = await pdf(dataBuffer); // Parse the buffer
    // console.log(data.text)
    const cleanText = data.text.replace(/\n/g, ' ');
    // console.log(userId)
  
  const user = await clerkClient.users.getUser(userId);

  const userData = await userInfo.create({
      clerkId:userId,
      userName:user.username,
      email:user.emailAddresses[0]?.emailAddress,
      resumeData:cleanText

    })
    // History.push("User Resume Starts Here")
    History.push({
                role: "user",
                parts: [
                    {
                    text:cleanText,
                    },
                ],
            });
    History.push({
                role: "user",
                parts: [
                    {
                    text:`Note the following the details on the basis of which u have to make portfolio website have be provided above do not to use any Images and make a good Portfolio website `,
                    },
                ],
            });
    // History.push(cleanText);
    // History.push("User Resume Has ended")
    console.log("8888888888888888888888888888888888")
    console.log(JSON.stringify(History, null, 2));
    console.log("77777777777777777777777777777777777777777777777")
    // console.log(userData)
    res.json({success:true,userData:userData,message:"Data reached the servere"})
  
  


    

  } catch (err) {
    console.error("Error reading PDF and setting the data:", err);
    res.status(500).json({ success: false, message: "Failed to parse PDF" });
  }
  
};