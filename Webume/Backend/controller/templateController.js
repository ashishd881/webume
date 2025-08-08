// import { GoogleGenAI } from "@google/genai";
// import readlineSync from 'readline-sync';
import { BASE_PROMPT } from "../prompts.js";
import {basePrompt as nodeBasePrompt} from "../Default/node.js";
import {basePrompt as reactBasePrompt} from "../Default/react.js";
import { ai, History } from "../geminSession/geminiSession.js";

export const template = async(req,res)=>{
    const prompt  = req.body.prompt;
    console.log("good");
    console.log(prompt)
    // const History = [];
    // const ai = new GoogleGenAI({ apiKey: process.env.GEMINIAPI_KEY });
   
      History.push({
          role:'user',
          parts:[{text:prompt}]
      });
        //   console.log("gffood");

      let response
      console.log("hjjkj")
      try {
            response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: History,
            config: {
                systemInstruction: `user will only ask to create a protfolio website so  return 'react' Only return a single word  'react'. Do not return anything extra dont think any thing just return 'react';` ,  
            },
            
    });
    console.log("hjjkj")
    console.log(response)
        History.push({
            role: "model",
            parts: [
                {
                text:response.text,
                },
            ],
        });
        console.log("njjdsj")
        console.log(response.text)
        // res.json({success:true, message:response.text})
        console.log(JSON.stringify(History, null, 2));
      } catch (error) {
        console.log("goodies")
        res.json({success:false,message:error.message})
      }
    // result Ko history daalna
    

    const answer = response.text.trim().toLowerCase(); // react or node
    if (answer === "react") {
        // console.log(answer)
        res.json({
            success:true,
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        })
        // console.log(res.json)
        return;
    }

    if (answer === "node") {
        // console.log(answer)
        res.json({
            success:true,
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        })
        return;
    }
}
