import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-300">
        <div className="container flex justify-center items-center py-4">
          <div>
            <img
              src="./../assets/logo.jpg"
              alt="logo"
              className="size-10 md:size-12"
            />
          </div>
          <h1 className="text-2xl md:text-3xl ms-3.5 md:ms-2.5 font-galada">
            মাদ্‌রাসাতুল হাদিস
          </h1>
        </div>
      </header>

      <main className="container mx-auto flex-1">
        <Outlet />
      </main>

      <footer className="text-center text-sm sm:text-base border-t border-slate-300">
        <div className="container py-2.5">
          All rights reserved by Madrasatul Hadis | since 2025
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
