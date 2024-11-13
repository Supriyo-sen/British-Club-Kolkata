import React from "react";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";

const ConfirmationExtend = ({onOpen}) => {
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-600/20 z-20 flex justify-center items-center">
        <div className="w-[470px] h-[270px] flex flex-col gap-5 p-6 bg-btn_secondary rounded-3xl items-center justify-center">
          <p className="font-inter text-5xl text-btn_primary font-semibold">
            Are you sure ?
          </p>
          <p className="text-center font-inter text-xl font-medium text-text_primary">
            You want extend the membership validity of <br />
            John Doe for 2 Years ?
          </p>
          <p className="font-inter text-base font-medium tracking-tighter">
            The Membership will expire on 20.10.27
          </p>
          <div className="flex justify-between w-full">
            <ButtonGroup name={"Cancel"} textColor={"text-text_primary"} onClick={()=>onOpen()}/>
            <ButtonGroup name={"Confirm"} textColor={"text-btn_primary"} />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ConfirmationExtend;
