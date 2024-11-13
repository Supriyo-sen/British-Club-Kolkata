import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  MdError,
  MdOutlineFileUpload,
  MdOutlineUploadFile,
} from "react-icons/md";
import PropTypes from "prop-types";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { useAddMemberImageMutation } from "../../store/api/memberAPI";
import Toasts from "../ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const FileUpload = (props) => {
  const wrapperRef = useRef(null);
  const [file, setFile] = useState(null);
  const [addMemberImage, { isSuccess }] = useAddMemberImageMutation();
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
    }
  };

  const fileRemove = () => {
    setFile(null);
  };
  const handleImageSubmit = async (e) => {
    if (props.user === "member" && props.type === "register") {
      try {
        const data = await addMemberImage({
          file: file,
        }).unwrap();
        props.setImage(data);

        if (isSuccess) {
          toast.custom(
            <>
              <Toasts
                boldMessage={"Success!"}
                message={"Image added successfully"}
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
          props.onModal();
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
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] z-20">
        <div className="w-[712px] h-[504px] border bg-[#E2E8F0] px-9 py-6 rounded-lg flex flex-col items-center gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          {/* Heading section starts here */}
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-2 items-center text-text_primary">
              <h4 className="text-xl">Uploads Files</h4>
              <h6 className="text-sm">Max file size: 1 MB</h6>
            </div>
            <IoMdClose
              size={40}
              color="#6B7280"
              onClick={() => props.onModal()}
              className="cursor-pointer delay-75"
            />
          </div>
          {/* Heading section ends here */}

          {/* Drag and drop starts here */}
          <div
            className="w-[470px] h-[242px] border-2 border-dashed border-black bg-white rounded-lg relative flex flex-col justify-center items-center gap-2 hover:opacity-60"
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <MdOutlineFileUpload size={100} color="#6B7280" />
            <p className="text-text_primary roboto text-base font-medium">
              Click or Drag and Drop your files here
            </p>
            <input
              type="file"
              name="file"
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
              value=""
              onChange={onFileDrop}
            />
          </div>
          {/* Drag and drop starts here */}

          {/* File preview starts */}
          {file && (
            <div className="w-[635px] h-[71px] bg-[#D1D5DB] py-2 px-4 flex items-center justify-between gap-4 rounded-xl">
              <div className="flex gap-4 justify-center items-center">
                <MdOutlineUploadFile size={42} color="#6B7280" />
                <div className="flex flex-col gap-1 ">
                  <p className="roboto text-base text-text_primary">
                    {file.name}
                  </p>
                  <p className="roboto text-base text-text_primary">
                    Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="cursor-pointer" onClick={() => fileRemove(file)}>
                <IoMdClose size={30} color="#6B7280" />
              </div>
            </div>
          )}
          {/* File preview ends */}

          <div className="flex justify-end items-center gap-16 absolute bottom-6 right-9">
            <ButtonGroup
              name={"Cancel"}
              color={"bg-[#F8FAFC]"}
              textColor={"text-[#6B7280]"}
              onClick={() => props.onModal()}
            />
            <ButtonGroup
              name={"Submit"}
              color={"bg-blue-700"}
              textColor={"text-white"}
              onClick={handleImageSubmit}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

FileUpload.propTypes = {
  onModal: PropTypes.func,
};

export default FileUpload;
