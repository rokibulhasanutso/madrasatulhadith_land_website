import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Result from "./pages/Result";
import NewResultCreate from "./pages/NewResultCreate";
import ResultSheetLayout from "./layouts/ResultSheetLayout";
import ResultPrint from "./pages/TestToPrintResultSheet";
import PrintResultSheet from "./pages/PrintResultSheet";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
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
            </Route>
          </Route>
          <Route
            path="/result-sheet"
            element={
              <>
                {Array.from({ length: 1 }).map((_, index) => (
                  <ResultSheetLayout key={index} />
                ))}
              </>
            }
          />
          <Route path="/result-print" element={<ResultPrint />} />
          <Route path="*" element={<p>This page is not found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
