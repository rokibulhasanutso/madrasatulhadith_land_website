import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col justify-center">
      <div>
        <h1 className="text-center font-semibold my-4 mb-8">
          Welcome to Madrasatul Hadis Web Portal
        </h1>

        <div className="flex flex-col gap-y-2.5">
          <button
            onClick={() => navigate("/office")}
            className={`px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
          >
            Office
          </button>

          <button
            onClick={() => navigate("/teacher")}
            className={`px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
          >
            Teacher
          </button>

          <button
            onClick={() => navigate("/student")}
            className={`px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
          >
            Student
          </button>

          <button
            onClick={() => navigate("/result")}
            className={`px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
          >
            Result
          </button>

          <button
            onClick={() => navigate("/monthly-exam-routine")}
            className={`px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
          >
            Monthly Exam Routine
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
