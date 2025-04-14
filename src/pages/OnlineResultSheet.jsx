import React, { useEffect, useState } from "react";
import { enToBnNumber } from "../utils/utils";
import { getBanglaPlacement } from "../utils/result_management";
import { useSearchParams } from "react-router-dom";
import { useDataStore } from "../contextAPI/DataStore";

const OnlineResultSheet = () => {
  const [searchParams] = useSearchParams();
  const examinnerClass = parseInt(searchParams.get("class_code"));
  const examinnerRoll = parseInt(searchParams.get("roll"));
  const { studentResultData } = useDataStore();
  const [data, setData] = useState({});

  useEffect(() => {
    const examineeData = studentResultData?.[examinnerClass]?.find(
      (data) => parseInt(data.roll) === examinnerRoll
    );
    setData(examineeData || {});
  }, [examinnerClass, examinnerRoll, studentResultData]);

  return (
    <div>
      <div className="space-y-8 my-8 flex-1">
        {/* student info details */}
        <div className="flex w-full justify-between">
          <div className="w-1/2">
            <table className="border-collapse w-full font-semibold text-lg">
              <tbody className="**:w-1/2">
                <tr>
                  <td>শিক্ষার্থীর নামঃ</td>
                  <td>{data?.stu_name}</td>
                </tr>
                <tr>
                  <td>রোলঃ</td>
                  <td>{enToBnNumber(data.roll).padStart(2, "০")}</td>
                </tr>
                <tr>
                  <td>শ্রেণীঃ</td>
                  <td>{data.class}</td>
                </tr>
                <tr>
                  <td>প্রাপ্ত মোট নম্বরঃ</td>
                  <td>{enToBnNumber(data.total_marks)}</td>
                </tr>
                <tr>
                  <td>প্রাপ্ত গ্রেডঃ</td>
                  <td>{data.grade}</td>
                </tr>
                <tr>
                  <td>স্থান অর্জন</td>
                  <td>{getBanglaPlacement(data.placement)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* result table */}
        <div className="">
          <table className="border-collapse w-full **:py-1 **:border **:border-gray-400 font-medium">
            <thead>
              <tr>
                <th className="w-[70px]">ক্রঃ নংঃ</th>
                <th>বিষয়</th>
                <th className="w-[90px]">পূর্ণমান</th>
                <th className="w-[90px]">প্রাপ্ত নম্বর</th>
                <th className="w-[90px]">প্রাপ্ত গ্রেড</th>
              </tr>
            </thead>
            <tbody>
              {data?.result_details?.map((data, index) => (
                <tr key={index} className="*:border text-center ">
                  <td>{enToBnNumber(index + 1)}</td>
                  <td className="px-4 text-left">{data.subject}</td>
                  <td>{enToBnNumber(data.full_mark)}</td>
                  <td>{enToBnNumber(data.obtain_mark)}</td>
                  <td>{data.grade}</td>
                </tr>
              ))}

              {/* total result table */}
              <tr className="*:border text-center ">
                <td
                  colSpan={2}
                  className="!border-l-transparent !border-b-transparent"
                />
                <td>{enToBnNumber(data?.total_full_marks)}</td>
                <td>{enToBnNumber(data?.total_marks)}</td>
                <td>{data?.grade}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OnlineResultSheet;
