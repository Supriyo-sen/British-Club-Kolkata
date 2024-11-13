import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Toasts from "../../components/ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import logo from "../../assets/images/logoP.png";
import { MdError } from "react-icons/md";
import Loader from "../../components/ui/loader";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import ButtonGroup from "../../components/ui/ButtonGroup";

const OperatorLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const {
    data: profiledata,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();

  if (profileLoading) return <Loader />;
  if (profiledata) navigate("/");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/operator/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (data) {
        toast.custom(
          <Toasts
            boldMessage={"Success!"}
            message={data.message}
            icon={
              <IoCheckmarkDoneCircleOutline
                className="text-text_tertiaary"
                size={32}
              />
            }
          />,
          {
            position: "top-center",
            duration: 2000,
          }
        );
        navigate("/");
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
    <div className="background_1 relative h-screen bg-cover bg-center overflow-hidden py-10 px-20">
      <img src={arrow} alt="arrow" className="absolute -top-10 left-96 h-56 " />
      <img
        src={logo}
        alt="logo"
        className="absolute top-6 left-24 h-24 aspect-square object-cover object-center"
      />
      <div className="flex flex-col justify-center items-center gap-14 mt-40">
        <div className="h-14 w-[500px] -ml-14 border-2 bg-gradient-to-br from-purple-300 to-purple-700 rounded-xl flex justify-center items-center">
          <p className="font-semibold text-white text-3xl font-inter tracking-tight">
            Operator Authentication
          </p>
        </div>
        <div className="grid w-full lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full">
          <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center">
            <form
              onSubmit={handleLogin}
              className="w-3/5 flex flex-col gap-4 items-center justify-center "
            >
              <InputBox
                placeholder={"Username"}
                type={"text"}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Passwordbox
                placeholder="Password"
                onchange={(e) => setPassword(e.target.value)}
              />
              <ButtonGroup
                name={"Login"}
                color={"bg-white"}
                textColor={"text-text_purple"}
                HoverColor={"hover:bg-text_purple"}
                Hovershadow={"hover:shadow-purple-500"}
              />
              <a
                href="/login/operator/forgotPass"
                className="text-text_purple roboto"
              >
                Forgot your password?
              </a>
            </form>
          </div>
          <div className="flex flex-col">
            <h1 className="mb-4">
              a new dashboard <br />
              system for the{" "}
              <span className="text-text_purple font-bold">
                british <br />
                club kolkata
              </span>
            </h1>
            <div className="flex flex-col">
              <p className="font-medium text-3xl font-inter tracking-tight">
                if you don’t have an account
              </p>
              <h2 className="flex items-center max:lg-justify-center gap-2 font-medium text-3xl">
                <p className="font-medium text-3xl font-inter tracking-tight">
                  please
                </p>
                <a
                  href="/signup/operator"
                  className="font-medium text-text_purple text-3xl font-inter tracking-tight"
                >
                  register
                </a>
                <FaArrowRight size={22} color="#7E22CE" />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorLogin;
