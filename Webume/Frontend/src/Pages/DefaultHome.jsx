import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AppContext } from "../Context/AppContext";

function DefaultHome() {
  const { resume, setResume, parseResume } = useContext(AppContext);
  console.log(resume);

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

        <div className="mt-10 flex gap-6 justify-center">
          <Link
            to="/sign-up"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/sign-in"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DefaultHome;
