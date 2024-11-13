import React, { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import ChangePassword from "../../components/form/ChangePassword";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import Warning from "../../components/modals/Warning";
import {
  useGetOperatorProfileQuery,
  useLogoutMutation,
} from "../../store/api/operatorAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Toasts from "../../components/ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import Loader from "../../components/ui/loader";

const Settings = () => {
  const navigate = useNavigate();
  const [warning, setWarning] = useState();
  const [logout] = useLogoutMutation();
  const {
    data: profiledata,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();

  if (profileLoading) return <Loader />;
  if (!profiledata) navigate("/login/club");
  if (profiledata.data.role !== "operator") navigate("/");

  const handleLogout = async () => {
    try {
      const data = await logout().unwrap();

      if (data) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Success!"}
              message={"Logout Successfully"}
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
        navigate("/login/club");
        navigate(0);
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
    <>
      <div className="background bg-cover bg-center">
        <div className="container w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
          <ChangePassword colStart={"col-start-5"} colEnd={"col-end-9"} />
          <div className="row-start-11 row-end-12 col-start-8 col-end-12 flex gap-4 justify-center">
            <ButtonGroup
              textColor={"text-red-600"}
              HovertextColor={"hover:text-white"}
              toggle={false}
              color={"bg-white"}
              HoverColor={"hover:bg-red-600"}
              name={"Logout"}
              icon={<TbLogout />}
              Hovershadow={"hover:shadow-danger_shadow"}
              shadow={"shadow-danger_shadow"}
              onClick={handleLogout}
            />
            {warning && <Warning onModal={() => setWarning(false)} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
