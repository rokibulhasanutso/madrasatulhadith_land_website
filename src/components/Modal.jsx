import React from "react";

const Modal = ({ children, className }) => {
  return (
    <div className={`fixed inset-0 bg-black/75 ${className}`}>
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-2xl min-h-[254px] md:min-h-[512px] max-h-[calc(100vh-256px)] overflow-auto mx-4 bg-white rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
