import { classBySubjectCode } from "../staticData/classSubjectData";

// EnglishNumberConvertToBanglaNumber
export const enToBnNumber = (number) => {
  const bnNumber = new Intl.NumberFormat("bn-BD").format(number);
  return bnNumber === "০" ? "০০" : bnNumber;
};

export const classBySubjectNumberOfObject = (data) =>
  Object?.fromEntries(
    classBySubjectCode[data?.class_code]?.map((key) => [key, data[key]])
  );

export const objectToTotalMarks = (marks_object) =>
  Object?.values(marks_object).reduce(
    (acc, curr) => acc + (isNaN(parseInt(curr)) ? 0 : parseInt(curr)),
    0
  );

export const getGrade = (fullMark, number) => {
  if (fullMark <= 0) return "Invalid full mark";

  const percentage = (number / fullMark) * 100;

  if (percentage >= 80 && percentage <= 100) {
    return "A+";
  } else if (percentage >= 70) {
    return "A";
  } else if (percentage >= 60) {
    return "A-";
  } else if (percentage >= 50) {
    return "B";
  } else if (percentage >= 40) {
    return "C";
  } else if (percentage >= 33) {
    return "D";
  } else if (percentage >= 0) {
    return "F";
  } else {
    return "Invalid number";
  }
};

export const modifySubjectFullMark = (subjects, code) => {
  return code in subjects ? subjects[code] : 100;
};
