import express from  "express"

// import { exec } from "child_process";
// import { promisify } from "util";
// import os from 'os'
import 'dotenv/config'
import cors from "cors"
import templateRouter from "./Routes/templateRoute.js";
import chatRouter from "./Routes/chatRoute.js";
// const platform = os.platform();  //this platform variable will contain information about the is whether it is macBook or windows 
// console.log(platform)


const app = express()
app.use(express.json())
app.use(cors())
// const asyncExecute = promisify(exec);

// const History = [];
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINIAPI_KEY });

// console.log(process.env.GEMINIAPI_KEY)
//  Tool create karte hai, jo kisi bhi terminal/ shell command ko execute kar sakta hai

// async function executeCommand({command}) {
     
//     try{
//     const {stdout, stderr} = await asyncExecute(command);   //jo command yaha pe denge wo run hogi
//         // exec is a callback function suppose llm says us to create calculator folder and then create a index.js file in the folder but assume that the folder is not created then
//         //where we will create the file so for this we use promise so we have to wait to create the folder so we install a util dependency too  when above line has executed completly then only the next line will  be executed due to await

//     if(stderr){
//         return `Error: ${stderr}`   //this will run if there is any error in some code
//     }

//     return `Success: ${stdout} || Task executed completely`  

//     }
//     catch(error){
      
//         return `Error: ${error}`   //this will run when the LLM gives us the wrong command
//     }
    
// }



// const executeCommandDeclaration = {
//     name: "executeCommand",
//     description:"Execute a single terminal/shell command. A command can be to create a folder, file, write on a file, edit the file or delete the file",
//     parameters:{
//         type:'OBJECT',
//         properties:{
//             command:{
//                 type:'STRING',
//                 description: 'It will be a single terminal command. Ex: "mkdir calculator"'
//             },
//         },
//         required: ['command']   
//     }

// }


// const availableTools = {
//    executeCommand
// }



// async function runAgent(userProblem) {
//     History.push({
//         role:'user',
//         parts:[{text:userProblem}]
//     });
//     while(true){
//       const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: History,
//       config: {
//           systemInstruction:  `you need to use the  external tool executeCommand and create a website according to the user query and first write terminal command to create folder and then create files and then write code into 
//           those files with the help of the external tool dont use  in the code which you are giving remember it
//           also dont use echo command instead of echo commands use only cat commands onlu cat command for writing code
//           ` ,
//       tools: [{
//           functionDeclarations: [executeCommandDeclaration]
//       }],
//     },
//   });
//   if(response.functionCalls&&response.functionCalls.length>0){
//     console.log(response.functionCalls[0]);
//     const {name,args} = response.functionCalls[0];
//     const funCall =  availableTools[name];
//     const result = await funCall(args);
//     const functionResponsePart = {
//       name: name,
//       response: {
//         result: result,
//       },
//     };
//     // model 
//     History.push({
//       role: "model",
//       parts: [
//         {
//           functionCall: response.functionCalls[0],
//         },
//       ],
//     });

//     // result Ko history daalna
//     History.push({
//       role: "user",
//       parts: [
//         {
//           functionResponse: functionResponsePart,
//         },
//       ],
//     });
//    }
//    else{
//     History.push({
//         role:'model',
//         parts:[{text:response.text}]
//     })
//     console.log(response.text);
//     break;
//    }
//   }
// }


// async function main() {
//     console.log("I am a cursor: let's create a website");
//     const userProblem = readlineSync.question("Ask me anything--> ");
//     await runAgent(userProblem);
//     main();
// }
// main();



// async function runAgent(userProblem) {
//       History.push({
//           role:'user',
//           parts:[{text:userProblem}]
//       });
      
//       const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: History,
//       config: {
//           systemInstruction:  `you need to use the  external tool executeCommand and create a website according to the user query and first write terminal command to create folder and then create files and then write code into 
//           those files with the help of the external tool dont use  in the code which you are giving remember it
//           also dont use echo command instead of echo commands use only cat commands onlu cat command for writing code
//           ` ,
      
//     },
//   });
  

//     // result Ko history daalna
//     History.push({
//       role: "model",
//       parts: [
//         {
//           text:response.text,
//         },
//       ],
//     });
//     console.log(response.text)
// }

// async function main() {
//     const userProblem = readlineSync.question("Ask me anything--> ");
//     await runAgent(userProblem);
//     main();
// }
// main();

const PORT = process.env.PORT || 4000
app.use('/api/template',templateRouter)     //http://localhost:4000/api/template/runtemplate
app.use('/api/chat',chatRouter)             ////http://localhost:4000/api/chat/runchat
app.get('/',(req,res)=> res.send("Your API Working"))

app.listen(PORT,()=>console.log("server is running on port"+ PORT))