import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import Passwordbox from "../../components/ui/Passwordbox";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/logoP.png";
import axios from "axios";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Toasts from "../../components/ui/Toasts";
import toast from "react-hot-toast";
import { MdError } from "react-icons/md";
const OperatorResetPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  if (!token) {
    toast.custom(
      <>
        <Toasts
          boldMessage={"Error!"}
          message={"invalid token" || "Internal Server Error"}
          icon={<MdError className="text-text_red" size={32} />}
        />
      </>,
      {
        position: "top-center",
        duration: 2000,
      }
    );
    navigate("/operator/login");
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/operator/reset-password/${token}`,
        {
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }
      );
      if (data) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Success!"}
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
        navigate("/login/operator");
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
  return (
    <div className="background_1 relative h-screen bg-cover bg-center px-20 grid grid-rows-12 grid-cols-12 gap-4">
      <img src={arrow} alt="arrow" className="absolute top-0 h-56 left-96 " />
      <img
        src={logo}
        alt="logo"
        className="absolute top-6 left-24 h-24 aspect-square object-cover object-center"
      />

      {/* Input starts here */}
      <div className="flex flex-col justify-center row-start-4 row-end-10 col-start-3 col-end-11 px-62">
        <form onSubmit={resetPassword} className="flex flex-col gap-6 w-full">
          <h1 className="text-5.5xl">reset password ?</h1>
          <p className="font-medium text-2xl font-inter tracking-tight">
            You are a step away from accessing your <br /> account !
          </p>
          <Passwordbox
            placeholder={"New Password"}
            onchange={(e) => setNewPassword(e.target.value)}
          />
          <Passwordbox
            placeholder={"Confirm Password"}
            onchange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <ButtonGroup
              color={"bg-white"}
              textColor={"text-text_purple"}
              HoverColor={"hover:bg-text_purple"}
              Hovershadow={"hover:shadow-purple-500"}
              name={"Login"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
      {/* Input ends here  */}
    </div>
  );
};

export default OperatorResetPass;
