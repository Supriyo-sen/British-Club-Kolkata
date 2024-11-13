import React, { useState } from "react";

const InputBox = ({ type, placeholder, id, onChange, value, disabled }) => {
  return (
    <>
      {type === "tel" ? (
        <input
          type={type && type}
          maxLength="10"
          minLength="10"
          onChange={onChange && onChange}
          pattern="[0-9]{10}"
          title="Mobile number should be 10 digits"
          id={id}
          placeholder={placeholder && placeholder}
          className=" bg-primary outline-none sm:w-full max-sm:w-4/5 h-6 py-5 px-4 rounded-lg text-sm text-text_primary "
          value={value && value}
        />
      ) : (
        <input
          type={type && type}
          id={id}
          placeholder={placeholder && placeholder}
          onChange={onChange}
          className=" bg-primary outline-none sm:w-full max-sm:w-4/5 h-6 py-5 px-4 rounded-lg text-sm text-text_primary "
          value={value && value}
          disabled={disabled && disabled}
        />
      )}
    </>
  );
};

export default InputBox;

// 3/5
