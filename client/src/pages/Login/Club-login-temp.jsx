import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import Passwordbox from "../../components/ui/Passwordbox";
import Button from "../../components/ui/Button";
import InputBox from "../../components/ui/InputBox";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/LOGO.png";
import { useTemporaryLoginMutation } from "../../store/api/clubAPI";
import toast from "react-hot-toast";
import Toasts from "../../components/ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import Loader from "../../components/ui/loader";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
const ClubLoginTemp = () => {
  const [temporaryLogin] = useTemporaryLoginMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const {
    data: profiledata,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();

  if (profileLoading) return <Loader />;
  if (profiledata) navigate("/");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await temporaryLogin({ username, password }).unwrap();
      if (data) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Success!"}
              message={"Login successful"}
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
        navigate("/settings/admin/temp");
        navigate(0);
      }
    } catch (error) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={error?.data?.message || "Internal Server Error"}
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
    <>
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
              onSubmit={handleLogin}
              className="w-3/5 flex flex-col gap-4 items-center justify-center"
            >
              <InputBox
                type={"text"}
                placeholder={"Temporary Username"}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Passwordbox
                placeholder="Temporary Password"
                onchange={(e) => setPassword(e.target.value)}
              />
              <Button name={"Login"} type={"submit"} />
            </form>
          </div>

          <div className="flex flex-col">
            <h1 className="mb-4 text-text_primary font-inter tracking-tight">
              Login to a temporary <br />{" "}
              <span className="text-black font-inter tracking-tight font-semibold">
                admin account.
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubLoginTemp;
