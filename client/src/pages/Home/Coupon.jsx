import React, { useState } from "react";
import CouponTable from "../../components/ui/CouponTable";
import axios from "axios";
import Toasts from "../../components/ui/Toasts";
import toast from "react-hot-toast";
import { MdError } from "react-icons/md";
import OperatorQuery from "../../components/modals/Operator-query";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/ui/loader";
import DropDownSearch from "../../components/ui/DropDownSearch";

const Coupon = () => {
  const navigate = useNavigate();
  const [openQuery, setopenQuery] = useState(false);
  const [walletdata, setWalletData] = useState(0);
  const [memberSearch, setMemberSearch] = useState("");

  const {
    data: profileData,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();

  if (profileLoading) return <Loader />;

  if (!profileData) navigate("/login/operator");

  const handleSearch = async (search) => {
    try {
      if (!search._id) {
        toast.custom(
          <Toasts
            boldMessage={"Error!"}
            message={"Please select a member to view coupon details."}
            icon={<MdError className="text-red-600" size={32} />}
          />,
          {
            position: "top-center",
            duration: 2000,
          }
        );
        return;
      }
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/wallet/get/${search._id}`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        setWalletData(data.data);
        setopenQuery(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.custom(
          <Toasts
            boldMessage={"Error!"}
            message={error.response.data.message}
            icon={<MdError className="text-red-600" size={32} />}
          />,
          {
            position: "top-center",
            duration: 2000,
          }
        );
      } else {
        toast.custom(
          <Toasts
            boldMessage={"Error!"}
            message={"An unexpected error occurred. Please try again later."}
            icon={<MdError className="text-red-600" size={32} />}
          />,
          {
            position: "top-center",
            duration: 2000,
          }
        );
      }
    }
  };

  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen">
        <div className="container grid grid-rows-12 grid-cols-12 gap-4 mx-auto">
          <div className="row-start-2 row-end-3 col-start-2 col-end-12 overflow-y-auto">
            <DropDownSearch
              handleSearch={handleSearch}
              memberSearch={memberSearch}
              setMemberSearch={setMemberSearch}
            />
          </div>
          <div className="row-start-3 row-end-12 col-start-2 col-end-12">
            <CouponTable walletdata={walletdata} reloadQuery={openQuery} />
          </div>
        </div>
      </div>
      {openQuery && (
        <OperatorQuery
          walletdata={walletdata}
          setWalletData={setWalletData}
          setopenQuery={setopenQuery}
          onOpen={() => setopenQuery(false)}
        />
      )}
    </>
  );
};

export default Coupon;
