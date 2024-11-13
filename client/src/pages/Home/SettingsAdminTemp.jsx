import React from "react";
import UserManagement from "../../components/modals/UserManagement";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { useGetAllProfileQuery } from "../../store/api/clubAPI";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Toasts from "../../components/ui/Toasts";
import toast from "react-hot-toast";
import {
  useGetOperatorProfileQuery,
  useLogoutMutation,
} from "../../store/api/operatorAPI";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import Loader from "../../components/ui/loader";
const SettingsAdminTemp = () => {
  const navigate = useNavigate();
  const { data: allprofiledata, isLoading } = useGetAllProfileQuery();
  const [logout] = useLogoutMutation();
  const {
    data: profiledata,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();

  if (profileLoading) {
    return <Loader />;
  }

  if (!profiledata) {
    navigate("/login/club");
  }

  if (!profiledata?.data?.temporary || !profiledata?.data?.role === "admin") {
    navigate("/");
  }

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

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen">
        <div className="container mx-auto grid grid-rows-12 grid-cols-12 gap-4">
          <UserManagement
            allprofiledata={allprofiledata}
            colStart={"col-start-4"}
            colEnd={"col-end-10"}
          />
          <div className="row-start-10 row-end-11 col-start-8 col-end-10 flex gap-4 justify-center">
            <ButtonGroup
              textColor={"text-red-600"}
              HovertextColor={"hover:text-white"}
              toggle={false}
              color={"bg-white"}
              HoverColor={"hover:bg-red-600"}
              name={"Log Out"}
              onClick={handleLogout}
              Hovershadow={"hover:shadow-danger_shadow"}
              shadow={"shadow-danger_shadow"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsAdminTemp;
