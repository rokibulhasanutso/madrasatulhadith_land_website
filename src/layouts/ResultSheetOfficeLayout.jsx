import { useEffect, useRef, useState } from "react";
import { processStudentResult } from "../staticData/studentData";
import { useDataStore } from "../contextAPI/DataStore";
import { useReactToPrint } from "react-to-print";
import { FileSpreadsheet, Printer } from "lucide-react";
import { classCodeByLebel } from "../staticData/classSubjectData";
import { enToBnNumber } from "../utils/utils";

const ResultSheetOfficeLayout = () => {
  const { store } = useDataStore();
  const [data, setData] = useState();

  const classData = (classCode) => {
    const data = store?.filter((data) => data.class_code === classCode);
    const processData = data?.map((data) => processStudentResult(data));
    return processData?.sort((a, b) => a.id - b.id);
  };

  useEffect(() => {
    const data = classData(5);
    setData(data);
  }, [store]);

  // for print case
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <div className="flex justify-between items-center border border-gray-300 rounded p-1.5 my-4">
        {/* total result sheet */}
        <div className="flex items-center gap-2 text-emerald-500 font-bold">
          <FileSpreadsheet className="" />
          <span>All class result sheet (Office docs)</span>
        </div>

        {/* action contents */}
        <div>
          <button
            onClick={reactToPrintFn}
            className="flex items-center gap-2 px-3 py-1.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer"
          >
            <Printer className="size-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div>
        <div ref={contentRef} className="m-8" style={{ page: "A4" }}>
          <div>
            {Array.from({ length: 7 }).map((_, i) => (
              <>
                <div className="my-4 mt-28 first:mt-0">
                  <h1 className="text-3xl text-center font-galada my-2">
                    মাদ্‌রাসাতুল হাদিস
                  </h1>
                  <p className="text-center">
                    প্রথম সাময়িক পরীক্ষার ফলাফল - ২০২৫ইং
                  </p>
                </div>
                <p className="text-center text-xl my-4 underline">
                  {classCodeByLebel[i + 1]} শ্রেণী
                </p>
                <table
                  key={i}
                  className="text-center font-bangla text-[11px] font-normal border-collapse **:border **:border-gray-400 **:px-1 **:py-0.5 w-full"
                >
                  <thead>
                    <tr className="*:w-[calc(100%/14)]">
                      <th>রোল</th>
                      <th>নাম</th>
                      {classData(i + 1)?.[0]?.result_details?.map(
                        (data, index) => (
                          <th key={index}>{data.subject}</th>
                        )
                      )}
                      <th>মোট নম্বর</th>
                      <th>গ্রেড</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classData(i + 1)?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.roll}</td>
                        <td>{item.stu_name}</td>
                        {item.result_details?.map((data, index) => (
                          <td key={index}>{enToBnNumber(data.obtain_mark)}</td>
                        ))}
                        <td>{enToBnNumber(item.total_marks)}</td>
                        <td>{item.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultSheetOfficeLayout;
