import React, { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import ClubRight from "../../components/auth/ClubRight";
import logo from "../../assets/images/LOGO.png";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import Loader from "../../components/ui/loader";
import { useNavigate } from "react-router-dom";

const ClubSignUpOtpResend = () => {
  const navigate = useNavigate();
  const {
    data: profiledata,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  if (profileLoading) {
    return <Loader />;
  }

  if (profiledata) {
    navigate("/");
  }

  const formatedTime = (seconds % 60).toString().padStart(2, "0");
  return (
    <div
      className={`background relative h-screen bg-cover bg-center py-10 px-20 `}
    >
      <img
        src={arrow}
        alt="arrow"
        className="absolute -top-10 h-56 xl:left-80 lg:left-64 max-lg:hidden "
      />
      <img
        src={logo}
        alt="logo"
        className="absolute top-6 left-24 h-24 aspect-square object-cover object-center"
      />

      {/* Input starts here */}
      <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
        <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
          <div className="w-3/5 flex flex-col gap-4 items-center justify-center">
            <InputBox
              placeholder={"Write your verification code here"}
              type={"text"}
            />
            <h2 className="text-text_primary roboto font-medium flex gap-2">
              Your OTP will expire in{" "}
              <h3 className="text-blue-700 roboto font-medium">
                00:{formatedTime} seconds
              </h3>
            </h2>
            <div className="flex gap-10">
              <Button name={"Submit"} />
              <Button name={"Resend"} />
            </div>
          </div>
        </div>
        {/* Input ends here  */}
        <ClubRight />
      </div>
    </div>
  );
};

export default ClubSignUpOtpResend;
