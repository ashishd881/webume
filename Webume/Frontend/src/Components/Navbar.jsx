import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {useClerk} from "@clerk/clerk-react"
function Navbar() {
    const navigate = useNavigate()
   const { signOut } = useClerk()
  return (
    <div className='flex justify-center mt-10 gap-15 text-2xl w-3xl border-2 rounded-full h-20'>
        <button onClick={()=>navigate("/")}>Webume</button>
        <div className='flex justify-center gap-10'>
            <button>Features</button>
            <button>How it Works</button>
        </div>
        <div className='flex justify-end gap-3'>
            <button onClick={()=>navigate("/sign-up")}>Sign Up</button>
        <button onClick={()=>navigate("/sign-in")}>Get Stated</button>
        <button onClick={()=>signOut()}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar
