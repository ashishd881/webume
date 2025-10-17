import React, { createContext, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'

export const AppContext = createContext()


const AppContextProvider = ({children})=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const {getToken} = useAuth()
    const [token,setToken] = useState("")
    const [user,setUser] = useState("")
    const [resumeparsed,setResumeParsed] = useState(false)
    const [resume,setResume] = useState("")

    const downloadCode = ()=>{

    }
    const fetchToken = async () => { //this has been done just to get the token
        try {
        const token = await getToken(); 
        setToken(token);
        console.log("Fetched token:", token);
        } catch (err) {
        console.error("Failed to fetch token", err);
        }
    }
    const handleUpload = async (e) => {
         setResume(e.target.files[0]); // This is the actual file
    }
    const parseResume = async(e)=>{
        try {
            
            console.log(resume)
            const formdata = new FormData();
            formdata.append('resume',resume)
            const {response} = await axios.post(backendUrl +'/api/pdfparser/runpdfparser',formdata,{headers:{Authorization: `Bearer ${token}`}})
            setResumeParsed(true)
            // console.log(response)
            if(response.success)
            {
                setUser(response.userData.userName);
            }
        } catch (error) {
            console.log(error.message)
            
        }
    }
    useEffect(() => {
        fetchToken(); 
    }, []);
    return (
        <>
            <AppContext.Provider value={{user,setUser,resume,setResume,token,setToken,fetchToken,parseResume,handleUpload,resumeparsed,downloadCode}}>
                {children}
            </AppContext.Provider>
        </>
    )
}
    

export default AppContextProvider


