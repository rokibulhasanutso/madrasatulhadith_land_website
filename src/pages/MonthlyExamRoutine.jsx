import React, { useEffect, useState } from "react";
import supabase from "../supabase/config";
import RoutineLayout from "../layouts/RoutineLayout";

const MonthlyExamRoutine = () => {
  const [data, setdata] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  const fetchStudents = async () => {
    const { data: fetchedData } = await supabase.from("students").select("*");

    if (fetchedData) {
      const sorted = fetchedData.sort((a, b) => a.id - b.id);
      setdata(sorted);

      // Group into pairs
      const grouped = [];
      for (let i = 0; i < sorted.length; i += 2) {
        grouped.push(sorted.slice(i, i + 2));
      }

      setGroupedData(grouped);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  console.log(groupedData);

  return (
    <div>
      {groupedData?.map((data) => (
        <div className="size-A4-landscape *:w-1/2 *:p-[1.25cm] flex *:first:border-r *:first:border-dashed *:border-gray-400">
          <RoutineLayout data={data[0]} />
          <RoutineLayout data={data[1]} />
        </div>
      ))}
    </div>
  );
};

export default MonthlyExamRoutine;
