// Imports
import { subjectMark } from "../staticData/subjectMarksData";
import {
  subjectData,
  classBySubjectCode,
  classCodeByLebel,
} from "../staticData/classSubjectData";

// Utility: Get Grade based on full mark and obtained mark
export function getGrade(fullMark, number) {
  if (fullMark <= 0) return "Invalid full mark";

  const percentage = (number / fullMark) * 100;

  if (percentage >= 80 && percentage <= 100) return "A+";
  if (percentage >= 70) return "A";
  if (percentage >= 60) return "A-";
  if (percentage >= 50) return "B";
  if (percentage >= 40) return "C";
  if (percentage >= 33) return "D";
  if (percentage >= 0) return "F";

  return "Invalid number";
}

// Step 1: Individual student result processor
export function processStudentResult(data) {
  const classCode = data?.class_code;
  const subjectCodes = classBySubjectCode[classCode] || [];

  let totalMarks = 0;
  let totalFullMarks = 0;
  let hasFailed = false;
  let allAreAPlus = true;

  const resultDetails = subjectCodes.map((subjectCode) => {
    const fullMark = subjectMark[classCode]?.[subjectCode] || 100;
    const rawValue = data[subjectCode];
    const obtainMark = rawValue === "" ? 0 : Number(rawValue);
    const subjectGrade = getGrade(fullMark, obtainMark);

    totalMarks += obtainMark;
    totalFullMarks += fullMark;

    if (subjectGrade !== "A+") allAreAPlus = false;
    if (subjectGrade === "F") hasFailed = true;

    return {
      subject: subjectData[subjectCode],
      full_mark: fullMark,
      obtain_mark: obtainMark,
      grade: subjectGrade,
    };
  });

  let overallGrade = getGrade(totalFullMarks, totalMarks);
  if (hasFailed) overallGrade = "F";
  else if (overallGrade === "A+" && !allAreAPlus) overallGrade = "A";

  return {
    id: data.id,
    stu_name: data.stu_name,
    class: classCodeByLebel[classCode],
    class_code: classCode,
    roll: data.roll,
    total_marks: totalMarks,
    total_full_marks: totalFullMarks,
    grade: overallGrade,
    placement: "", // To be set later
    result_details: resultDetails,
  };
}

// Step 2: Get Bangla formatted placement
export function getBanglaPlacement(rank) {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const specialSuffixMap = {
    1: "ম",
    2: "য়",
    3: "য়",
    4: "র্থ",
    5: "ম",
    6: "ষ্ঠ",
    7: "ম",
    8: "ম",
    9: "ম",
    10: "ম",
  };
  const suffix = specialSuffixMap[rank] || " তম";
  const banglaNumber = rank
    .toString()
    .split("")
    .map((d) => banglaDigits[parseInt(d)])
    .join("");
  return banglaNumber + suffix;
}

// Step 3: Group processed results by class code
export function groupResultsByClassCode(students) {
  const grouped = {};
  for (const student of students) {
    const classCode = student.class_code;
    if (!grouped[classCode]) grouped[classCode] = [];
    grouped[classCode].push(student);
  }
  return grouped;
}

// Step 4: Process All Students and assign placement by class
export function processAllResultsWithPlacementByClass(allStudents) {
  const processedResults = allStudents.map(processStudentResult);

  const classWiseGroups = {};
  for (const student of processedResults) {
    const classCode = student.class_code;
    if (!classWiseGroups[classCode]) classWiseGroups[classCode] = [];
    classWiseGroups[classCode].push(student);
  }

  const finalResults = [];
  for (const classCode in classWiseGroups) {
    const students = classWiseGroups[classCode];
    const sorted = [...students].sort((a, b) => b.total_marks - a.total_marks);

    const ranked = students.map((student) => {
      const rank = sorted.findIndex((s) => s.id === student.id) + 1;
      return {
        ...student,
        placement: rank,
      };
    });

    finalResults.push(...ranked);
  }

  return groupResultsByClassCode(finalResults.sort((a, b) => a.roll - b.roll));
}
