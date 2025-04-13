import { useNavigate, useSearchParams } from "react-router-dom";
import { classCode, subjectData } from "../staticData/classSubjectData";
import { useDataStore } from "../contextAPI/DataStore";
import Modal from "../components/Modal";
import { useState } from "react";
import { BadgeAlert, BadgeCheck, ChevronLeft, Loader, X } from "lucide-react";
import TextInput from "../components/TextInput";
import supabase from "../supabase/config";
import { enToBnNumber } from "../utils/utils";

// Helper functions
const updateMainData = (prev, id, mark, subjectKey) => {
  const newObject = {
    id,
    [subjectKey]: mark,
  };

  const updatedData = prev.data.filter((item) => item.id !== id);

  return {
    data: [...updatedData, newObject],
  };
};

const getExistingMark = (data, subjectKey, mainDataUpdate) => {
  return (
    mainDataUpdate?.data.find((val) => val.id === data.id)?.[subjectKey] ||
    data[subjectKey] ||
    "00"
  );
};

const NewResultCreate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { store, refresh } = useDataStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [modalFullData, setModalFullData] = useState(null);
  const [mainDataUpdate, setMainDataUpdate] = useState({ data: [] });
  const [preUploadModal, setPreUploadModal] = useState({
    open: false,
    content: null,
  });

  const subjectKey = searchParams.get("subject");
  const classCodeLabel = classCode[searchParams.get("class")];
  const subjectLabel = subjectData[subjectKey];

  const handleOpenWithModal = (data) => {
    setModalFullData(data);
    setModalData({ id: data.id });
    setModalOpen(true);
  };

  const handleAddedNewQuery = () => {
    if (modalData.new_added_mark) {
      setMainDataUpdate((prev) =>
        updateMainData(prev, modalData.id, modalData.new_added_mark, subjectKey)
      );
    }
    setModalOpen(false);
  };

  // handle fetch for update request
  const handleUpdateBatchResult = async () => {
    setPreUploadModal((prev) => ({ ...prev, content: "loading" }));

    const { data, error } = await supabase
      .from("StudentResult")
      .upsert(mainDataUpdate.data, { onConflict: ["id"] })
      .select();

    if (data?.length) {
      setPreUploadModal((prev) => ({ ...prev, content: "success" }));
      refresh();
    } else if (error) {
      setPreUploadModal((prev) => ({ ...prev, content: "error" }));
    }
  };

  return (
    <div className="font-bangla text-lg">
      <div className="space-y-1.5 my-2.5 *:font-medium text-lg bg-emerald-500 text-white rounded overflow-hidden">
        <h1 className="text-center bg-emerald-600 px-4 py-2.5">
          বিষয় ভিত্তিক শিক্ষার্থীর ফলাফল তালিকা তৈরি করুন
        </h1>
        <div className="px-4 py-2.5 text-center space-y-2">
          <h1 className="text-lg px-4 py-1.5 rounded-full bg-white text-emerald-600 inline-block font-semibold">
            শ্রেণীঃ {classCodeLabel}
          </h1>
          <h1>বিষয়ঃ {subjectLabel}</h1>
        </div>
      </div>

      <div className="my-8 mb-96">
        <div className="space-y-3.5 my-8">
          {store
            ?.filter(
              (data) => data.class_code === parseInt(searchParams.get("class"))
            )
            .sort((a, b) => a.id - b.id)
            ?.map((data) => (
              <div
                key={data.id}
                onClick={() => handleOpenWithModal(data)}
                className={`text-lg flex flex-col gap-0.5 rounded px-4 py-2.5 ${
                  modalData?.id === data.id
                    ? "bg-emerald-100 ring-2 ring-emerald-500"
                    : "border border-gray-400"
                }`}
              >
                <div className="flex justify-between">
                  <p>নামঃ {data.stu_name}</p>
                  <p>
                    প্রাপ্ত নম্বরঃ{" "}
                    <span className="font-sans">
                      {getExistingMark(data, subjectKey, mainDataUpdate)}
                    </span>
                  </p>
                </div>
                <p>রোলঃ {data.roll}</p>
              </div>
            ))}
        </div>

        <button
          onClick={() =>
            setPreUploadModal((prev) => ({
              ...prev,
              open: true,
              content: "preview",
            }))
          }
          className={`p-4 w-full text-white bg-emerald-500 rounded-full font-medium cursor-pointer text-[22px] block`}
        >
          সকল ফলাফল আপডেট করুন
        </button>
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

              <h1 className="text-xl text-center font-semibold ms-2.5">
                {`${modalFullData.stu_name} (${modalFullData.roll})`}
              </h1>

              <div>
                <button
                  onClick={() => setModalOpen(false)}
                  className={`p-0.5 text-white font-semibold rounded-full cursor-pointer hover:bg-gray-300 bg-red-500`}
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

                  <TextInput
                    placeholder={"প্রাপ্ত নম্বর"}
                    focus={true}
                    onChange={(value) =>
                      setModalData((prev) => ({
                        ...prev,
                        new_added_mark: value,
                      }))
                    }
                    defaultValue={
                      mainDataUpdate.data.find(
                        (val) => val.id === modalFullData.id
                      )?.[subjectKey] || modalFullData?.[subjectKey]
                    }
                  />

                  <button
                    onClick={handleAddedNewQuery}
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

      {/* pre upload modal */}
      {preUploadModal.open && (
        <Modal>
          {preUploadModal.content === "preview" && (
            <>
              <div className="sticky top-0 bg-white flex justify-between items-center p-1.5 border-b border-slate-300">
                <h1 className="text-xl text-center font-semibold ms-2.5">
                  পুনরায় চেক করার পর আপডেট করুন
                </h1>

                <div>
                  <button
                    onClick={() =>
                      setPreUploadModal({ open: false, content: null })
                    }
                    className={`p-0.5 text-gray-500 font-semibold rounded-full cursor-pointer hover:bg-gray-300`}
                  >
                    <X />
                  </button>
                </div>
              </div>

              {/* content */}
              <div className="my-4 mx-2">
                {store
                  ?.filter(
                    (data) =>
                      data.class_code === parseInt(searchParams.get("class"))
                  )
                  ?.sort((a, b) => a.id - b.id)
                  ?.map((data, index) => (
                    <div
                      key={index}
                      onClick={() => handleOpenWithModal(data)}
                      className="text-lg flex flex-col gap-0.5 odd:bg-gray-100 px-4 py-2.5"
                    >
                      <div className="flex justify-between">
                        <p>রোলঃ {enToBnNumber(data.roll)}</p>
                        <p>{data.stu_name}</p>
                        <p>
                          প্রাপ্ত নম্বরঃ{" "}
                          <span className="font-sans">
                            {getExistingMark(data, subjectKey, mainDataUpdate)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}

                <button
                  onClick={handleUpdateBatchResult}
                  className={`my-10 p-2 w-full text-white bg-emerald-500 rounded-full font-medium cursor-pointer text-[22px] block`}
                >
                  ফলাফল আপডেট করুন
                </button>
              </div>
            </>
          )}

          {/* loading content */}
          {preUploadModal.content === "loading" && (
            <div className="flex flex-col justify-center h-[254px] items-center">
              <div className="flex gap-x-3">
                <Loader className="animate-spin" />{" "}
                <span>অনুগ্রহপূর্বক অপেক্ষা করুন</span>
              </div>
              <div>ফলাফল আপডেট হচ্ছে ...</div>
            </div>
          )}

          {/* upload success content */}
          {preUploadModal.content === "success" && (
            <div className="flex flex-col justify-center items-center mx-6 my-10">
              <div>
                <BadgeCheck className="text-emerald-500 size-16 mb-6" />
              </div>
              <div className="text-center">
                <p className="text-2xl">{classCodeLabel} শ্রেণী</p>
                <p>বিষয়ঃ {subjectLabel}</p>
              </div>

              <div className="my-4">
                <p className="text-2xl text-emerald-600 text-center">
                  ফলাফল সফলভাবে আপলোড হয়েছে
                </p>
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                <button
                  onClick={() =>
                    setPreUploadModal({ open: false, content: null })
                  }
                  className={`px-8 py-2 text-white bg-emerald-500 rounded-full font-medium cursor-pointer`}
                >
                  ঠিক আছে
                </button>
                <button
                  onClick={() => navigate("/result")}
                  className={`px-8 py-2 text-white bg-emerald-500 rounded-full font-medium cursor-pointer`}
                >
                  নতুন ফলাফল তৈরি করুন
                </button>
              </div>
            </div>
          )}
          {/* upload error content */}
          {preUploadModal.content === "error" && (
            <div className="flex flex-col justify-center items-center mx-6 my-10">
              <div>
                <BadgeAlert className="text-red-500 size-16 mb-6" />
              </div>

              <div className="mb-4">
                <p className="text-2xl text-red-600 text-center">
                  ফলাফল আপডেট হতে সমস্যা হচ্ছে পুনরায় চেষ্টা করুন
                </p>
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className={`px-8 py-2 text-white bg-emerald-500 rounded-full font-medium cursor-pointer`}
                >
                  হোমে ফিরে যান
                </button>
                <button
                  onClick={() =>
                    setPreUploadModal({ open: false, content: null })
                  }
                  className={`px-8 py-2 text-white bg-emerald-500 rounded-full font-medium cursor-pointer`}
                >
                  আবার চেষ্টা করুন
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default NewResultCreate;
