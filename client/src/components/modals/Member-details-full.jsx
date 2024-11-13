import React, { useState } from "react";
import ReactDOM from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaIdCard } from "react-icons/fa";
import ButtonGroup from "../ui/ButtonGroup";
import VirtualCard from "../ui/VirtualCard";
import Warning from "./Warning";
import { CopyToClipboard } from "react-copy-to-clipboard";
import UpdateMember from "./Update-member";
import { FaRegCopy } from "react-icons/fa6";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import {formatDate} from "../../config/FormattedDate";

const MembersDetails = ({ setOpen, image, data }) => {
  const [OpenWarning, setOpenWarning] = useState(false);
  const [OpenCard, setOpenCard] = useState(false);
  const [OpenUpdate, setOpenUpdate] = useState(false);

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
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/35 z-20">
        <div className="w-full max-w-2xl h-auto border bg-btn_secondary p-6 rounded-lg flex flex-col items-center gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="w-full flex justify-between items-center border-b-2 border-gray-600 pb-6">
            <div className="flex justify-center items-center gap-9">
              {image ? (
                <img
                  src={image}
                  alt="member"
                  className="w-20 h-20 aspect-auto rounded-full object-cover object-center"
                />
              ) : (
                <CgProfile
                  className="w-20 h-20 aspect-auto rounded-full object-cover object-center"
                  color="#6B7280"
                />
              )}
              <div className="flex flex-col gap-2">
                <p className="text-3xl text-btn_primary font-bold font-sans">
                  {data.firstname + " " + data.lastname}
                </p>
                <p className="text-text_primary roboto">{data.name}</p>
              </div>
            </div>

            <div className="flex gap-16 items-center justify-center">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setOpenCard(true);
                }}
              >
                <FaIdCard size={100} className="text-btn_primary" />
              </div>
              <div
                onClick={() => {
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <IoIosCloseCircleOutline size={30} color="blue" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-1 border-red-600 w-full">
            {/* Row1 starts here */}
            <div className="flex">
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">Member ID</p>
                <CopyToClipboard text={data._id} onCopy={handleCopy}>
                  <p className="lato text-sm text-text_primary font-normal cursor-pointer">
                    {data._id}
                  </p>
                </CopyToClipboard>
              </div>
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">Email</p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.email ? data.email : "N/A"}
                </p>
              </div>
            </div>
            {/* Row1 ends here */}
            {/* Row2 starts here */}
            <div className="flex">
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">
                  Membership Validity
                </p>
                <p className="lato text-sm text-text_primary font-normal">
                  Expires on {formatDate(data.expiryTime.split("T")[0])}
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">Address</p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.address}
                </p>
              </div>
            </div>
            {/* Row2 ends here */}
            {/* Row3 starts here */}
            <div className="flex">
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">Mobile No</p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.mobileNumber}
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-btn_primary roboto font-normal">
                  Wallet Amount
                </p>
                <p className="lato text-sm text-text_primary font-normal">
                  {data.wallet ? data.wallet.balance : 0}
                </p>
              </div>
            </div>
            {/* Row3 ends here */}
            {/* Row4 starts here */}
            <div className="flex">
              {data.bloodGroup ? (
                <div className="w-1/2">
                  <p className="text-btn_primary roboto font-normal">
                    Blood Group
                  </p>
                  <p className="lato text-sm text-text_primary font-normal">
                    {data.bloodGroup}
                  </p>
                </div>
              ) : null}
              {data.organization ? (
                <div className="w-1/2">
                  <p className="text-btn_primary roboto font-normal">
                    Organization Name
                  </p>
                  <p className="lato text-sm text-text_primary font-normal">
                    {data.organization}
                  </p>
                </div>
              ) : null}
            </div>
            {/* Row4 ends here */}
            {/* Row5 starts here */}
            <div className="flex">
              {data?.idProof?.idType ? (
                <div className="w-1/2">
                  <p className="text-btn_primary roboto font-normal">
                    {data.idProof ? <>{data.idProof.idType} (ID)</> : null}
                  </p>
                  <p className="lato text-sm text-text_primary font-normal">
                    {data.idProof ? data.idProof.idNumber : null}
                  </p>
                </div>
              ) : null}
            </div>
            {/* Row5 ends here */}
          </div>
          <div className="w-full flex justify-end gap-6">
            <ButtonGroup
              name={"Update"}
              color={"bg-btn_secondary"}
              textColor={"text-btn_primary"}
              onClick={() => setOpenUpdate(true)}
            />
            <ButtonGroup
              name={"Remove Member"}
              textColor={"text-text_red"}
              HovertextColor={"hover:text-white"}
              toggle={false}
              color={"bg-btn_secondary"}
              HoverColor={"hover:bg-red-600"}
              Hovershadow={"hover:shadow-danger_shadow"}
              shadow={"shadow-danger_shadow"}
              icon={<IoIosCloseCircleOutline size={30} />}
              onClick={() => setOpenWarning(true)}
            />
            {OpenWarning && (
              <Warning
                memberId={data._id}
                onModal={() => setOpenWarning(false)}
              />
            )}
            {OpenUpdate && (
              <UpdateMember
                expiryTime={data.expiryTime}
                timeStamp={data.timeStamp}
                memberId={data._id}
                onModal={() => setOpenUpdate(false)}
                setOpen={setOpen}
              />
            )}
          </div>
        </div>
      </div>
      {OpenCard && (
        <VirtualCard
          onModal={() => setOpenCard(false)}
          data={data}
          Qrcode={data}
          image={image}
        />
      )}
    </>,
    document.getElementById("portal")
  );
};

export default MembersDetails;
