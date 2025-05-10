import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-300">
        <div className="container flex justify-between items-center py-4">
          <div className="flex items-center">
            <div>
              <img
                src="/src/assets/logo.jpg"
                alt="logo"
                className="size-10 md:size-12"
              />
            </div>
            <h1 className="text-2xl md:text-3xl ms-6 font-galada">
              মাদ্‌রাসাতুল হাদিস
            </h1>
          </div>

          <div>
            <button
              onClick={() => null}
              className="px-3 py-1.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer"
            >
              Menu
            </button>
          </div>
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
