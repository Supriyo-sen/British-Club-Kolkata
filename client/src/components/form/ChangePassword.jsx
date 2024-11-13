import React, { useState } from "react";
import Passwordbox from "../ui/Passwordbox";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { useChangePasswordMutation, useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Toasts from "../ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { useChangeAdminPasswordMutation } from "../../store/api/clubAPI";
import { LuLoader2 } from "react-icons/lu";
import Loader from "../ui/loader";

const ChangePassword = ({
  colStart,
  colEnd
}) => {
    const {
      data: profiledata,
      isLoading: profileLoading,
      isError: profileError,
    } = useGetOperatorProfileQuery();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [
    changeAdminPassword,
    { isLoading: AdminLoading, isSuccess: AdminSuccess },
  ] = useChangeAdminPasswordMutation();
  const [
    changePassword,
    { isError, isLoading, isSuccess },
  ] = useChangePasswordMutation();

  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         let data;
         if (profileLoading) return <Loader/>;
         if (profiledata.data.role === "admin") {
           data = await changeAdminPassword({
             oldPassword: oldPassword,
             newPassword: newPassword,
             confirmPassword: confirmPassword,
           }).unwrap();
         } else {
           data = await changePassword({
             oldPassword: oldPassword,
             newPassword: newPassword,
             confirmPassword: confirmPassword,
           }).unwrap();
         }
         if (AdminLoading || isLoading) return <Loader/>;
         if (data) {
           toast.custom(
             <>
               <Toasts
                 boldMessage={"Success!"}
                 message={"Password Changed Successfully"}
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
           navigate("/");
         }
    } catch (error) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={error.data.message || "Internal Server Error"}
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
  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div
        className={`row-start-2 row-end-9 ${colStart} ${colEnd} flex flex-col justify-center p-8 bg-white shadow-member_card rounded-3xl`}
      >
        <div className="flex justify-between items-center mb-6">
          <p className=" text-lg text-text_secondary font-semibold">
            Change Password
          </p>
          <p className="text-text_secondary text-xs underline cursor-pointer">
            Password Policy*
          </p>
        </div>

        <form className="" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="oldPassword"
              className="block text-text_primary mb-1 text-sm"
            >
              Old Password
            </label>
            <Passwordbox
              placeholder={"Password"}
              // value={oldPassword}
              id={"oldPassword"}
              onchange={handleOldPasswordChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="newPassword"
              className="block text-text_primary mb-1 text-sm"
            >
              New Password
            </label>
            <Passwordbox
              placeholder={"Password"}
              // value={newPassword}
              id={"newPassword"}
              onchange={handleNewPasswordChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-text_primary mb-1 text-sm"
            >
              Confirm Password
            </label>
            <Passwordbox
              placeholder={"Password"}
              // value={confirmPassword}
              id={"confirmPassword"}
              onchange={handleConfirmPasswordChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <ButtonGroup
              name={"Cancel"}
              textColor={"text-text_primary"}
              color={"bg-btn_secondary"}
              onClick={handleCancel}
            />
            <ButtonGroup
              name={
                isLoading || AdminLoading ? (
                  <>
                    <LuLoader2 className="animate-spin" size={20} />
                  </>
                ) : (
                  <>Confirm</>
                )
              }
              textColor={"text-text_secondary"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
