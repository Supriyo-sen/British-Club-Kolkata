import React, { useState } from "react";
import ButtonGroup from "../ui/ButtonGroup";
import toast from "react-hot-toast";
import Toasts from "../ui/Toasts";
import { MdError } from "react-icons/md";
import { useRemoveClubMutation } from "../../store/api/operatorAPI";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ deleteMode, setDeleteMode, deleteId }) => {
  const [removeClub] = useRemoveClubMutation();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  if (!deleteMode) return null;
  const handleDelete = async () => {
    try {
      setLoading(true);
      if (!password) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Error!"}
              message={"Password is required"}
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
      const data = await removeClub({ clubId:deleteId, password }).unwrap();

      if (data) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Success!"}
              message={"Delete Successfully"}
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
        setDeleteMode(false);
        navigate(0);
      }
    } catch (error) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={error.data.message || "Something went wrong"}
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
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-20 flex justify-center items-center">
      <div className="min-h-60 max-w-screen-sm w-full bg-white rounded-xl shadow-md p-6 text-center flex flex-col">
        <h3 className="!text-3xl inter font-bold tracking-tighter text-text_red">
          Are you sure?
        </h3>
        <div className="mt-4 flex-1 text-slate-600 font-semibold">
          <p>You want to delete this operator ?</p>
          <p>This action cannot be undone.</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-96 bg-slate-200 px-4 py-2 rounded-md outline-none mt-2"
            placeholder="Enter your password to confirm"
          />
        </div>
        <div className="flex justify-center gap-3 mt-6">
          <ButtonGroup
            name={"Cancel"}
            onClick={() => setDeleteMode(false)}
            disabled={loading}
          />
          <ButtonGroup
            name={"Confirm"}
            color={"bg-blue-600 text-white"}
            onClick={handleDelete}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
