import { getBanglaPosition } from "../../utils/secondtermExamFunction";
import { enToBnNumber } from "../../utils/utils";

const ResultMarkSheetTemplate = ({ sheetName, data, examName }) => {
  return (
    <div className={`${sheetName} p-2 bg-center bg-cover`}>
      <div className="bg-repeat-y bg-center bg-cover h-full">
        <div className="font-bangla text-base px-4 py-4 border border-gray-400 rounded flex flex-col h-full">
          {/* heading point */}
          <div className="text-center">
            <div className="relative">
              <img
                src="/logo-transparent.jpg"
                alt="logo"
                className="w-16 absolute top-2"
              />
              <h1 className="font-galada text-3xl my-4">মাদ্‌রাসাতুল হাদিস</h1>
            </div>
            <div>
              <h2 className="font-semibold">{examName}</h2>
              <h2 className="font-semibold">অনলাইন রেজাল্ট শীট</h2>
            </div>
          </div>

          <div className="space-y-8 my-8 flex-1">
            {/* student info details */}
            <div className="flex w-full justify-between">
              <div className="w-2/3">
                {/* <div className="mb-4">
                  <img
                    src={data?.studentImage}
                    alt="Student Image"
                    className="size-26 rounded-md ring-2 ring-gray-400 bg-cover bg-top"
                  />
                </div> */}
                <table className="border-collapse w-full font-semibold text-lg">
                  <tbody className="**:w-1/2 ml-2">
                    <tr>
                      <td>শিক্ষার্থীর নামঃ</td>
                      <td>{data.name}</td>
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
                      <td>{enToBnNumber(data.total_obtained_marks)}</td>
                    </tr>
                    <tr>
                      <td>প্রাপ্ত গ্রেডঃ</td>
                      <td>{data.grade}</td>
                    </tr>
                    <tr>
                      <td>স্থান অর্জন</td>
                      <td>{getBanglaPosition(data.placement)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* grading system */}
              <div className="w-1/3">
                <table className="border-collapse **:border **:border-gray-400 **:py-0.5 w-full text-base text-center">
                  <thead>
                    <tr>
                      <th>নম্বরের পরিসর</th>
                      <th>গ্রেড সমূহ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>৮০-১০০</td>
                      <td>A+</td>
                    </tr>
                    <tr>
                      <td>৭০-৭৯</td>
                      <td>A</td>
                    </tr>
                    <tr>
                      <td>৬০-৬৯</td>
                      <td>A-</td>
                    </tr>
                    <tr>
                      <td>৫০-৫৯</td>
                      <td>B</td>
                    </tr>
                    <tr>
                      <td>৪০-৪৯</td>
                      <td>C</td>
                    </tr>
                    <tr>
                      <td>৩৩-৩৯</td>
                      <td>D</td>
                    </tr>
                    <tr>
                      <td>০০-৩২</td>
                      <td>F</td>
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
                    {/* <th className="w-[60px]">ক্রঃ নংঃ</th> */}
                    <th>বিষয়</th>
                    <th className="w-[60px]">পূর্ণমান</th>
                    <th className="w-[60px]">প্রাপ্ত নম্বর</th>
                    <th className="w-[60px]">প্রাপ্ত গ্রেড</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.results?.map((data, index) => (
                    <tr key={index} className="*:border text-center">
                      {/* <td>{enToBnNumber(index + 1)}</td> */}
                      <td className="px-2 text-left">{data.sub_name}</td>
                      <td>{enToBnNumber(data.full_marks)}</td>
                      <td>{enToBnNumber(data.obtained_marks)}</td>
                      <td>{data.grade}</td>
                    </tr>
                  ))}

                  {/* total result table */}
                  <tr className="*:border text-center ">
                    <td
                      colSpan={1}
                      className="!border-l-transparent !border-b-transparent"
                    />
                    <td>{enToBnNumber(data?.total_full_marks)}</td>
                    <td>{enToBnNumber(data?.total_obtained_marks)}</td>
                    <td>{data?.grade}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm my-5">
            [বিঃ দ্রঃ]: ফলাফল বিষয়ে কোনো সমস্যা থাকলে অফিস কক্ষে জানানোর জন্য
            অনুরোধ করা হলো।
          </p>

          {/* footer info */}
          <div className="flex justify-between">
            <div className="text-xs">
              <p>প্রতিষ্ঠানের নাম: মাদ্‌রাসাতুল হদিস</p>
              <p>স্থাপিতঃ ২০২০ইং</p>
              <p>মাদ্‌রাসা ভিত্তিক প্রতিষ্ঠান</p>
            </div>
            <div className="text-xs text-center self-end mx-4 w-[120px]">
              <div className="flex justify-center">
                <img
                  src="/authorizer-singnature.jpg"
                  alt="authorizer-singnature"
                  className="w-[120px] contrast-100"
                />
              </div>
              <p>জাহাঙ্গীর সরকার</p>
              <p>পরিচালক</p>
              <p>মাদ্‌রাসাতুল হদিস</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultMarkSheetTemplate;
