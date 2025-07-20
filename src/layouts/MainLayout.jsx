import { Mail, PhoneCall } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const phoneNumber = "+8801812410135";
  const message = "Hello, I am interested in your service.";

  // Call handler
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // SMS handler
  const handleSMS = () => {
    window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-300">
        <div className="container flex justify-center items-center py-4">
          <div className="flex items-center">
            <div>
              <img
                src="/logo-transparent.jpg"
                alt="logo"
                className="size-10 md:size-12"
              />
            </div>
            <h1 className="text-2xl md:text-3xl ms-6 font-galada">
              মাদ্‌রাসাতুল হাদিস
            </h1>
          </div>

          <div className="space-x-2.5">
            {/* <button
              onClick={handleCall}
              className="px-3 py-1.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer"
            >
              <PhoneCall />
            </button>
            <button
              onClick={handleSMS}
              className="px-3 py-1.5 text-white font-semibold bg-emerald-500 rounded cursor-pointer"
            >
              <Mail />
            </button> */}
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
