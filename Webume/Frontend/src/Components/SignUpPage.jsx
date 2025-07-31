import { SignUp } from '@clerk/clerk-react'
import React from 'react'

function SignUpPage() {
  return (
    <div>
      <SignUp redirectUrl="/"/>
    </div>
  )
}

export default SignUpPage
