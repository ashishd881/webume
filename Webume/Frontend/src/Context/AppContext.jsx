import React, { createContext, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'


export const AppContext = createContext()


const AppContextProvider = ({children})=>{
    const {getToken} = useAuth()
    const [token,setToken] = useState("")
    const [user,setUser] = useState("")
    const [resume,setResume] = useState("")
    const fetchToken = async () => { //this has been done just to get the token
        try {
        const token = await getToken(); 
        setToken(token);
        console.log("Fetched token:", token);
        } catch (err) {
        console.error("Failed to fetch token", err);
        }
    }
    useEffect(() => {
        fetchToken(); 
    }, []);
    return (
        <>
            <AppContext.Provider value={{user,setUser,resume,setResume,token,setToken,fetchToken}}>
                {children}
            </AppContext.Provider>
        </>
    )
}
    

export default AppContextProvider


