import { React, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Toasts from "../../components/ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import logo from "../../assets/images/LOGO.png";
import { MdError } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";
import Loader from "../../components/ui/loader";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
const ClubLogin = () => {
  const navigate = useNavigate();
  const {
    data: profiledata,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  if (profileLoading) {
    return <Loader />;
  }

  if (profiledata) {
    navigate("/");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/club/login`,
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
          navigate("/login/operator");
        }
      }
    } catch (error) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={error.response.data.message}
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

  const handleForgetPass = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/club/forget-password`,
        {
          withCredentials: true,
        }
      );

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
        setLoading(false);
        navigate("/login/club/temp");
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
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className={`background relative h-screen bg-cover bg-center py-10 px-20 `}
      >
        <img
          src={arrow}
          alt="arrow"
          className="absolute -top-10 left-96 h-56 "
        />
        <img
          src={logo}
          alt="logo"
          className="absolute top-6 left-24 h-24 aspect-square object-cover object-center"
        />
        <div className="flex flex-col justify-center items-center gap-14 mt-40">
          <div className="h-14 w-[500px] -ml-14 border-2 bg-gradient-to-br from-blue-300 to-blue-700 rounded-xl flex justify-center items-center">
            <p className="font-semibold text-white text-3xl font-inter tracking-tight">
              Club Authentication
            </p>
          </div>
          <div className="grid w-full lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full ">
            <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
              <form
                onSubmit={handleLogin}
                className="w-3/5 flex flex-col gap-4 items-center justify-center"
              >
                <InputBox
                  type={"text"}
                  placeholder={"Username"}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Passwordbox
                  placeholder="Password"
                  onchange={(e) => setPassword(e.target.value)}
                />
                <Button name={"Login"} type={"submit"} />
                <p
                  className="text-blue-700 font-medium text-xs roboto cursor-pointer"
                  onClick={handleForgetPass}
                >
                  {loading ? (
                    <LuLoader2 className="animate-spin" size={20} />
                  ) : (
                    "Forget your password?"
                  )}
                </p>
              </form>
            </div>

            <div className="flex flex-col">
              <h1 className="mb-4">
                are you a member of <br />{" "}
                <span className="text-blue-700 font-bold">
                  british club kolkata?
                </span>
              </h1>
              <p className="font-medium text-3xl font-inter tracking-tight">
                if you don’t have an account
              </p>
              <h2 className="flex items-center max:lg-justify-center gap-2">
                <p className="font-medium text-3xl font-inter tracking-tight">
                  please
                </p>
                <a
                  href="/signup/club"
                  className="font-medium text-blue-700 text-3xl font-inter tracking-tight"
                >
                  register
                </a>
                <FaArrowRight size={22} color="blue" />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubLogin;
