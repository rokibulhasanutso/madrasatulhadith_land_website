import { useSearchParams } from "react-router-dom";
import { classCode, subjectData } from "../staticData/classSubjectData";
import { useDataStore } from "../contextAPI/DataStore";
import Modal from "../components/Modal";
import { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import TextInput from "../components/TextInput";

const NewResultCreate = () => {
  const [searchParams] = useSearchParams();
  const { store } = useDataStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(0);

  // store;

  return (
    <div>
      <div className="space-y-1.5 my-2.5 *:font-medium">
        <h1 className="text-xl">
          শ্রেণীঃ {classCode[searchParams.get("class")]}
        </h1>
        <h1>বিষয়ঃ {subjectData[searchParams.get("subject")]}</h1>
      </div>

      <div>
        <h1>বিষয় ভিত্তিক শিক্ষার্থীর ফলাফল তালিকা তৈরি করুন</h1>
        <div className="space-y-3.5 mt-8">
          {store
            ?.filter((data) => data.class_code === searchParams.get("class"))
            ?.map((data, index) => (
              <div
                key={index}
                onClick={() => setModalOpen(true)}
                className="text-lg flex flex-col gap-0.5 border rounded px-4 py-2.5"
              >
                <div className="flex justify-between">
                  <p>নামঃ {data.stu_name}</p>
                  <p>রোলঃ {data.roll}</p>
                </div>
                <p>প্রাপ্ত নম্বরঃ {data.stu_name}</p>
              </div>
            ))}
        </div>
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
              {modalContent === 0 && (
                <div className="flex flex-col gap-y-2.5 max-w-3xs w-full my-5 mx-auto">
                  <h2 className="text-center">প্রাপ্ত নম্বর যুক্ত করুন</h2>

                  <TextInput placeholder={"প্রাপ্ত নম্বর"} onChange={() =>{}} />

                  <button
                    onClick={() => {}}
                    className={`px-4 py-2.5 text-white bg-emerald-500 rounded cursor-pointer`}
                  >
                    যুক্ত করুন
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewResultCreate;
