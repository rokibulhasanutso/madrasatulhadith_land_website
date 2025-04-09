import React, { useEffect, useRef, useState } from "react";

const TextInput = ({
  name,
  onChange = () => null,
  placeholder,
  defaultValue,
  focus,
}) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <div className="flex flex-col m-2">
      <label>{name}</label>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className="max-w-sm w-full px-2.5 py-1.5 outline-none border border-gray-300 focus:border-transparent rounded focus:ring-2 focus:ring-emerald-300 font-sans"
      />
    </div>
  );
};

export default TextInput;
