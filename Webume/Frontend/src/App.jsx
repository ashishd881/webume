import './App.css'
import Home from './Pages/Home'
import Builder from './Pages/Builder'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './Components/SignUpPage'
import SignInPage from './Components/SignInPage'
import DefaultHome from './Pages/DefaultHome'
import { useUser } from "@clerk/clerk-react";



function App() {
  
   
const { isSignedIn, user } = useUser();

if (isSignedIn) {
  console.log("User is logged in:", user);
} else {
  console.log("User is NOT logged in");
}
  return (
    <>
      <div className='bg-cyan-700 h-screen w-full'>
        <div>
        <Routes>
          <Route path="/" element={<DefaultHome/>}/>
          <Route path="/prompt" element={<Home/>}/>
          <Route path="/builder" element={<Builder/>}/>
          <Route path='/sign-up' element={<SignUpPage/>}/>
          <Route path='/sign-in' element={<SignInPage/>}/>
        </Routes>
        </div>

      </div>
      
    </>
  )
}

export default App
