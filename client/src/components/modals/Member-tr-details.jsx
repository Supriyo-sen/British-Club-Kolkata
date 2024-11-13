import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Toasts from "../ui/Toasts";
import { useFetchTransactionsQuery } from "../../store/api/walletAPI";
import { MdError } from "react-icons/md";

const MemberTrDetails = ({ onModal, search }) => {
  const navigate = useNavigate();

  const {
    data: fetchTransactions,
    isLoading: fetchLoading,
    isError: fetchError,
  } = useFetchTransactionsQuery({ search });

  if (fetchLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (fetchError) {
    toast.custom(
      <Toasts
        boldMessage={"Error!"}
        message={"Internal Server Error"}
        icon={<MdError className="text-red-600" size={32} />}
      />,
      {
        position: "top-center",
        duration: 2000,
      }
    );
    navigate(0);
  }

  if (!fetchTransactions) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] z-20">
        <div className="w-150 h-60 border bg-btn_secondary rounded-lg flex flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="bg-primary flex flex-col items-center justify-center w-full h-16 p-2 rounded-t-lg relative">
            <div>
              <div className="flex gap-10">
                <p className="text-btn_primary roboto font-medium !text-sm">
                  Member Name
                </p>
                <p className="lato !text-sm ">{fetchTransactions.memberName}</p>
              </div>
              <div className="flex gap-16 mt-1">
                <p className="text-btn_primary roboto font-medium !text-sm">
                  Member ID
                </p>
                <p className="lato !text-sm">{fetchTransactions.memberId}</p>
              </div>
            </div>
            <IoMdCloseCircleOutline
              size={28}
              className="absolute text-btn_primary right-2 top-2"
              onClick={() => onModal(false)}
            />
          </div>
          {/* Upper part ends here */}

          {/* Lower part starts here */}
          <div className="flex flex-col w-full h-full max-h-fit gap-4 justify-center items-center p-2">
            <div className="flex justify-between gap-2 items-center w-full">
              {/* 1st row starts here */}
              <div className="flex items-center justify-center w-1/2">
                <div>
                  <div className="flex justify-center items-start gap-6 w-full">
                    <p className="text-btn_primary roboto font-medium">
                      Recent Credit
                    </p>
                    <p className="lato font-medium">
                      {fetchTransactions.recentCredit}
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-7 w-full mt-2">
                    <p className="text-btn_primary roboto font-medium">
                      Recent Debit
                    </p>
                    <p className="lato font-medium">
                      {fetchTransactions.recentDebit}
                    </p>
                  </div>
                </div>
              </div>
              {/* 1st row ends here */}

              {/* 2nd row starts here*/}
              <div className="flex items-center justify-center w-1/2 gap-2">
                <div>
                  <div className="flex justify-start items-center gap-6 w-full">
                    <p className="text-btn_primary roboto font-medium">
                      Total Credited
                    </p>
                    <p className="lato font-medium">
                      {fetchTransactions.totalCreditedAmount}
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-7 w-full mt-2">
                    <p className="text-btn_primary roboto font-medium">
                      Total Debited
                    </p>
                    <p className="lato font-medium">
                      {fetchTransactions.totalDebitedAmount}
                    </p>
                  </div>
                </div>
              </div>
              {/* 2nd row ends here */}
            </div>

            {/* 3rd row starts here */}
            <div className="flex justify-center mt-3">
              <div className="flex justify-between items-center gap-6 w-full">
                <p className="text-btn_primary roboto font-medium">
                  Wallet Balance
                </p>
                <p className="lato font-medium">
                  {fetchTransactions.walletBalance}
                </p>
              </div>
            </div>
            {/* 3rd row ends here */}
          </div>
          {/* Lower part ends here */}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default MemberTrDetails;
