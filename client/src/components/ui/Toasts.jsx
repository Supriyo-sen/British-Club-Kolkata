import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
const Toasts = ({ boldMessage, message, icon }) => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && (
        <div className="bg-white px-6 py-3 rounded-lg flex items-center justify-center gap-6 shadow-lg">
          {icon && icon}
          <div className="text-text_primary  font-roboto text-xl flex gap-1">
            <p className="font-medium">{boldMessage && boldMessage}</p>
            <p className="font-normal">{message && message}</p>
          </div>

          <div className="cursor-pointer " onClick={() => setVisible(false)}>
            <IoMdClose size={24} className="text-text_primary" />
          </div>
        </div>
      )}
    </>
  );
};

export default Toasts;
