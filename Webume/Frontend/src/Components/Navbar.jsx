import React from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

function Navbar() {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md rounded-full max-w-8xl mx-auto mt-6">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-green-700 hover:text-green-800 transition"
      >
        Webume
      </button>

      {/* Links */}
      <div className="flex gap-8 text-lg text-gray-700">
        <button className="hover:text-green-700 transition">Features</button>
        <button className="hover:text-green-700 transition">How it Works</button>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
              {user.username || "User"}
            </span>
            <button
              onClick={() => signOut()}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/sign-up")}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/sign-in")}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
