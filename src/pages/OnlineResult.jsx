import React, { useState } from "react";
import { enToBnNumber } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { classCode } from "../staticData/classSubjectData";
import useResultsData from "../hook/useResultsData";

const OnlineResult = () => {
  const navigate = useNavigate();
  const [selectExaminner, setSelectExaminner] = useState({
    id: null,
    class: null,
    roll: null,
  });
  const { data } = useResultsData({});

  console.log(selectExaminner);

  return (
    <div>
      <div className="max-w-[512px] px-4 mx-auto my-10 h-[50svh] flex flex-col justify-center">
        <h1 className="text-center text-lg my-10 flex flex-col">
          <span>দ্বিতীয় সাময়িক পরীক্ষা - ২০২৫ইং</span>{" "}
          <span>ফলাফল প্রকাশিত হয়েছে</span>
        </h1>
        <h2 className="text-center my-4">
          ফলাফল দেখার জন্য শ্রেণী ও পরীক্ষার্থী নির্বাচন করুন
        </h2>
        <div className="flex flex-col items-center gap-3.5">
          <select
            onChange={(e) =>
              setSelectExaminner((prev) => ({
                ...prev,
                class: parseInt(e.target.value),
              }))
            }
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
            onChange={(e) => {
              const v = JSON.parse(e.target.value);
              setSelectExaminner((prev) => ({
                ...prev,
                id: parseInt(v.id),
                roll: parseInt(v.roll),
              }));
            }}
            className="border border-gray-300 rounded px-4 py-2.5 w-full"
          >
            <option value="0">পরীক্ষার্থী নির্বাচন করুন</option>
            {data
              ?.filter(
                (student) => student.class_code === selectExaminner.class
              )
              ?.sort((a, b) => a.roll - b.roll)
              ?.map((data) => (
                <option key={data.id} value={JSON.stringify(data)}>
                  {`${enToBnNumber(data.roll)}. ${data.name}`}
                </option>
              ))}
          </select>

          <button
            onClick={() =>
              navigate(
                `/results?orsi=${selectExaminner.id}&c=${selectExaminner.class}&r=${selectExaminner.roll}`
              )
            }
            className={`border border-gray-300 rounded px-4 py-2 w-full disabled:opacity-50 cursor-pointer`}
            disabled={selectExaminner.roll ? false : true}
          >
            ফলাফল দেখুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnlineResult;
