import React, { useEffect, useState } from "react";
import SearchBox from "../../components/ui/SearchBox";
import AddButton from "../../components/ui/AddButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddMember from "../../components/modals/Add-member";
import MemberCard from "../../components/ui/MemberCard";
import { useGetAllMembersQuery } from "../../store/api/memberAPI";
import ReactPaginate from "react-paginate";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import { LuLoader2 } from "react-icons/lu";

import { SiMicrosoftexcel } from "react-icons/si";
import Toasts from "../../components/ui/Toasts";
import { MdError } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const Member = () => {
  const navigate = useNavigate();
  const [open, SetOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageValue, setPageValue] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading: memberLoading } = useGetAllMembersQuery({
    page: page === 0 ? 1 : page,
    limit: 12,
    search: search,
  });

  const { data: profiledata, isLoading } = useGetOperatorProfileQuery();

  useEffect(() => {
    if (profiledata) {
      if (!profiledata.data) {
        navigate("/login/operator");
      }
    }
  }, [profiledata]);

  useEffect(() => {
    if (search === "") {
      setPage(pageValue);
      return;
    }
    setPage(1);
  }, [search]);

  if (isLoading) {
    return <LuLoader2 />;
  }

  if (memberLoading) return <LuLoader2 />;

  const pageCount = Math.ceil(data?.totalMembers / 12);

  const handlePageChange = (event) => {
    const selectedPage = event.selected;
    setPage(selectedPage + 1);
    setPageValue(selectedPage + 1);
  };

  const handleExcel = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/member/send-member-excel`,
      {
        withCredentials: true,
        responseType: "blob",
      }
    );

    if (response.data) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "members.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      toast.custom(
        <Toasts
          boldMessage={"Success!"}
          message={"Excel file sent successfully."}
          icon={
            <IoCheckmarkDoneCircleOutline
              className="text-green-600"
              size={32}
            />
          }
        />,
        {
          position: "top-center",
          duration: 2000,
        }
      );
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.custom(
        <Toasts
          boldMessage={"Error!"}
          message={error.response.data.message}
          icon={<MdError className="text-red-600" size={32} />}
        />,
        {
          position: "top-center",
          duration: 2000,
        }
      );
    } else {
      toast.custom(
        <Toasts
          boldMessage={"Error!"}
          message={"An unexpected error occurred. Please try again later."}
          icon={<MdError className="text-red-600" size={32} />}
        />,
        {
          position: "top-center",
          duration: 2000,
        }
      );
    }
  }
};
  
  return (
    <>
      <div className="background bg-cover bg-center !overflow-y-auto">
        <div className="container xl:max-w-7xl max-w-6xl h-screen grid grid-rows-12 grid-cols-12 gap-4 mx-auto">
         <div className="row-start-2 row-end-3 col-start-2 xl:col-end-9 col-end-10 items-center">
            <SearchBox
              placeholder={
                "Search by Membership ID, Name, Email, Phone number......"
              }
              type={"text"}
              onchange={(e) =>
                setTimeout(() => {
                  setSearch(e.target.value);
                }, 1000)
              }
            />
          </div>
          <div
            className="row-start-2 row-end-3 xl:col-start-9 col-start-10 xl:col-end-11 col-end-12 items-center "
            onClick={() => SetOpen(true)}
          >
            <AddButton
              name={"Add Member"}
              icon={<IoMdAddCircleOutline size={22} />}
            />
          </div>
          <div
            className="row-start-2 row-end-3 xl:col-start-11 col-start-12 xl:col-end-12 col-end-13 items-center "
            onClick={handleExcel}
          >
            <AddButton icon={<SiMicrosoftexcel size={22} />} />
          </div>
          <div className="row-start-3 row-end-11 col-start-2 xl:col-end-12 col-end-13 items-center">
            <div className="grid grid-cols-12 gap-4 ">
              {data && data.data && data.data.length > 0 ? (
                data.data.map((item, index) => {
                  return <MemberCard item={item} index={index} key={index} />;
                })
              ) : (
                <div className="col-span-12 mt-6 min-h-[80vh]">
                  <h1 className="text-center text-3xl font-bold text-text_primary tracking-normal">
                    No Member Found
                  </h1>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end mt-3">
              <div className="flex gap-2">
                <ReactPaginate
                  pageCount={pageCount}
                  setPostsPerPage={12}
                  onPageChange={handlePageChange}
                  nextLabel={<GrNext />}
                  previousLabel={<GrPrevious />}
                  breakLabel={"..."}
                  marginPagesDisplayed={2}
                  className="flex justify-center items-center gap-2 font-roboto text-lg text-btn_primary p-2"
                  pageClassName="px-2 border-2 border-btn_primary rounded-md hover:bg-btn_primary hover:text-white"
                  activeClassName="bg-btn_primary text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && <AddMember onModal={() => SetOpen(false)} />}
    </>
  );
};

export default Member;
