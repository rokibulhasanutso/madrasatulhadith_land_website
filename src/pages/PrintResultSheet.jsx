import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { useReactToPrint } from "react-to-print";
import { classCode as classCodeSubject } from "../staticData/classSubjectData";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Check,
  FileSpreadsheet,
  Filter,
  Loader,
  Printer,
  Sheet,
  X,
} from "lucide-react";
import { useDataStore } from "../contextAPI/DataStore";
import Modal from "../components/Modal";
import { enToBnNumber } from "../utils/utils";
const ResultSheetLayout = lazy(() => import("../layouts/ResultSheetLayout"));

const PrintResultSheet = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classCode = parseInt(searchParams.get("class_code"));
  const [selectClass, setSelectClass] = useState(0);
  const { studentResultData } = useDataStore();
  const [data, setData] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [removeToSelect, setRemoveToSelect] = useState([]);

  // for print case
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    navigate("/result/sheet/print?class_code=" + selectClass);
  }, [selectClass, navigate]);

  // filter student data by class or classCode
  useEffect(() => {
    const classData =
      classCode === 0
        ? Object.values(studentResultData).flat()
        : studentResultData[classCode];
    setData(classData);
    setStoredData(classData);
  }, [studentResultData, classCode]);

  useEffect(() => {
    const filterData = storedData?.filter(
      (data) => !removeToSelect.includes(data.id)
    );
    setData(filterData);
  }, [removeToSelect, storedData]);

  return (
    <>
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
              onClick={() => setFilterModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer"
            >
              <Filter className="size-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* total result sheet */}
          <div className="flex items-center gap-2 text-emerald-500 font-bold">
            <FileSpreadsheet className="" />
            <span>Total Result sheet {data?.flat().length}</span>
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

      {/* filter modal */}
      {isFilterModalOpen && (
        <Modal>
          <div className="relative h-full flex flex-col justify-center">
            <div className="sticky top-0 bg-white flex justify-between items-center p-1.5 border-b border-slate-300">
              <h1 className="text-xl text-center font-semibold ms-2.5">
                Filter result sheet
              </h1>

              <div>
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className={`p-0.5 text-gray-500 hover:text-red-500 font-semibold rounded-full cursor-pointer`}
                >
                  <X />
                </button>
              </div>
            </div>

            {/* content */}
            <div className="px-10 h-[calc(100vh-36vh)] overflow-auto">
              {storedData?.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setRemoveToSelect((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((id) => id !== item.id)
                        : [...prev, item.id]
                    )
                  }
                  className={`${
                    removeToSelect.includes(item.id)
                      ? "border-transparent bg-red-500 text-white hover:bg-emerald-500"
                      : "border border-gray-500 hover:border-transparent hover:ring hover:ring-red-500"
                  } group cursor-pointer max-w-2xs mx-auto px-3 py-1.5 my-3.5 rounded flex justify-between items-center gap-3`}
                >
                  <span>{enToBnNumber(item.roll)}</span>
                  <span className="flex-1">{item.stu_name}</span>
                  {removeToSelect.includes(item.id) ? (
                    <Check className="size-4 group-hover:text-white hidden group-hover:block" />
                  ) : (
                    <X className="size-4 group-hover:text-red-500 hidden group-hover:block" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end my-2 mx-4">
              <button
                onClick={() => setFilterModalOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 text-white font-semibold bg-red-500 rounded cursor-pointer hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PrintResultSheet;
