import React, { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import {
  classBySubjectCode,
  subjectData,
  classCode,
} from "../staticData/classSubjectData";

const Result = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(0);
  const [selectClass, setSelectClass] = useState(0);
  const [selectSubject, setSelectSubject] = useState(0);
  const navigate = useNavigate();

  // const

  return (
    <div>
      <div className="flex justify-between my-2">
        <h1 className="text-xl font-semibold">Result page</h1>
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-1.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer"
          >
            Menu
          </button>
        </div>
      </div>

      {/* content */}
      <div className="space-y-8">
        {Array.from({ length: 158 }).map((_, index) => (
          <div key={index} className="w-[210mm] h-[297mm] border mx-auto"></div>
        ))}
      </div>

      {/* modal */}
      {modalOpen && (
        <Modal>
          <div className="relative h-full flex flex-col justify-center">
            <div className="flex justify-between items-center p-1.5 border-b border-slate-300">
              {modalContent > 0 && (
                <div>
                  <button
                    onClick={() => setModalContent(0)}
                    className={`p-0.5 text-gray-500 border border-slate-300 font-semibold rounded-full cursor-pointer hover:bg-gray-300`}
                  >
                    <ChevronLeft />
                  </button>
                </div>
              )}

              <h1 className="text-lg text-center font-semibold ms-2.5">
                Menu Options
              </h1>

              <div>
                <button
                  onClick={() => setModalOpen(false)}
                  className={`p-0.5 text-gray-500 font-semibold rounded-full cursor-pointer hover:bg-gray-300`}
                >
                  <X />
                </button>
              </div>
            </div>

            {/* content */}
            <div>
              {/* action content */}
              {modalContent === 0 && (
                <div className="flex flex-col gap-y-2.5 max-w-3xs w-full my-5 mx-auto">
                  <button
                    onClick={() => setModalContent(1)}
                    className={`px-4 py-2.5 text-white bg-emerald-500 rounded cursor-pointer`}
                  >
                    ফলাফল তৈরি করুন
                  </button>

                  <button
                    onClick={() => {}}
                    className={`px-4 py-2.5 text-white bg-emerald-500 rounded cursor-pointer`}
                  >
                    ফলাফল বাঁছাই করুন
                  </button>
                </div>
              )}

              {/* new result content creation */}
              {modalContent === 1 && (
                <div className="max-w-2xs px-4 mx-auto my-10">
                  <h2 className="text-center my-4">
                    ফলাফল তৈরির জন্য শ্রেণী ও বিষয় নির্বাচন করুন
                  </h2>
                  <div className="flex flex-col items-center gap-3.5">
                    <select
                      onChange={(e) => setSelectClass(e.target.value)}
                      className="border border-gray-300 rounded px-4 py-2.5 w-full"
                    >
                      <option value="0">শ্রেণী নির্বাচন করুন</option>
                      {Object.keys(classCode)?.map((value) => (
                        <option key={value} value={value}>
                          {classCode[value]} শ্রেণী
                        </option>
                      ))}
                    </select>

                    <select
                      onChange={(e) => setSelectSubject(e.target.value)}
                      className="border border-gray-300 rounded px-4 py-2.5 w-full"
                    >
                      <option value="0">বিষয় নির্বাচন করুন</option>
                      {classBySubjectCode[selectClass]?.map((value) => (
                        <option key={value} value={value}>
                          {subjectData[value]}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() =>
                        navigate(
                          `create?class=${selectClass || null}&subject=${
                            selectSubject || null
                          }`
                        )
                      }
                      className={`mt-5 w-full px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
                    >
                      তৈরি করুন
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Result;
