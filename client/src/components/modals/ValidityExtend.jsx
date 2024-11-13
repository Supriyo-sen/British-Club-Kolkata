import React, { useState } from "react";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";
import ConfirmationExtend from "./ConfirmationExtend";

const ValidityExtend = () => {
    const [extend, setExtend] = useState(false);
  return (
    <>

        <div className="w-52 h-56 bg-btn_secondary px-4 py-6 rounded-xl flex flex-col items-center gap-4 transition-all ease-in-out delay-200">
          <div className="flex flex-col gap-1">
            <p className="font-roboto font-medium text-btn_primary text-xl">
              Extend Validity for
            </p>
            <div className="flex flex-col text-text_black">
              <label
                for="extend"
                className="flex items-center gap-2 lato text-xl"
              >
                <input
                  type="radio"
                  name="extend"
                  id="1year"
                  className="w-4 h-4 accent-text_primary"
                />
                1 Year
              </label>

              <label
                for="extend"
                className="flex items-center gap-2 lato text-xl"
              >
                <input
                  type="radio"
                  name="extend"
                  id="2year"
                  className="w-4 h-4 accent-text_primary"
                />
                2 Years
              </label>

              <label
                for="extend"
                className="flex items-center gap-2 lato text-xl"
              >
                <input
                  type="radio"
                  name="extend"
                  id="3year"
                  className="w-4 h-4 accent-text_primary"
                />
                3 Years
              </label>
            </div>
          </div>
          <ButtonGroup name={"Confirm"} textColor={"text-btn_primary"} onClick={()=>setExtend(true)}/>
        </div>
      {
        extend && <ConfirmationExtend onOpen={()=>setExtend(false)}/>
      }
    </>
  );
};

export default ValidityExtend;
