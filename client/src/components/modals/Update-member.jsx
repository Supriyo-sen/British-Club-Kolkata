import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import InputBox from "../ui/InputBox";
import ButtonGroup from "../ui/ButtonGroup";
import { CgProfile } from "react-icons/cg";
import { BsArrowUpSquareFill } from "react-icons/bs";
import {
  useUpdateMemberMutation,
  useAddMemberImageMutation,
  useGetMemberByIdQuery,
} from "../../store/api/memberAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toasts from "../ui/Toasts";
import { MdError } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";
import { formatDate } from "../../config/FormattedDate";

const UpdateMember = ({
  onModal,
  setOpen,
  memberId,
  expiryTime,
  timeStamp,
}) => {
  const { data: member, isLoading: isDataLoading } = useGetMemberByIdQuery({
    memberId,
  });
  const [openExtend, setOpenExtend] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [membershipFromDate, setMembershipFromDate] = useState("");
  const [expiryLimit, setExpiryLimit] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [organization, setOrganization] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [idError, setIdError] = useState("");

  const [imgLoading, setImgLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setFirstname(member.data.firstname);
      setLastname(member.data.lastname);
      setUsername(member.data.name);
      setEmail(member.data.email);
      setMobileNumber(member.data.mobileNumber);
      setAddress(member.data.address);
      setBloodGroup(member.data.bloodGroup);
      setOrganization(member.data.organization);
      setIdType(
        member.data?.idProof?.idType ? member.data.idProof.idType : "N/A"
      );
      setIdNumber(
        member.data?.idProof?.idNumber ? member.data.idProof.idNumber : "N/A"
      );
      setImageUrl(member.data.image.url);
      setMembershipFromDate(member.data.timeStamp);
      setExpiryDate(member.data.expiryTime);
    }
  }, [member]);

  useEffect(() => {
    if (expiryLimit) {
      const date = new Date(membershipFromDate);
      const newDate = date.setFullYear(date.getFullYear() + expiryLimit);
      setExpiryDate(new Date(newDate).toISOString());
    } else {
      setExpiryDate(expiryTime);
    }
  }, [expiryLimit]);

  const [updateMember] = useUpdateMemberMutation();

  const navigate = useNavigate();

  const validateId = () => {
    if (idType === "Aadhar Card") {
      const aadharPattern = /^\d{4}\s\d{4}\s\d{4}$/;
      if (!aadharPattern.test(idNumber)) {
        setIdError("Invalid Aadhar Number. Format: XXXX XXXX XXXX");
        return false;
      }
    } else if (idType === "Passport No") {
      const passportPattern = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/;
      if (!passportPattern.test(idNumber)) {
        setIdError("Invalid Passport Number");
        return false;
      }
    }
    setIdError("");
    return true;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validateId()) return;

    if (idType === "Choose") {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={"Please select an ID type"}
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
      setUpdateLoading(true);
      const data = await updateMember({
        memberId,
        firstName: firstname,
        lastname,
        username,
        email,
        mobileNumber,
        address,
        expiryDate,
        bloodGroup,
        organization,
        idType,
        idNumber,
        timeStamp: membershipFromDate,
      }).unwrap();

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
        setUpdateLoading(false);
        onModal();
        setOpen(false);
        navigate(0);
      }
    } catch (error) {
      setUpdateLoading(false);
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

  const onFileDrop = async (e) => {
    try {
      setImgLoading(true);
      const newFile = e.target.files[0];

      if (newFile) {
        const file = new FormData();
        file.append("image", newFile);
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/member/update-member-image/${memberId}`,
          file,
          {
            withCredentials: true,
          }
        );

        if (data) {
          setImageUrl(data.data.image);
          setPublicId(data.data.public_id);
          setImgLoading(false);
        }

        if (data.status === 400) {
          toast.custom(
            <>
              <Toasts
                boldMessage={"Error!"}
                message={data.message}
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
    } catch (error) {
      setImgLoading(false);
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

  {
    isDataLoading && <LuLoader2 />;
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-zinc-700/30 z-20 flex items-center justify-center">
        <form
          onSubmit={handlesubmit}
          className="w-full max-w-xl bg-btn_secondary rounded-lg text-blue-700 font-roboto text-xl mx-4 p-6 flex flex-col gap-4 overflow-auto max-h-[90vh]"
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-xl font-medium">Add Profile Picture</p>
            <div className="w-full h-32 border-4 border-dashed rounded-lg flex justify-center items-center cursor-pointer relative">
              {imageUrl ? (
                <img
                  src={imageUrl && imageUrl}
                  alt="profile"
                  className="w-30 h-30 object-cover rounded-full"
                />
              ) : (
                <CgProfile size={50} />
              )}

              <input
                type="file"
                name="image"
                className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                accept="image/*"
                onChange={onFileDrop}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              First Name
              <InputBox
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>
            <label className="flex flex-col font-medium">
              Last Name
              <InputBox
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              User Name
              <InputBox
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="flex flex-col font-medium">
              Blood Group
              <InputBox
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              Email
              <InputBox
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium relative">
              Membership Valid From
              <div className="flex items-center gap-1 bg-primary pr-2 rounded-t-lg">
                <div className="bg-primary outline-none w-full flex items-center h-6 py-5 px-4 rounded-lg text-sm text-text_primary">
                  <InputBox
                    type="date"
                    value={membershipFromDate.split("T")[0]}
                    onChange={(e) => setMembershipFromDate(e.target.value)}
                  />
                  <BsArrowUpSquareFill
                    size={30}
                    color="#1d4ed8"
                    onClick={() => setOpenExtend(!openExtend)}
                    className={`${!openExtend &&
                      "transform rotate-180"} ease-in-out duration-300 cursor-pointer`}
                  />
                </div>
              </div>
              {openExtend && (
                <div className="bg-primary outline-none rounded-b-lg font-semibol text-text_primary absolute top-17 right-0 w-30 border-t-2 border-btn_primary">
                  <ul className="flex flex-col items-center cursor-pointer">
                    {[0, 1, 2, 3, 4, 5, 20].map((year) => (
                      <li
                        key={year}
                        onClick={() => {
                          setExpiryLimit(year);
                          setOpenExtend(false);
                        }}
                        className="hover:bg-btn_secondary hover:text-btn_primary w-full py-1 px-4"
                      >
                        {year === 0
                          ? "Default"
                          : `${year} year${year > 1 ? "s" : ""}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </label>
            <label className="flex flex-col font-medium">
              Membership Valid Upto
              <div className="bg-primary outline-none flex items-center h-6 py-5 px-4 rounded-lg text-sm text-text_primary">
                {formatDate(expiryDate.split("T")[0])}
              </div>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-medium">
              Mobile Number
              <InputBox
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </label>
            <label className="flex flex-col font-medium">
              Organization Name
              <InputBox
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              National ID
              <div className="flex items-center">
                <select
                  name=""
                  id=""
                  className="bg-primary h-10 text-sm w-52 rounded-l-lg text-text_primary p-2 outline-none font-roboto font-medium"
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                >
                  <option value="Choose">Choose</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="Passport No">Passport No</option>
                  <option value="Others">Others</option>
                </select>
                <input
                  type="text"
                  id=""
                  value={idNumber}
                  placeholder="Aadhar No. / Passport No."
                  className="bg-primary text-sm font-roboto font-normal outline-none sm:w-full max-sm:w-4/5 h-6 py-5 px-4 rounded-r-lg text-text_primary"
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              {idError && (
                <p className="text-red-500 text-sm mt-1">{idError}</p>
              )}
            </label>
          </div>
          <div>
            <label className="flex flex-col font-medium">
              Address
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-primary rounded-lg p-3 text-text_primary font-normal text-sm font-roboto outline-none resize-none h-24"
              ></textarea>
            </label>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <ButtonGroup
              name={"Cancel"}
              color={"bg-[#F8FAFC]"}
              textColor={"text-[#6B7280]"}
              onClick={() => onModal()}
            />
            <ButtonGroup
              name={
                imgLoading || updateLoading ? (
                  <>
                    <LuLoader2 className="animate-spin" size={20} />
                  </>
                ) : (
                  <>Confirm</>
                )
              }
              color={"bg-blue-700"}
              textColor={"text-white"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default UpdateMember;
