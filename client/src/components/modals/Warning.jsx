import React from "react";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";
import { useDeleteMemberMutation } from "../../store/api/memberAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Toasts from "../ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";

const Warning = ({ onModal, memberId }) => {
  const navigate = useNavigate();
  const [deleteMember, { isLoading, isError }] = useDeleteMemberMutation();

  const handleDelete = async () => {
    try {
      const deleteData = await deleteMember(memberId).unwrap();
      if (deleteData) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Success!"}
              message={"Member deleted successfully"}
              icon={
                <IoCheckmarkDoneCircleOutline
                  className="text-text_tertiaary"
                  size={32}
                />
              }
            />
          </>,
          {
            position: "top-center",
            duration: 2000,
          }
        );
        onModal();
        navigate(0);
      }
    } catch (error) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={error.response.data.message || "Internal Server Error"}
            icon={<MdError className="text-text_red" size={32} />}
          />
        </>,
        {
          position: "top-center",
          duration: 2000,
        }
      );
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-400/25 z-20">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[470px] h-[328px] bg-[#F8FAFC] p-6 flex flex-col justify-between rounded-3xl">
          <div className="w-full flex flex-col gap-3 items-center">
            <p className="text-red-600 font-semibold text-5xl font-inter">
              warning !
            </p>
            <p className="text-center text-lg font-medium tracking-tighter leading-5 font-inter">
              Are you sure you want to remove all the data <br /> of the member
              from your database ?
            </p>
            <p className="text-base text-text_primary font-medium font-inter">
              Deleted data cannot be retrived later.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <ButtonGroup
              name={"Cancel"}
              color={"bg-[#F8FAFC]"}
              textColor={"text-[#6B7280]"}
              onClick={() => {
                onModal();
              }}
            />
            <ButtonGroup
              name={"Submit"}
              color={"bg-blue-700"}
              textColor={"text-white"}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Warning;
