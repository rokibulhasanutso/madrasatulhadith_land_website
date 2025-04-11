import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { useReactToPrint } from "react-to-print";
import { classCode as classCodeSubject } from "../staticData/classSubjectData";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileSpreadsheet, Filter, Loader, Printer, Sheet } from "lucide-react";
import { useDataStore } from "../contextAPI/DataStore";
const ResultSheetLayout = lazy(() => import("../layouts/ResultSheetLayout"));

const PrintResultSheet = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classCode = searchParams.get("class_code");
  const [selectClass, setSelectClass] = useState(0);
  const { store } = useDataStore();
  const [data, setData] = useState([]);

  // for print case
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    navigate("/result/sheet/print?class_code=" + selectClass);
  }, [selectClass, navigate]);

  // filter student data by class or classCode
  useEffect(() => {
    const classData = store
      ?.filter((data) =>
        classCode === "0" ? data : data.class_code === parseInt(classCode)
      )
      .sort((a, b) => a.id - b.id);
    setData(classData);
  }, [store, classCode]);

  return (
    <div>
      <div className="flex justify-between items-center border border-gray-300 rounded p-1.5 my-4">
        {/* seclect content */}

        <div className="flex items-center gap-2">
          {/* config */}
          <select
            onChange={(e) => setSelectClass(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 text-lg min-w-[160px] bg-emerald-500 text-white font-medium font-bangla leading-[3] indent-1 *:bg-white *:text-black outline-0 cursor-pointer"
          >
            <option value="0">সকল শ্রেণী</option>
            {Object.keys(classCodeSubject)?.map((value) => (
              <option key={value} value={value}>
                {classCodeSubject[value]} শ্রেণী
              </option>
            ))}
          </select>

          <button
            onClick={reactToPrintFn}
            className="flex items-center gap-2 px-3 py-1.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer"
          >
            <Filter className="size-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* total result sheet */}
        <div className="flex items-center gap-2 text-emerald-500 font-bold">
          <FileSpreadsheet className="" />
          <span>Total Result sheet {data?.length}</span>
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
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[75vh]">
            <div className="flex gap-x-3">
              <Loader className="animate-spin" />{" "}
              <span>অনুগ্রহপূর্বক অপেক্ষা করুন ...</span>
            </div>
          </div>
        }
      >
        <div className="space-y-8" ref={contentRef}>
          {data?.map((item, index) => (
            <ResultSheetLayout key={index} data={item} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default PrintResultSheet;
