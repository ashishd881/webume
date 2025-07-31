import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div>
      <SignIn redirectUrl="/prompt"/>
    </div>
  )
}

export default SignInPage
