export const getGrade = (fullMark, number) => {
  const percent = (number / fullMark) * 100;
  if (percent >= 80) return "A+";
  if (percent >= 70) return "A";
  if (percent >= 60) return "A-";
  if (percent >= 50) return "B";
  if (percent >= 40) return "C";
  if (percent >= 33) return "D";
  return "F";
};

export function getBanglaPosition(rank = 0) {
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
