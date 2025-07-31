import React from 'react'
import { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const [userPrompt,setUserPrompt] = useState('')
    const navigate = useNavigate()
    const submitHandler=(e)=>{
        e.preventDefault()
        if(userPrompt.trim())
        {
            navigate('/builder',{state:{userPrompt}})   //location ka use kar ke isko humm agle builder component me export kar lenge
            console.log(userPrompt)
            setUserPrompt("")
        }

    }
  return (
    <div>
        <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='mb-5 font-bold text-4xl text-green-700'>Create you website with a single prompt</h1>
        <input type='text' value={userPrompt} onChange={(e)=>setUserPrompt(e.target.value)} placeholder='write your promt here..' className='border-2 outline-none pl-2 rounded-3xl h-10'/>
        <button onClick={submitHandler}>Create</button>
        
    </div>
    </div>
  )
}

export default Home
