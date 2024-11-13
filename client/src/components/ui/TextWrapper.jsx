import React from "react";

const TextWrapper = ({ children, label, className }) => {
  return (
    <div className={`${className} text-start`}>
      <label className="font-semibold text-xs">
        {label} : {children}
      </label>
    </div>
  );
};

export default TextWrapper;
