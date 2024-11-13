import React from "react";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Toasts from "../ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { useAddTransactionMutation } from "../../store/api/walletAPI";
import { LuLoader2 } from "react-icons/lu";

const TrWarning1 = ({
  onModal,
  onModalll,
  memberId,
  mode,
  type,
  payableAmount,
  couponAmount,
  setopenQuery,
}) => {
  const [
    addTransaction,
    {
      isSuccess: addTransactionSuccess,
      isLoading: addTransactionLoading,
      isError: addTransactionError,
    },
  ] = useAddTransactionMutation();
  const navigate = useNavigate();
  const handleIssueTransaction = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addTransaction({
        memberId: memberId,
        type: type,
        payableAmount: payableAmount,
        couponAmount: couponAmount,
        mode: mode,
      });

      if (data) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Success!"}
              message={data.message}
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
        onModalll();
        setopenQuery(false);
        navigate("/coupon");
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
            <p className="text-blue-600 font-semibold text-5xl font-inter tracking-tight">
              Are you sure ?
            </p>
            <p className="text-center text-lg font-medium tracking-tighter leading-5 font-inter mt-2">
              You want to proceed <br /> the transaction with this payment
              method?
            </p>
            <p className="text-center text-5xl font-medium tracking-tighter leading-5 font-inter flex mt-10 text-red-600">
              {mode}
            </p>
          </div>
          <form
            onSubmit={handleIssueTransaction}
            className="flex justify-between items-center"
          >
            <ButtonGroup
              name={"Cancel"}
              color={"bg-[#F8FAFC]"}
              textColor={"text-[#6B7280]"}
              onClick={() => {
                onModal();
              }}
            />
            <ButtonGroup
              name={
                addTransactionLoading ? (
                  <>
                    <LuLoader2 className="animate-spin" size={20} />
                  </>
                ) : (
                  <>Confirm</>
                )
              }
              color={"bg-btn_secondary"}
              textColor={"text-btn_primary"}
              type={"submit"}
              disabled={addTransactionLoading}
            />
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default TrWarning1;
