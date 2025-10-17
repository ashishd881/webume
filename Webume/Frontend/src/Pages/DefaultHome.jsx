import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AppContext } from "../Context/AppContext";

function DefaultHome() {
  const { resume, setResume, parseResume } = useContext(AppContext);

  // Handle resume file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      parseResume(file); // assuming parseResume extracts info from the PDF
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl text-center mt-12 px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Turn your PDF resume into a stunning developer portfolio with{" "}
          <span className="text-blue-600">Webume</span>
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed">
          Webume turns your traditional PDF resume into a live, interactive
          portfolio website — in seconds. Simply upload your resume, and Webume
          will automatically extract your key information (education,
          experience, skills, projects) and transform it into a sleek,
          responsive portfolio.
          <br />
          <br />
          It’s the easiest way to build a personal brand and showcase your
          achievements online — no coding needed. Perfect for students,
          developers, and professionals who want a modern digital presence
          without starting from scratch.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center items-center">
          {!resume ? (
            <>
              <label className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                Upload Resume
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <Link
                to="/sign-up"
                className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-4">
                <strong>Resume Loaded:</strong> {resume.name}
              </p>
              <Link
                to="/create-portfolio"
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Create Portfolio
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DefaultHome;
