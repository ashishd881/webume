import { BASE_PROMPT } from "../prompts.js";
import {basePrompt as reactBasePrompt} from "../Default/react.js";
import { ai, History } from "../geminSession/geminiSession.js";

export const template = async(req,res)=>{
    const prompt  = req.body.prompt;
   
      History.push({
          role:'user',
          parts:[{text:prompt}]
      });

      let response
      try {
            response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: History,
            config: {
                systemInstruction: `user will only ask to create a protfolio website based on the parsed data provided so  return 'react' Only return a single word  'react'. Do not return anything extra dont think any thing just return 'react';` ,  
            },
            
    });
    
    // console.log(response)
        History.push({
            role: "model",
            parts: [
                {
                text:response.text,
                },
            ],
        });
        
      } catch (error) {
            res.json({success:false,message:error.message})
      }
    

    const answer = response.text.trim().toLowerCase(); 
    if (answer === "react") {
        res.json({
            success:true,
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        })
        console.log(JSON.stringify(History, null, 2));
        return;
    }

}
