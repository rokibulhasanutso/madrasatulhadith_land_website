import React, { useState } from "react";
import { classCode } from "../../staticData/classSubjectData";
import {
  monthlyExamSubjectCode,
  monthlyExamSubjectName,
} from "../../staticData/monthlyRoutineData";
import { useNavigate } from "react-router-dom";

const MonthlyExamResultCreate = () => {
  const [selectClass, setSelectClass] = useState(0);
  const [selectSubject, setSelectSubject] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="max-w-sm px-4 mx-auto my-10">
      <h2 className="text-center mt-40 mb-4">
        এপ্রিল ২০২৫ইং মাসিক পরীক্ষার ফলাফল তৈরির জন্য শ্রেণী ও বিষয় নির্বাচন
        করুন
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
          {monthlyExamSubjectCode[selectClass]?.map((value) => (
            <option key={value} value={value}>
              {monthlyExamSubjectName[value]}
            </option>
          ))}
        </select>

        <button
          onClick={() =>
            navigate(
              `../insert-result?class=${
                selectClass || null
              }&subject=${selectSubject || null}`
            )
          }
          className={`mt-5 w-full px-4 py-2.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer`}
        >
          তৈরি করুন
        </button>
      </div>
    </div>
  );
};

export default MonthlyExamResultCreate;
