import { SignUp } from "@clerk/clerk-react";
import React from "react";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <SignUp redirectUrl="/prompt" />
      </div>
    </div>
  );
}

export default SignUpPage;
