import React from "react";
import VirtualCardStyle from "../../style/virtualCard.module.css";
import { CgProfile } from "react-icons/cg";

function FrontView({ data, image, frontendRef }) {
  const date_time = data.expiryTime.split("T")[0];
  return (
    <div className={VirtualCardStyle.card} ref={frontendRef}>
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-black to-white opacity-45" />
      {/* card top section */}
      <div className="container flex justify-between pb-2 border-b border-white relative">
        <div className=" flex flex-col gap-2 justify-center ">
          <div className="flex gap-2 items-center">
            <h4 className="font-semibold text-base text-white">Name:</h4>
            <p className="text-sm text-start capitalize font-medium text-white">
              {data.firstname && data.lastname
                ? data.firstname + " " + data.lastname
                : "N/A"}
            </p>
          </div>
          <div className="flex gap-2">
            <h4 className="font-semibold text-sm text-start text-white">
              Member Id:
            </h4>
            <p className="text-sm text-start text-white">
              {data._id ? data._id : "N/A"}
            </p>
          </div>
        </div>
        {image ? (
          <img
            src={image}
            alt="member"
            className="w-20 h-20 aspect-auto rounded-full object-cover object-center "
          />
        ) : (
          <CgProfile
            className="w-20 h-20 aspect-auto rounded-full object-cover object-center"
            color="#6B7280"
          />
        )}
      </div>
      {/* card bottom section */}
      <div className=" flex flex-col py-2 gap-2 justify-center relative">
        <div className="flex gap-2 items-center">
          <h4 className="font-semibold text-sm text-white">Mobile No.:</h4>
          <p className="text-sm text-start text-white">
            {data.mobileNumber ? data.mobileNumber : "N/A"}
          </p>
        </div>
        <div className="flex gap-2">
          <h4 className="font-semibold text-sm text-white">Valid Upto:</h4>
          <p className="text-sm text-start text-white">
            {date_time ? date_time : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FrontView;
