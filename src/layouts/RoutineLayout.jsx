import React from "react";
import { classCodeByLebel } from "../staticData/classSubjectData";
import { examFee, examRoutine } from "../staticData/monthlyRoutineData";
import { enToBnNumber } from "../utils/utils";

const RoutineLayout = ({ data }) => {
  const bar = ["সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার"];
  const date = ["০৫/০৫/২০২৫", "০৬/০৫/২০২৫", "০৭/০৫/২০২৫", "০৮/০৫/২০২৫"];

  return (
    <>
      <div className="h-full font-bangla text-[12px]">
        <div className="h-full">
          {/* header  */}
          <div className="flex justify-between items-center mb-4">
            <div className="size-[1.75cm]">
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
              <h2 className="text-[13px]">মাসিক পরীক্ষা / ২০২৫ ইং</h2>
              <h2 className="text-[16px] font-bold mt-3">
                পরীক্ষার রুটিন ও প্রবেশপত্র
              </h2>
            </div>

            <div className="size-[2.21cm] border border-gray-400 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-gray-400">সীল মোহর</span>
            </div>
          </div>

          {/* student name roll */}
          <div className="flex justify-between text-[16px] font-semibold mb-1.5">
            <span>নামঃ {data?.name}</span>
            <span>রোলঃ {enToBnNumber(data?.roll)}</span>
          </div>

          {/* routine table */}
          <div>
            <table className="w-full border-collapse">
              <tbody className="*:even:bg-gray-100">
                <tr>
                  <td
                    className="border border-gray-400 p-1.5 text-center text-[16px] font-semibold"
                    colSpan={3}
                  >
                    {classCodeByLebel[data?.class_code]} শ্রেণী
                  </td>
                </tr>
                <tr className="*:font-semibold">
                  <td className="w-1/4 text-center border border-gray-400 p-1.5 text-[14px]">
                    তারিখ
                  </td>
                  <td className="w-1/4 text-center border border-gray-400 p-1.5 text-[14px]">
                    বার
                  </td>
                  <td className="w-1/2 text-center border border-gray-400 p-1.5 text-[14px]">
                    বিষয়
                  </td>
                </tr>
                {examRoutine[data?.class_code]?.map((data, index) => (
                  <tr key={index}>
                    <td className="w-1/4 text-center border border-gray-400 p-1.5 text-[14px]">
                      {date[index]}
                    </td>
                    <td className="w-1/4 text-center border border-gray-400 p-1.5 text-[14px]">
                      {bar[index]}
                    </td>
                    <td className="w-1/2 text-center border border-gray-400 p-1.5 text-[14px]">
                      {data}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* warnning note */}
            <div className="flex flex-col items-center space-y-1.5 my-4">
              <span className="text-[14px]">
                পরীক্ষা প্রতিদিন সকাল ৯টা থেকে শুরু হবে ইনশাআল্লাহ।
              </span>
              <span className="text-[14px] font-semibold">
                বিঃ দ্রঃ এই প্রবেশপত্র ব্যাতিত কোন পরীক্ষার্থীকে পরীক্ষায় অংশ
                গ্রহণ করতে দেয়া হবে না।
              </span>
            </div>

            {/* notice */}
            <div className="text-[14px] mt-10">
              <h6 className="font-semibold leading-normal">
                বেতন ও মাসিক পরীক্ষার ফি পরিশোধের নোটিশ
              </h6>
              <p className="text-justify">
                শিক্ষার্থী/অভিভাবকগণের অবগতির জন্য জানানো যাচ্ছে যে,
                মাদ্‌রাসাতুল হাদিসের সকল বকেয়া বেতন এবং মাসিক পরীক্ষার ফি
                পরিশোধের সময়সীমা আগামী{" "}
                <strong className="text-[16px]">০৫/০৫/২০২৫ ইং</strong> তারিখ
                পর্যন্ত নির্ধারিত হয়েছে। যেসব শিক্ষার্থী/অভিভাবকগণ এখনও বেতন এবং
                মাসিক পরীক্ষার ফি পরিশোধ করেননি, তারা অনুগ্রহ করে নির্ধারিত
                সময়ের মধ্যে উক্ত বেতন ও ফি পরিশোধ করবেন।
              </p>
              <p className="font-semibold">
                মাসিক পরীক্ষার ফি পরিশোধ না করলে শিক্ষার্থীরা উক্ত পরীক্ষায়
                অংশগ্রহণ করতে পারবেন না।
              </p>
              <p className="text-xl font-semibold text-end">
                পরীক্ষার ফি {examFee[data?.class_code - 1]} টাকা
              </p>

              <div className="flex flex-col items-start mt-6">
                <div className="flex flex-col items-center text-[14px] font-semibold">
                  <div className="">
                    <img
                      src="/authorizer-singnature.jpg"
                      alt="authorizer-singnature"
                      className="w-[100px] contrast-100"
                    />
                  </div>
                  <span>মাদ্‌রাসাতুল হাদিস</span>
                  <span>প্রধান শিক্ষক</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoutineLayout;
