import { ai, History } from "../geminSession/geminiSession.js";
import { getSystemPrompt } from "../prompts.js";


export const chat=async(req,res)=>{
    const messages = req.body.messages;
    console.log("good")
    
    if(Array.isArray(messages))
    {
        messages.map((msg)=>{
            History.push({
            role: msg.role || "",
            parts:[{text:msg.content}]
            })
        })
        
    }
    else{
        History.push({
              role:'user',
              parts:[{text:String(messages)}]
          });
    }
          
          let response
          try {
                response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: History,
                config: {
                    systemInstruction: `${getSystemPrompt}` ,  
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
            // console.log(response.text)
            console.log(JSON.stringify(History, null, 2));
            res.json({success:true, message:response.text})
          } catch (error) {
            console.log("goodies")
            res.json({success:false,message:error.message})
          }
}