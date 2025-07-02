import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSearchParams } from "react-router-dom";
import { enToBnNumber } from "../../utils/utils";

const ResultHomePage = () => {
  const supabaseUrl = "https://pzizwkiypuayrlaexixo.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6aXp3a2l5cHVheXJsYWV4aXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMzU1MzEsImV4cCI6MjA2MzcxMTUzMX0.WZsuoARZSf4HJFfhTwcaaAVduM-T6Y72JOHFfydT5Wc";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [serachParams] = useSearchParams();
  const id = parseInt(serachParams.get("orsi"));
  const class_code = parseInt(serachParams.get("c"));
  const roll = parseInt(serachParams.get("r"));

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: fetchedData, error } = await supabase
        .from("students")
        .select(
          "id, studentName, roll, classes (classLabel, class_code), studentImage"
        )
        .eq("id", id);
      // .eq("class_code", class_code)
      // .eq("roll", roll);

      setData(fetchedData);

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center h-screen font-bangla text-lg">
      {id && class_code && roll ? (
        data.map((item) => (
          <>
            <div className="my-8">
              <p className="font-galada text-3xl">মাদ্‌রাসাতুল হাদিস</p>
              <p className="text-center">২য় সাময়িক পরীক্ষা ২০২৫ইং</p>
            </div>
            <div>
              <img
                src={item.studentImage}
                alt="Student Image"
                className="rounded-full size-40 bg-cover ring-4 ring-gray-100 border border-gray-300"
              />
            </div>
            <p className="text-2xl font-semibold mt-6">{item.studentName}</p>
            <div className="flex justify-between gap-4">
              <p> শ্রেণীঃ {item.classes.classLabel}</p>
              <p> রোলঃ {enToBnNumber(item.roll)}</p>
            </div>
            <p className="my-2 px-5 text-center">
              আপনার পরীক্ষার ফলাফল এখনো প্রকাশিত হয়নি।
            </p>
          </>
        ))
      ) : (
        <div>
          <p>আপনার দেয়া তথ্যটি পাওয়া যায়নি।</p>
        </div>
      )}
    </div>
  );
};

export default ResultHomePage;
