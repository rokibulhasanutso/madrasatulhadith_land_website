import React, { useEffect, useState } from "react";
import { enToBnNumber } from "../../utils/utils";
import { classCodeByLebel } from "../../staticData/classSubjectData";
import supabase from "../../supabase/config";
import {
  monthlyExamSubjectCode,
  monthlyExamSubjectMark,
  monthlyExamSubjectName,
} from "../../staticData/monthlyRoutineData";

const MonthlyExamResultSheet = () => {
  const [data, setData] = useState([]);

  const monthlyExamData = async () => {
    // setLoading(true);
    const { data } = await supabase
      .from("monthly-exam")
      .select(`*, students (*)`)
      .order("id", { ascending: true });
    setData(data);
    // setLoading(false);
  };

  useEffect(() => {
    monthlyExamData();
  }, []);

  return (
    <div className="size-A4">
      <div className="grid grid-cols-2">
        {data?.map((result, i) => (
          // per sheet
          <div
            key={i}
            className="font-bangla h-[148.5mm] flex flex-col justify-between p-10 border-r even:border-r-0 border-b border-dashed border-gray-400"
          >
            <div>
              {/* header  */}
              <div className="flex justify-between items-top mb-2">
                <div className="size-[1.2cm]">
                  <img
                    src="/src/assets/logo.jpg"
                    alt="logo"
                    className="size-full"
                  />
                </div>

                <div className="text-center">
                  <h1 className="font-galada text-2xl leading-normal">
                    মাদ্‌রাসাতুল হাদিস
                  </h1>
                  <h2 className="text-[12px]">মাসিক পরীক্ষা / মে - ২০২৫ ইং</h2>
                  <h2 className="text-[16px] font-bold mt-1">
                    মাসিক পরীক্ষার ফলাফল
                  </h2>
                </div>

                <div className="invisible size-[1.2cm] border border-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-gray-400">সীল মোহর</span>
                </div>
              </div>

              {/* student name roll */}
              <div className="flex justify-between text-[15px] font-semibold mb-1">
                <span>নামঃ {result?.students?.name}</span>
                <span>রোলঃ {enToBnNumber(result?.students?.roll)}</span>
              </div>

              {/* routine table */}
              <div>
                <table className="w-full border-collapse">
                  <tbody className="*:even:bg-gray-100">
                    <tr>
                      <td
                        className="border border-gray-400 p-1 text-center text-[14px] font-semibold"
                        colSpan={3}
                      >
                        {classCodeByLebel[result?.students?.class_code]} শ্রেণী
                      </td>
                    </tr>
                    <tr className="*:font-semibold">
                      <td className="w-1/2 text-center border border-gray-400 p-1 text-[13px]">
                        বিষয়
                      </td>
                      <td className="w-1/4 text-center border border-gray-400 p-1 text-[13px]">
                        পূর্ণমান
                      </td>
                      <td className="w-1/4 text-center border border-gray-400 p-1 text-[13px]">
                        প্রাপ্ত নম্বর
                      </td>
                    </tr>
                    {monthlyExamSubjectCode[result?.students?.class_code]?.map(
                      (data, index) => (
                        <tr key={index}>
                          <td className="w-1/4 text-center border border-gray-400 p-1 text-[13px]">
                            {monthlyExamSubjectName[data]}
                          </td>
                          <td className="w-1/4 text-center border border-gray-400 p-1 text-[13px]">
                            {enToBnNumber(
                              monthlyExamSubjectMark[
                                result?.students?.class_code
                              ]?.[data] || 50
                            )}
                          </td>
                          <td className="w-1/2 text-center border border-gray-400 p-1 text-[13px]">
                            {enToBnNumber(result[data])}
                          </td>
                        </tr>
                      )
                    )}
                    <tr className="*:font-bold border-gray-900">
                      <td className="w-1/4 text-center border border-gray-400 p-1 text-[13px]">
                        মোট নাম্বার
                      </td>
                      <td className="w-1/4 text-center border border-gray-400 p-1 text-[13px]">
                        {enToBnNumber(
                          monthlyExamSubjectCode?.[
                            result?.students?.class_code
                          ]?.reduce(
                            (total, subjectCode) =>
                              total +
                              (monthlyExamSubjectMark?.[
                                result?.students?.class_code
                              ]?.[subjectCode] ?? 50),
                            0
                          )
                        )}
                      </td>
                      <td className="w-1/2 text-center border border-gray-400 p-1 text-[13px]">
                        {enToBnNumber(
                          monthlyExamSubjectCode[
                            result?.students?.class_code
                          ]?.reduce(
                            (total, subjectCode) =>
                              total +
                              (isNaN(parseFloat(result?.[subjectCode]))
                                ? 0
                                : parseFloat(result?.[subjectCode])),
                            0
                          )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-end mt-4">
              <div className="flex flex-col items-center text-[11px] font-semibold">
                <div className="">
                  <img
                    src="/authorizer-singnature.jpg"
                    alt="authorizer-singnature"
                    className="w-[65px] contrast-100"
                  />
                </div>
                <span>মাদ্‌রাসাতুল হাদিস</span>
                <span>প্রধান শিক্ষক</span>
              </div>

              <div className="flex flex-col items-center text-[11px] font-semibold">
                <span>অভিভাবকের স্বাক্ষর ও মোবাইল নাম্বার</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyExamResultSheet;
