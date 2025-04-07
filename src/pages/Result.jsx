import React from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"

const Result = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between my-2">
        <h1 className="text-xl font-semibold">Result page</h1>
        <div>
          <button className="px-3 py-1.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer">
            Menu
          </button>
        </div>
      </div>

      {/* content */}

      {/* modal */}
      <Modal>
        <div className="relative h-full flex flex-col justify-center">
          <h1 className="text-lg text-center font-semibold py-1.5 border-b border-slate-300">
            Menu Options
          </h1>

          <div>
            <div className="flex flex-col gap-y-2.5 w-36 my-5 mx-auto">
              <button
                onClick={() => navigate("/office")}
                className={`px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
              >
                Create Result
              </button>

              <button
                onClick={() => navigate("/teacher")}
                className={`px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
              >
                Filter
              </button>

              <button
                onClick={() => navigate("/student")}
                className={`px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
              >
                View all result
              </button>

              <button
                onClick={() => navigate("/result")}
                className={`px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
              >
                Result
              </button>
            </div>

            <div className="absolute top-1.5 right-1.5">
              <button
                onClick={() => navigate("/result")}
                className={`p-0.5 text-gray-500 font-semibold rounded-full cursor-pointer hover:bg-gray-300`}
              >
                <X/>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Result;
