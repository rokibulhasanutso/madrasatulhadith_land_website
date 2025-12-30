import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useResultsData from "../../hook/useResultsData";
import ResultMarkSheetTemplate from "./ResultMarkSheetTemplate";
import { LoaderCircle } from "lucide-react";

const ResultHomePage = () => {
  const [serachParams] = useSearchParams();
  const id = parseInt(serachParams.get("orsi"));
  const class_code = parseInt(serachParams.get("c"));

  const roll = useMemo(() => {
    const rollParamRaw = serachParams.get("r");
    return rollParamRaw
      ? rollParamRaw
          .split(",")
          .map((r) => parseInt(r))
          .filter((n) => !isNaN(n))
      : [];
  }, [serachParams]);

  const { loading: resultLoading, data: resultData } = useResultsData({
    idParam: id,
    classCodeParam: class_code,
    rollParams: roll,
  });

  // return (
  //   <div className="max-w-[210mm] mx-auto">
  //     {resultLoading ? (
  //       <div className="flex justify-center items-center h-screen">
  //         <div className="flex gap-2">
  //           <LoaderCircle className="animate-spin" />
  //           <p>অপেক্ষা করুন...</p>
  //         </div>
  //       </div>
  //     ) : (
  //       <>
  //         {resultData?.map((data) => (
  //           <ResultMarkSheetTemplate
  //             sheetName={""}
  //             examName={"তৃতীয় সাময়িক পরীক্ষা ২০২৫ ইং"}
  //             data={data}
  //           />
  //         ))}
  //       </>
  //     )}
  //   </div>
  // );

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-4xl font-galada">মাদ্‌রাসাতুল হাদিস</h1>
          <p>বার্ষিক পরীক্ষা - ২০২৫ইং</p>
          <p className="my-5">
            <p>আপানার বার্ষিক পরীক্ষার ফলাফল মাদরাসায় দেওয়া হবে।</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultHomePage;
