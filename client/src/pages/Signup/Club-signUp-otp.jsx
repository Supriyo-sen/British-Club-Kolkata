import React, { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ClubRight from "../../components/auth/ClubRight";
import Toasts from "../../components/ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import logo from "../../assets/images/LOGO.png";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import Loader from "../../components/ui/loader";
import { LuLoader2 } from "react-icons/lu";

const ClubSignUpOtp = () => {
  const navigate = useNavigate();
  const {
    data: profiledata,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(59);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        setIsResendEnabled(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatedTime = (seconds % 60).toString().padStart(2, "0");

  if (profileLoading) {
    return <Loader />;
  }

  if (profiledata) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/club/verify-accessKey`,
        {
          OneTimeKey: otp,
        },
        { withCredentials: true }
      );

      if (data) {
        if (data.statusCode === 200) {
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
          if (data.data.role === "admin") {
            navigate("/");
          }
          if (data.data.role === "operator") {
            navigate("/Login/Operator");
          }
        }
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

  const handleResend = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otpResend = JSON.parse(localStorage.getItem("clubUsername"));
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/club/resend-otp`,
        {
          username: otpResend.data.username,
        },
        { withCredentials: true }
      );
      if (data) {
        setSeconds(59);
        setIsResendEnabled(false);
        setIsSubmitEnabled(true);
        setLoading(false);
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
      }
    } catch (error) {
      setLoading(false);
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
    <div
      className={`background relative h-screen bg-cover bg-center py-10 px-20 `}
    >
      <img
        src={arrow}
        alt="arrow"
        className="absolute -top-10 h-56 xl:left-80 lg:left-64 max-lg:hidden"
      />
      <img
        src={logo}
        alt="logo"
        className="absolute top-6 left-24 h-24 aspect-square object-cover object-center"
      />

      <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
        <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
          <form
            onSubmit={handleSubmit}
            className="w-3/5 flex flex-col gap-4 items-center justify-center"
          >
            <InputBox
              placeholder={"Write your verification code here"}
              type={"text"}
              onChange={(e) => setOtp(e.target.value)}
            />
            <h2 className="text-text_primary roboto font-medium flex gap-2">
              Your OTP will expire in{" "}
              <h3 className="text-blue-700 roboto font-medium">
                00:{formatedTime} seconds
              </h3>
            </h2>
            <div className="flex gap-10">
              <Button
                name={"Submit"}
                type={"submit"}
                disabled={!isSubmitEnabled}
              />
              <Button
                name={"Resend"}
                type={"button"}
                onClick={handleResend}
                disabled={!isResendEnabled || loading}
              />
            </div>
          </form>
        </div>
        <ClubRight />
      </div>
    </div>
  );
};

export default ClubSignUpOtp;
