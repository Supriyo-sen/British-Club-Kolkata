import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import OperatorQuery from "../modals/Operator-query";
const SearchBox = ({
  type,
  placeholder,
  onchange,
  value,
  onClick,
  iconShow = true,
}) => {
  const [openQuery, setopenQuery] = useState(false);
  return (
    <>
      <div className="relative h-full rounded-lg">
        <input
          type={type}
          placeholder={placeholder}
          onChange={onchange}
          value={value}
          className="bg-primary w-full h-full rounded-lg px-6 py-4 text-text_primary outline-none"
        />
        {iconShow && (
          <IoIosSearch
            className="absolute cursor-pointer right-5 top-1/3 hover:scale-150 transition duration-300 ease-in-out"
            size={20}
            color="grey"
            onClick={onClick}
          />
        )}
      </div>
      {openQuery && <OperatorQuery onOpen={() => setopenQuery(false)} />}
    </>
  );
};

export default SearchBox;
