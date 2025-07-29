import React, { Children, useEffect, useState } from 'react'
import CodeEditor from '../Components/CodeEditor'
import { useLocation } from 'react-router-dom'
import axios from "axios"
import { parseXml } from '../steps';
import StepsList from '../Components/StepsList';
import { useWebContainers } from '../hooks/useWebContainers';
import FileExplorer from '../Components/FileExplorer';
import {TabView} from '../Components/TabView';
import { PreviewFrame } from '../Components/PreviewFrame';

function Builder() {
  const location  = useLocation();
  const userPrompt = location.state?.userPrompt;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // console.log(userPrompt)
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [templateSet, setTemplateSet] = useState(false);
  const [steps,setSteps] = useState([]);
  const [llmMessages, setLlmMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('code');
  const [newUserPrompt, setnewUserPrompt] = useState("");
  const webcontainer = useWebContainers();


  useEffect(()=>{
    let originalFiles = [...files];      //let originalFiles = files Both originalFiles and files are now reference to the exact same array in memory. If you modify originalFiles, files changes too (and vice versa).
    //above a shallow copy of files is created 
    let updateHappened = false;
    steps.filter(({status})=> status ==='pending').map((step)=>{
      // steps.filter(step => step.status === "pending");
      updateHappened = true;
      if(step?.type ==="create-file")            //step && step.type === 'CreateFile'
      {
        let parsedPath = step.path?.split('/') ??[]      //if path exits it gets splitedd by '/' and gets stored in the form of array  if doesnt exit gets stored in the form of empty array
        let currentFileStructure = [...originalFiles]
        let finalAnswerRef  =  currentFileStructure
        let currentFolder = ""
        while(parsedPath.length) {
          currentFolder = `${currentFolder}/${parsedPath[0]}`
          let currentFolderName = parsedPath[0];
          parsedPath = parsedPath.slice(1);
          if(!parsedPath.length)
          {
            let file = currentFileStructure.find((x)=>x.path ==currentFolder)
              if(!file){
                currentFileStructure.push({
                  name:currentFolderName,
                  type:'file',
                  path:currentFolder,
                  content:step.code,
                  // children:[  ]
                })
              }
              else
              {
                file.content = step.code
              }
          }
          else
          {
            //in a folder
            let folder  = currentFileStructure.find((x)=> x.path==currentFolder)
            if(!folder)
            {
              currentFileStructure.push({
                name: currentFolderName,
                type:'folder',
                path:currentFolder,
                children:[]
              })
            }
            currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)?.children || [];

          }
        }
        originalFiles = finalAnswerRef;
      }
    })
    if (updateHappened) {

      setFiles(originalFiles)
      setSteps(steps => steps.map((step) => {
        return {
          ...step,
          status: "completed"
        }
        
      }))
    }
    // console.log("yaa fiels")
    // console.log(files);
    
  },[steps,files])

  useEffect(()=>{
    const createMountStructure =(files)=>{
  //  if (!file) return {};
  const mountStructure = {};
  const processFile = (file,isRootFolder)=>{
    if(file.type ==='folder'){
      mountStructure[file.name]={
          directory:file.children ?
            Object.fromEntries(
            file.children.map(child => [child.name, processFile(child, false)])
          ) 
          : {}
      };
      return mountStructure[file.name];
    }else if (file.type === 'file') {
      const fileStructure = {
        file: {
          contents: file.content || ''
        }
      };
      
      if (isRootFolder) {
        mountStructure[file.name] = fileStructure;
      }
      return fileStructure;
    }else {
        // For files, create a file entry with contents
        return {
          file: {
            contents: file.content || ''
          }
        };
      }
  };
    files.forEach(file => processFile(file, true));

  return mountStructure;
}
      const mountStructure = createMountStructure(files);
  
    // Mount the structure if WebContainer is available
    // console.log("this is the mount structure")
    // console.log(mountStructure);
    webcontainer?.mount(mountStructure);
    
  },[files, webcontainer])


  const template = async()=>{
    // console.log("run1")
    const response  =  await axios.post(backendUrl+'/api/template/runtemplate',{
      prompt: userPrompt
    })
    
    try {
      // console.log("run2")
      // console.log(response)
      // console.log(response.data.success)
      if(response.data.success)
      {
        const {prompts,uiPrompts} = response.data;  //we cant use response Because axios.post() doesn’t return your server’s response directly — it returns an Axios response object, which looks like this:
// {
//   data: { /* the actual response body from your backend */ },
//   status: 200,
//   statusText: "OK",
//   headers: { ... },
//   config: { ... },
//   request: { ... }
// }
        // console.log(prompts)
        // console.log("good")
        // console.log(uiPrompts)
        // console.log("njsdjk")
        // console.log(uiPrompts[0])
        // console.log(uiPrompts[1])
        setTemplateSet(true);
        setSteps(parseXml(uiPrompts[0]).map((step)=>({
          ...step,
          status: "pending"
        })))
        setLoading(true);
        // console.log("godo")
        // console.log(steps)

        const stepsResponse = await axios.post(backendUrl+"/api/chat/runchat", {
          messages: [...prompts, userPrompt].map(content => ({
            role: "user",
            content
          }))
        })
        // console.log("very good")
        // console.log(stepsResponse)
        setLoading(false);  
        setSteps(s => [
        ...s,
        ...parseXml(stepsResponse.data.message).map(x => ({
        ...x,
        status: "pending"
      }))
      ]);

      setLlmMessages([...prompts, prompt].map(content => ({
      role: "user",
      content
      })));

      setLlmMessages(x => [...x, {role: "assistant", content: stepsResponse.data.response}])

    }
    } catch (error) {
      console.log(error.messages)
    }
  }
  useEffect(()=>{
    template()
  },[])
  return (
    <div>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-100">Website Builder</h1>
          <p className="text-sm text-gray-400 mt-1">Prompt: {userPrompt}</p>
        </header>
        <div className='grid grid-cols-10 gap-2'>
          <div className='border-gray-600 col-span-2 border-2 h-full rounded-2xl'>
              <StepsList
                      steps={steps}
                      currentStep={currentStep}
                      onStepClick={setCurrentStep}
                    />
          </div>
          {/* <div className='border-amber-50 border-2 h-screen'>ksfd</div>
          <div className='border-amber-50 border-2 h-screen'>ksffd</div> */}
          <div className='border-gray-600 col-span-2 border-2 h-full rounded-2xl'>
              <FileExplorer
                files={files} 
                onFileSelect={setSelectedFile}
              />
          </div>
          <div className= 'border-gray-600 border-2 col-span-6  rounded-lg shadow-lg p-4 h-[calc(100vh-4rem)] '>
            <TabView activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="h-[calc(100%-4rem)]">
              {activeTab === 'code' ? (
                <CodeEditor file={selectedFile}/>
              ) : (
                <PreviewFrame webContainer={webcontainer} files={files} />
              )}
            </div>
            
          </div>
          <div className='border-gray-600 border-2 col-span-6  h-8rem'>
dd
            </div>
        </div>
            
          

        
      </div>
      
    </div>
  )
}

export default Builder
