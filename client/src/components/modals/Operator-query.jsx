import React, { useState } from "react";
import ReactDom from "react-dom";
import { IoExitOutline } from "react-icons/io5";
import ButtonGroup from "../ui/ButtonGroup";
import OperatorIssue from "./Operator-issue";
import OperatorReceive from "./Operator-receive";

const OperatorQuery = ({ onOpen, walletdata, setWalletData, setopenQuery }) => {
  const [openIssue, SetopenIssue] = useState(false);
  const [openReceive, SetopenReceive] = useState(false);

  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-400/25 z-10">
      <section className="w-[712px] h-[418px] border bg-btn_secondary rounded-lg flex flex-col items-center gap-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        {/* Upper div starts here */}
        <div className="bg-primary flex flex-col gap-3 justify-center w-full h-[120px] py-6 px-9 rounded-t-lg">
          <div className="flex gap-10">
            <p className="text-btn_primary roboto font-medium ">Member Name</p>
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
          <div className="flex gap-[37px]">
            <p className="text-btn_primary roboto font-medium">
              Wallet Balance
            </p>
            <p className="lato">{walletdata && walletdata?.wallet?.balance}</p>
          </div>
        </div>
        {/* Upper div ends hete */}

        {/* Lower div starts here */}
        <div className="flex flex-col gap-9 px-16 items-center">
          {/* Heading starts */}
          <div>
            <p className="text-3xl font-roboto text-btn_primary font-semibold">
              What do you want ?
            </p>
          </div>
          {/* Heading ends */}

          {/* Buttons starts */}
          <div className="flex gap-24">
            <div
              className="bg-primary w-60 flex flex-col items-center gap-3 p-2 rounded-xl cursor-pointer group hover:bg-gradient-to-br from-sky-400 to-btn_primary"
              onClick={() => SetopenReceive(true)}
            >
              <p className="text-2xl font-roboto font-medium text-btn_primary group-hover:text-primary">
                Credit Wallet
              </p>
              <div>
                <IoExitOutline
                  size={50}
                  className="text-btn_primary group-hover:text-btn_secondary"
                />
              </div>
            </div>
            {openReceive && (
              <OperatorReceive
                walletdata={walletdata}
                setopenQuery={setopenQuery}
                onModall={() => SetopenReceive(false)}
              />
            )}
            <div
              className="bg-primary w-60 flex flex-col items-center gap-3 p-2 rounded-xl cursor-pointer group hover:bg-gradient-to-br from-sky-400 to-btn_primary group-hover:bg"
              onClick={() => SetopenIssue(true)}
            >
              <p className="text-2xl font-roboto font-medium text-btn_primary group-hover:text-primary">
                Debit Wallet
              </p>
              <div className="-rotate-180">
                <IoExitOutline
                  size={50}
                  className="text-btn_primary group-hover:text-btn_secondary"
                />
              </div>
            </div>
            {openIssue && (
              <OperatorIssue
                walletdata={walletdata}
                setWalletData={setWalletData}
                setopenQuery={setopenQuery}
                onModalll={() => SetopenIssue(false)}
              />
            )}
          </div>
          {/* Buttons ends */}

          {/* Cancel button starts */}
          <div>
            <ButtonGroup
              color={"bg-btn_secondary"}
              textColor={"text-text_primary"}
              name={"Cancel"}
              onClick={onOpen}
            />
          </div>
          {/* Cancel button ends */}
        </div>
        {/* Lower div ends here */}
      </section>
    </div>,
    document.getElementById("portal")
  );
};

export default OperatorQuery;
