import React, { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import { FaArrowRight } from "react-icons/fa6";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClubRight from "../../components/auth/ClubRight";
import { LuLoader2 } from "react-icons/lu";
import Toasts from "../../components/ui/Toasts";
import { MdError } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import logo from "../../assets/images/LOGO.png";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import Loader from "../../components/ui/loader";

const ClubSignUp = () => {
  const {
    data: profiledata,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();
  const [role, setRole] = useState("Choose role");
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (profileLoading) {
    return <Loader />;
  }

  if (profiledata) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmpassword) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={"Please enter a valid search"}
            icon={<MdError className="text-text_red" size={32} />}
          />
        </>,
        {
          position: "top-center",
          duration: 2000,
        }
      );
      return;
    }

    if (role === "Choose role") {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={"Please select a role"}
            icon={<MdError className="text-text_red" size={32} />}
          />
        </>,
        {
          position: "top-center",
          duration: 2000,
        }
      );
      return;
    }

    if (password !== confirmpassword) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={"Password do not match with confirmpassword"}
            icon={<MdError className="text-text_red" size={32} />}
          />
        </>,
        {
          position: "top-center",
          duration: 2000,
        }
      );
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/club/create`,
        {
          username,
          email,
          password,
          role,
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
        localStorage.setItem("clubUsername", JSON.stringify(data));
      }

      if (role === "operator") {
        navigate("/signup/club/otp");
        return;
      }

      if (role === "admin") {
        navigate("/signup/club/otp");
        return;
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
    } finally {
      setLoading(false);
    }
  };

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
      <div className="grid lg:grid-rows-1 lg:grid-cols-2 max-lg:grid-rows-2 max-lg:grid-cols-1 h-full lg:pt-40 ">
        <div className="flex flex-col gap-4 items-center text-center justify-start max-lg:order-2 max-lg:justify-center ">
          <form
            onSubmit={handleSubmit}
            className="w-3/5 flex flex-col gap-4 items-center justify-center"
          >
            <InputBox
              type={"text"}
              placeholder={"Username"}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputBox
              type={"email"}
              placeholder={"Email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Passwordbox
              placeholder="Password"
              onchange={(e) => setPassword(e.target.value)}
            />
            <Passwordbox
              placeholder="Confirm Password"
              onchange={(e) => setConfirmpassword(e.target.value)}
            />
            <div className="bg-primary w-full py-2.5 rounded-lg">
              <select
                className="bg-primary w-11/12 outline-none font-semibol text-text_primary"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option
                  value="Choose role"
                  disabled
                  className="bg-primary py-5 px-4"
                >
                  Choose role
                </option>
                <option value="admin">Admin</option>
                <option value="operator">Operator</option>
              </select>
            </div>
            <div className="mt-20">
              <Button
                name={
                  loading ? (
                    <>
                      <LuLoader2 className="animate-spin" size={20} />
                    </>
                  ) : (
                    <>Sign up</>
                  )
                }
                type={"submit"}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col">
          <ClubRight />
          <p className="font-medium text-3xl font-inter tracking-tight">
            if you already have an account
          </p>
          <h2 className="flex items-center max:lg-justify-center gap-2">
            <p className="font-medium text-3xl font-inter tracking-tight">
              please
            </p>
            <a
              href="/login/club"
              className="font-medium text-blue-700 text-3xl font-inter tracking-tight"
            >
              login
            </a>
            <FaArrowRight size={22} color="blue" />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ClubSignUp;
