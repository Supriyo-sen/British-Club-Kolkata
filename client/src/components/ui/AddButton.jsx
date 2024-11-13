import React from "react";

const AddButton = ({ name, icon, toggle }) => {
  return (
    <>
      <button className="h-full w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-blue-700 text-white xl:text-xl lg:text-base md:text-sm text-xs  hover:shadow-md hover:shadow-blue-500 hover:bg-blue-600">
        {toggle ? (
          <>
            {name && name}
            {icon && icon}
          </>
        ) : (
          <>
            {icon && icon}
            {name && name}
          </>
        )}
      </button>
    </>
  );
};

export default AddButton;
