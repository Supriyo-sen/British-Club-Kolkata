import React, { useState, useEffect } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { MdAddCircle, MdError } from "react-icons/md";
import { AiFillMinusCircle } from "react-icons/ai";
import InputBox from "../ui/InputBox";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";
import Toasts from "../ui/Toasts";
import toast from "react-hot-toast";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import TrWarning from "./TrWarning";

const OperatorReceive = ({ onModall, walletdata, setopenQuery }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [updatedBalance, setUpdatedBalance] = useState(0);

  const [mode, setMode] = useState("Choose Method");
  const [openExtend, setOpenExtend] = useState(false);
  const [OpenWarning, setOpenWarning] = useState(false);

  useEffect(() => {
    if (walletdata && walletdata.wallet.balance !== undefined) {
      setUpdatedBalance(walletdata.wallet.balance + Number(amount));
    }
  }, [amount, walletdata]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount(0); // Set amount to empty string if input is empty
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setAmount(parsedValue);
      }
    }
  };

  const increaseAmount = () => {
    setAmount((prevAmount) => prevAmount + 50);
  };

  const decreaseAmount = () => {
    setAmount((prevAmount) => (prevAmount - 50 >= 0 ? prevAmount - 50 : 0));
  };

  const handleWarning = (e) => {
    e.preventDefault();
    try {
      if (!walletdata.wallet.memberId._id) {
        toast.custom(
          <Toasts
            boldMessage={"Error!"}
            message={"Please select a member first"}
            icon={<MdError className="text-text_red" size={32} />}
          />,
          {
            position: "top-center",
            duration: 2000,
          }
        );
        return;
      }

      if (amount < 1) {
        toast.custom(
          <Toasts
            boldMessage={"Error!"}
            message={"please enter amount"}
            icon={<MdError className="text-text_red" size={32} />}
          />,
          {
            position: "top-center",
            duration: 2000,
          }
        );
        return;
      }

      if (mode === "Choose Method") {
        toast.custom(
          <Toasts
            boldMessage={"Error!"}
            message={
              "please select a payment method to proceed with the transaction"
            }
            icon={<MdError className="text-text_red" size={32} />}
          />,
          {
            position: "top-center",
            duration: 2000,
          }
        );
        return;
      }

      setOpenWarning(true);
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
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] z-20">
        <div className="w-[712px] h-[504px] border bg-btn_secondary rounded-lg flex flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="bg-primary flex flex-col gap-3 justify-center w-full h-[104px] py-6 px-9 rounded-t-lg">
            <div className="flex gap-10">
              <p className="text-btn_primary roboto font-medium">Member Name</p>
              <p className="lato">
                {walletdata && walletdata.wallet.memberId.firstname}{" "}
                {walletdata && walletdata.wallet.memberId.lastname}
              </p>
            </div>
            <div className="flex gap-[73px]">
              <p className="text-btn_primary roboto font-medium">Member ID</p>
              <p className="lato">
                {walletdata && walletdata.wallet.memberId._id}
              </p>
            </div>
          </div>
          {/* Upper part ends here */}

          {/* Lower part starts here */}
          <form
            className="flex flex-col w-full px-9 py-6"
            onSubmit={handleWarning}
          >
            {/* 1st row starts here */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <p className="text-btn_primary roboto font-medium">
                  Enter Receivable amount :
                </p>
                <div className="flex justify-stretch items-center gap-2 w-64">
                  <div className="cursor-pointer">
                    <AiFillMinusCircle
                      size={40}
                      color="#3B82F6"
                      onClick={decreaseAmount}
                    />
                  </div>
                  <input
                    type="number"
                    className="bg-primary outline-none sm:w-full max-sm:w-4/5 h-6 py-5 px-4 rounded-lg text-sm text-text_primary appearance-none"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <div className="cursor-pointer">
                    <MdAddCircle
                      size={40}
                      color="#3B82F6"
                      onClick={increaseAmount}
                    />
                  </div>
                </div>
              </div>
              <div className="w-52">
                <label
                  htmlFor=""
                  className="flex flex-col items-end gap-3 text-btn_primary roboto font-medium"
                >
                  Current Wallet Balance
                  <div className="w-32">
                    <div className="bg-primary outline-none flex items-center justify-center h-6 py-5 px-4 rounded-lg text-lg text-text_primary">
                      {walletdata && walletdata.wallet.balance}
                    </div>
                  </div>
                </label>
              </div>
            </div>
            {/* 1st row ends here */}

            {/* 2nd row starts here */}
            <div className="flex justify-between items-center mt-12 mb-20">
              <div className="">
                <label className="flex flex-col relative text-btn_primary roboto font-medium w-56 gap-2">
                  Select Payment Method
                  <div
                    className={`flex items-center gap-1 bg-primary pr-2  ${
                      openExtend ? "rounded-t-lg" : "rounded-lg"
                    }`}
                  >
                    <InputBox
                      type="text"
                      onChange={(e) => setMode(e.target.value)}
                      value={mode}
                      placeholder="Select Method"
                      disabled={true}
                    />
                    <BsArrowUpSquareFill
                      size={30}
                      onClick={() => setOpenExtend(!openExtend)}
                      className={`${!openExtend &&
                        "transform rotate-180"} ease-in-out duration-300 cursor-pointer`}
                    />
                  </div>
                  {openExtend && (
                    <div className="bg-primary outline-none rounded-b-lg text-text_primary absolute top-20 border-t-2 border-btn_primary w-56 text-base">
                      <ul className="flex flex-col items-center cursor-pointer">
                        <li
                          onClick={() => {
                            setMode("CASH");
                            setOpenExtend(false);
                          }}
                          className="hover:bg-btn_secondary hover:text-btn_primary w-full  pt-2.5 pb-1 px-4"
                        >
                          CASH
                        </li>
                        <li
                          onClick={() => {
                            setMode("CARD");
                            setOpenExtend(false);
                          }}
                          className="hover:bg-btn_secondary hover:text-btn_primary w-full  py-1 px-4"
                        >
                          CARD
                        </li>
                        <li
                          onClick={() => {
                            setMode("UPI");
                            setOpenExtend(false);
                          }}
                          className="hover:bg-btn_secondary hover:text-btn_primary w-full  py-1 px-4"
                        >
                          UPI
                        </li>
                      </ul>
                    </div>
                  )}
                </label>
              </div>
              <div className="w-56 flex flex-col items-end gap-2 self-center">
                <p className="text-btn_primary roboto font-medium text-center">
                  Updated Wallet Balance
                </p>
                <div className="w-32">
                  <div className="bg-primary outline-none flex items-center justify-center h-6 py-5 px-4 rounded-lg text-lg text-text_primary">
                    {updatedBalance}
                  </div>
                </div>
              </div>
            </div>
            {/* 2nd row ends here */}

            {/* 3rd row starts here */}
            <div className="flex justify-end w-full gap-6">
              <ButtonGroup
                name={"Cancel"}
                color={"bg-btn_secondary"}
                textColor={"text-text_primary"}
                onClick={() => onModall()}
              />
              <ButtonGroup
                name={"Confirm"}
                color={"bg-btn_secondary"}
                textColor={"text-btn_primary"}
                type={"submit"}
              />
              {OpenWarning && (
                <TrWarning
                  mode={mode}
                  onModal={() => setOpenWarning(false)}
                  onModall={() => onModall()}
                  memberId={walletdata && walletdata.wallet.memberId._id}
                  type={"receive"}
                  payableAmount={0}
                  couponAmount={Number(amount)}
                  setopenQuery={setopenQuery}
                />
              )}
            </div>
            {/* 3rd row ends here */}
          </form>
          {/* Lower part ends here */}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default OperatorReceive;
