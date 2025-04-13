export const subjectMark = {
  // class_code: {
  //  subject_code: full_mark
  // }
  1: {
    118: 25,
  },
  7: {
    115: 50,
  },
};

// // ei object data ami function e input dibo
// const fn_parameter_data = {
//   101 : "",
//   102 : "55",
//   103 : "",
//   104 : "",
//   105 : "",
//   106 : "",
//   107 : "",
//   108 : "",
//   109 : "",
//   110 : "",
//   111 : "",
//   112 : "",
//   113 : "",
//   114 : "",
//   115 : "",
//   116 : "40",
//   117 : "",
//   118 : "",
//   class_code: 6,
//   full_marks: 800,
//   grade : "F",
//   id : 145,
//   obtained_marks : "0",
//   percentage : "0",
//   roll : "১২",
//   stu_name : "আবু রায়হান"
// }

// // r erokom data ami output cai
// const returnData = {
//   stu_name: "",
//   class_code: "",
//   roll: "",
//   total_marks: Number, // data type is number,
//   total_full_marks: Number, // data type is number,
//   grade: "", // note: over all subject grade
//   placement: "",
//   result_details: [
//     {
//       subject_code: Number, // data type is number,
//       full_mark: Number, // data type is number,
//       obtain_mark: Number, // data type is number,
//       subject_grade: "",
//     },
//     ...
//   ]
// }

// // এখানে result details er khettre class_code diye subject_code ber korte hobe.
// // orthat class_code 6, subject_code 101, 102, 103, 104, .. erokom ekta array thakbe.
// // sei array thke ekekti subject_code niye result_details tori korte hobe

// // subject code er array niche deya holo
// export const GetSubjectCodeByClass = {
//   1: [101, 102, 103, 104, 105, 109, 118], // play
//   2: [101, 102, 103, 104, 105, 109, 118], // nursery
//   3: [101, 102, 103, 104, 105, 106, 107, 109, 110], // class 1
//   4: [101, 102, 103, 104, 106, 107, 108, 109, 110, 113], // class 2
//   5: [101, 102, 103, 104, 106, 107, 108, 109, 110, 114], // class 3
//   6: [101, 102, 103, 111, 112, 115, 116, 117], // class 4
//   7: [101, 102, 103, 111, 112, 115, 116, 117], // class 5
// };

// // ekhon full_mark ta hobe emon je
// export const subjectMark = {
//   // class_code: {
//   //  subject_code: full_mark
//   // }
//   1: {
//     118: 25,
//   },
// };

// // subject_code ebong class_code diye filter korbe.
// // jodi subject_code 118 er class_code 1 pay tahole return korbe 25 ar na pele return korbe 100
// // full_mark: subjectMark[class_code][subject_code] || 100

// // ekhon obtain_mark e subject code onujayi mark bose jabe jemon
// // obtain_mark: data[118] eta number e convert korbe

// // ekhon subject grade ber korbe calculation onujayi
// export const getGrade = (fullMark, number) => {
//   if (fullMark <= 0) return "Invalid full mark";

//   const percentage = (number / fullMark) * 100;

//   if (percentage >= 80 && percentage <= 100) {
//     return "A+";
//   } else if (percentage >= 70) {
//     return "A";
//   } else if (percentage >= 60) {
//     return "A-";
//   } else if (percentage >= 50) {
//     return "B";
//   } else if (percentage >= 40) {
//     return "C";
//   } else if (percentage >= 33) {
//     return "D";
//   } else if (percentage >= 0) {
//     return "F";
//   } else {
//     return "Invalid number";
//   }
// };

// // tover all grade dibe apnar deya calculation onujayi
// // total_full_marks hobe subject full Mark er total full mark
// // total_obtained_marks hobe subject obtained mark er total obtained mark

// // ekhon amake uporer information onujayi ekta function toiri kore dau
