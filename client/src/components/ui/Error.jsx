import React from "react";

const Error = ({ number, title, description }) => {
  return (
    <div>
      <div className="h-full w-full flex flex-col items-center justify-center font-inter tracking-tight text-center">
        <h1 className="text-9xl text-text_secondary">{number && number}</h1>
        <p className="text-5xl font-bold mt-6 mb-4 ">{title && title}</p>
        <p className="text-3xl font-medium text-gray-500">
          {description && description}
        </p>
      </div>
    </div>
  );
};

export default Error;
