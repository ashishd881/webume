import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Navbar from "../Components/Navbar";

function Home() {
  const [userPrompt, setUserPrompt] = useState("");
  const { resume, setResume, parseResume, handleUpload, resumeparsed } = useContext(AppContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (userPrompt.trim()) {
      navigate("/builder", { state: { userPrompt } });
      console.log(userPrompt);
      setUserPrompt("");
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50">
      <Navbar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
          <h1 className="mb-5 font-bold text-4xl text-green-700 text-center">
            Create your website with a single prompt
          </h1>

          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
            {/* File Upload */}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
            />

            {/* Parse Resume Button */}
            <button
              onClick={(e) => parseResume(e)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Parse Resume
            </button>

            {/* Additional Prompt */}
            {resumeparsed ? (
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Write additional prompt you want to give to Webume..."
                  className="w-full border border-gray-300 outline-none pl-4 rounded-lg h-10 focus:border-green-500"
                />
                <button
                  onClick={submitHandler}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Create
                </button>
              </div>
            ) : (
              <div className="mt-6 text-gray-500">Parse your resume to continue</div>
            )}
          </div>
        </div>
      </div>
  );
}

export default Home;
