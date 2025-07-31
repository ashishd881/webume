import React, { createContext, useState } from 'react'

export const AppContext = createContext()


const AppContextProvider = ({children})=>{
    const [user,setUser] = useState("")
    const [resume,setResume] = useState("")

    return (
        <>
            <AppContext.Provider value={{user,setUser,resume,setResume}}>
                {children}
            </AppContext.Provider>
        </>
    )
}

export default AppContextProvider


