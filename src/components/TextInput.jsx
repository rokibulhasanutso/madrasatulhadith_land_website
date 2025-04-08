import React, { useState } from "react";

const TextInput = ({ name, onChange = () => null, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col m-2">
      <label>{name}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className="max-w-sm px-2.5 py-1.5 outline-none border border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
      />
    </div>
  );
};

export default TextInput;
