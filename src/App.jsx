import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Result from "./pages/Result";
import NewResultCreate from "./pages/NewResultCreate";

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
            </Route>
          </Route>
          <Route path="*" element={<p>This page is not found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
