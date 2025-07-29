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
      try {
            response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: History,
            config: {
                systemInstruction: `Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra` ,  
            },
    });
        History.push({
            role: "model",
            parts: [
                {
                text:response.text,
                },
            ],
        });
        console.log(response.text)
        // res.json({success:true, message:response.text})
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
