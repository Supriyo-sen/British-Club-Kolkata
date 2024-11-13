import React from "react";

const ButtonGroup = ({
  name,
  icon,
  toggle,
  color,
  HoverColor="hover:bg-btn_primary",
  textColor,
  HovertextColor="hover:text-primary",
  type,
  onClick,
  Hovershadow = 'hover:shadow-blue-500',
  shadow='shadow-btn_shadow hover:shadow-blue-500',
  // disable= 'disabled:opacity-50',
  disabled=false,
}) => {
  return (
    <>
      <button
        className={`flex gap-2 items-center justify-center px-6 py-2 rounded-xl transition ease-in-out delay-150 ${color} ${HoverColor} ${textColor} ${HovertextColor} lg:text-xl  font-medium ${Hovershadow} duration-300 roboto ${shadow}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
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

export default ButtonGroup;
