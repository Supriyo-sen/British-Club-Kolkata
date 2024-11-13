import React from "react";
import ChangePassword from "../../components/form/ChangePassword";
import UserManagement from "../../components/modals/UserManagement";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { TbLogout } from "react-icons/tb";
import { useGetAllProfileQuery } from "../../store/api/clubAPI";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import toast from "react-hot-toast";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Toasts from "../../components/ui/Toasts";
import {
  useGetOperatorProfileQuery,
  useLogoutMutation,
} from "../../store/api/operatorAPI";
import Loader from "../../components/ui/loader";
const SettingsAdmin = () => {
  const navigate = useNavigate();
  const {
    data: profiledata,
    isLoading: profileLoading,
    error: profileError,
  } = useGetOperatorProfileQuery();

  const { data: allprofiledata, isLoading } = useGetAllProfileQuery();

  const [
    logout,
    { isLoading: logoutLoading, isError: logoutIsError },
  ] = useLogoutMutation();

  if (profileLoading) return <Loader />;
  if (isLoading) return <Loader />;
  if (logoutLoading) return <Loader />;

  if (!profiledata) navigate("/login/club");

  if (profiledata.data.role !== "admin") {
    navigate("/");
  }

  const handleLogout = async () => {
    try {
      const { data } = await logout();

      if (logoutIsError) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Error!"}
              message={"Logout Failed"}
              icon={<MdError className="text-text_red" size={32} />}
            />
          </>,
          {
            position: "top-center",
            duration: 2000,
          }
        );
      }
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
            message={"Logout Failed"}
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
      <div className="background bg-cover bg-center w-full h-screen">
        <div className="container mx-auto grid grid-rows-12 grid-cols-12 gap-4">
          <ChangePassword
            colStart={"col-start-3"}
            colEnd={"col-end-7"}
            profiledata={profiledata}
            profileLoading={profileLoading}
            profileError={profileError}
          />
          <UserManagement
            isLoading={isLoading}
            allprofiledata={allprofiledata}
            colStart={"col-start-7"}
            colEnd={"col-end-11"}
          />
          <div className="row-start-11 row-end-12 col-start-8 col-end-12 flex gap-4 justify-center">
            <ButtonGroup
              textColor={"text-red-600"}
              HovertextColor={"hover:text-white"}
              toggle={false}
              color={"bg-white"}
              HoverColor={"hover:bg-red-600"}
              name={logoutLoading ? "Logging Out..." : "Logout"}
              onClick={handleLogout}
              icon={<TbLogout />}
              Hovershadow={"hover:shadow-danger_shadow"}
              shadow={"shadow-danger_shadow"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsAdmin;
