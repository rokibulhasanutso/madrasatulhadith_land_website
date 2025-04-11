import { getGrade } from "../utils/utils";
import {
  classCodeByLebel,
  classBySubjectCode as GetSubjectCodeByClass,
  subjectData,
} from "./classSubjectData";
import { subjectMark } from "./subjectMarksData";

export function processStudentResult(data) {
  const classCode = data.class_code;
  const subjectCodes = GetSubjectCodeByClass[classCode] || [];

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

    if (subjectGrade !== "A+") {
      allAreAPlus = false;
    }
    if (subjectGrade === "F") {
      hasFailed = true;
    }

    return {
      subject: subjectData[subjectCode],
      full_mark: fullMark,
      obtain_mark: obtainMark,
      grade: subjectGrade,
    };
  });

  // const averagePercentage = (totalMarks / totalFullMarks) * 100;
  let overallGrade = getGrade(totalFullMarks, totalMarks);

  if (hasFailed) {
    overallGrade = "F";
  } else if (overallGrade === "A+" && !allAreAPlus) {
    overallGrade = "A"; // downgrade if not all A+
  }

  return {
    stu_name: data.stu_name,
    class: classCodeByLebel[classCode],
    roll: data.roll,
    total_marks: totalMarks,
    total_full_marks: totalFullMarks,
    grade: overallGrade,
    placement: "", // তুমি চাইলে পরে যোগ করতে পারো
    result_details: resultDetails,
  };
}
