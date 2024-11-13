import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiInfo } from "react-icons/fi";
import MembersDetails from "../modals/Member-details-full";
import { formatDate } from "../../config/FormattedDate";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

const MemberCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState();

  const handleCopy = () => {
    toast.custom(
      <div className="bg-white px-6 py-3 rounded-lg flex items-center justify-center gap-4 shadow-lg">
        <FaRegCopy size={24} className="text-text_secondary" />
        <div className="text-text_primary  font-roboto text-xl flex gap-1">
          Copied
        </div>
      </div>,
      {
        position: "top-center",
        duration: 2000,
      }
    );
  };

  const textToCopy = item._id;

  return (
    <>
      <div
        className="col-span-3 p-2 rounded-lg shadow-member_card bg-white"
        key={index}
      >
        <div className="flex items-center justify-between my-1 pb-3 border-b-2 border-primary mb-2">
          <div className="flex items-center gap-3">
            {item.image.url ? (
              <img
                src={item.image.url}
                className="w-10 h-10 rounded-full object-cover object-center"
                alt="member"
              />
            ) : (
              <CgProfile className="w-10 h-10" color="#6B7280" />
            )}
            <div className="flex flex-col">
              <p className="roboto text-base text-btn_primary">
                {item.firstname + " " + item.lastname}
              </p>
              <p className="text-xs">{item.name}</p>
            </div>
          </div>
          {
            <FiInfo
              size={20}
              color="#1d4ed8"
              className="cursor-pointer"
              onClick={() => {
                setOpen(true);
                setMemberId(item._id);
              }}
            />
          }
        </div>
        <div className="flex justify-between items-center p-1">
          <div className="flex flex-col justify-between gap-3">
            <div className="">
              <p className="text-xs text-text_secondary">Membership ID</p>
              <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                <p
                  className="text-xs"
                  id="idToCopy"
                  style={{ cursor: "pointer" }}
                >
                  {textToCopy}
                </p>
              </CopyToClipboard>
            </div>
            <div className="">
              <p className="text-xs text-text_secondary">Membership</p>
              <p className="text-xs ">
                {formatDate(item.expiryTime.split("T")[0])}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3">
            <div className="">
              <p className="text-xs text-text_secondary">Mobile No.</p>
              <p className="text-xs">{item.mobileNumber}</p>
            </div>
            <div className="">
              <p className="text-xs text-text_secondary">Wallet</p>
              <p className="text-xs">
                {item.wallet && item.wallet.balance ? item.wallet.balance : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <MembersDetails
          image={item.image.url}
          data={item}
          expiryTime={item.expiryTime}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default MemberCard;
