import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Result from "./pages/Result";
import NewResultCreate from "./pages/NewResultCreate";
import ResultSheetLayout from "./layouts/ResultSheetLayout";
import ResultPrint from "./pages/TestToPrintResultSheet";
import PrintResultSheet from "./pages/PrintResultSheet";
import ResultSheetOfficeLayout from "./layouts/ResultSheetOfficeLayout";
import OnlineResult from "./pages/OnlineResult";
import OnlineResultSheet from "./pages/OnlineResultSheet";
import supabase from "./supabase/config";
import { useEffect } from "react";
import MonthlyExamRoutine from "./pages/MonthlyExamRoutine";
import MonthlyExamResultCreate from "./pages/monthly/MonthlyExamResultCreate";
import MonthlyInsertResult from "./pages/monthly/MonthlyInsertResult";

const App = () => {
  const fetchSutdents = async () => {
    const { data } = await supabase.from("students").select("*");
    console.log(data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    fetchSutdents();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<OnlineResult />} />
            {/* <Route
              path="/online-result-sheet"
              element={<OnlineResultSheet />}
            />
            <Route index element={<Home />} />
            <Route path="/office" element={<h1>This page is up comming</h1>} />
            <Route path="/teacher" element={<h1>This page is up comming</h1>} />
            <Route path="/student" element={<h1>This page is up comming</h1>} />
            <Route path="/result">
              <Route index element={<Result />} />
              <Route path="create" element={<NewResultCreate />} />
              <Route
                path="/result/sheet/print"
                element={<PrintResultSheet />}
              />
              <Route
                path="/result/sheet/office-print"
                element={<ResultSheetOfficeLayout />}
              />
            </Route> */}
          </Route>
          <Route path="/monthly-exam-" element={<MainLayout />}>
            <Route path="routine-sheet" element={<MonthlyExamRoutine />} />
            <Route path="create-result" element={<MonthlyExamResultCreate />} />
            <Route path="insert-result" element={<MonthlyInsertResult />} />
            <Route path="result-sheet" element={<MonthlyExamRoutine />} />
          </Route>
          {/* <Route
            path="/result-sheet"
            element={
              <>
                {Array.from({ length: 1 }).map((_, index) => (
                  <ResultSheetLayout key={index} />
                ))}
              </>
            }
          /> */}
          {/* <Route path="/result-print" element={<ResultPrint />} /> */}
          <Route path="*" element={<p>This page is not found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
