import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function DefaultHome() {
  return (
    
    <div className='flex justify-center w-full'>
        <div>
             <Navbar/>
             <h1>Turn your PDF resume into a stunning developer portfolio with Webume</h1>
                <p className='text-2xl flex items-center justify-center mt-20'>
                    About Webume
                    Webume turns your traditional PDF resume into a live, interactive portfolio website — in seconds.
                    Simply upload your resume, and Webume will automatically extract your key information (education, experience, skills, projects) and transform it into a sleek, responsive portfolio. It’s the easiest way to build a personal brand and showcase your achievements online — no coding needed.
                    Perfect for students, developers, and professionals who want a modern digital presence without starting from scratch.
                </p>
                <div className='mt-10 '>
                    <Link to="/sign-up" >signup</Link>
                    <Link to="/sign-in" >signIn</Link>
                </div>
        </div>
      
    </div>
  )
}

export default DefaultHome
