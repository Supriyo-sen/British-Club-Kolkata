import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlinePeopleAlt } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { SiGoogleanalytics } from "react-icons/si";
import { LuTicket } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import Loader from "../ui/loader";

const Sidebar = () => {
  const { data: profiledata, isLoading } = useGetOperatorProfileQuery();
  const [open, setOpen] = useState(false);
  const [activeName, setActiveName] = useState("");
  const role = profiledata?.data?.role;

  const menus = [
    {
      names: "Dashboard",
      link: "/",
      icon: MdOutlineDashboard,
    },
    {
      names: "Member",
      link: "/member",
      icon: MdOutlinePeopleAlt,
    },
    { names: "Coupon", link: "/coupon", icon: LuTicket },
    {
      names: "Analytics",
      link: "/analytics",
      icon: SiGoogleanalytics,
      disabled: role === "operator",
    },
    {
      names: "Profile",
      link: "/profile",
      icon: RxAvatar,
      disabled: role === "admin",
    },
    {
      names: "Settings",
      link: role === "admin" ? "/settings/admin" : "/settings",
      icon: IoIosSettings,
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  const activeMenu = (name) => {
    setActiveName(name);
  };

  return (
    <div
      className={`bg-primary min-h-screen 
      ${
        open ? "w-72" : "w-20"
      } duration-500 text-black px-4 fixed bottom-0 top-0 z-10 flex flex-col justify-center ${
        open ? "items-center" : ""
      } shadow-sidebar_shadow rounded-r-3xl`}
    >
      <div className="flex flex-1 justify-center flex-col gap-4 relative">
        {menus.map((menu, i) => {
          const isDisabled = menu.disabled;
          return (
            <Link
              to={isDisabled ? "#" : menu.link}
              key={i}
              onClick={() => {
                if (!isDisabled) {
                  activeMenu(menu.names);
                }
              }}
              className={`${menu.margin &&
                "mt-5"} group flex items-center text-xl roboto gap-4 font-medium p-2 ${
                isDisabled ? "cursor-not-allowed" : ""
              }`}
            >
              <div
                className={`${
                  activeName === menu.names
                    ? "text-black font-semibold"
                    : "text-text_primary"
                }`}
              >
                {React.createElement(menu.icon, {
                  size: "24",
                })}
              </div>

              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open &&
                  "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                <div
                  className={`${
                    activeName === menu.names
                      ? "text-black font-semibold"
                      : "text-text_primary"
                  }`}
                >
                  {menu.names}
                </div>
              </h2>
              <h2
                className={`${open &&
                  "hidden"} fixed left-48 bg-white font-semibold whitespace-pre text-sm text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {isDisabled ? "Disabled" : menu.names}
              </h2>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center py-7">
        {open ? (
          <div className="flex border border-gray-500 items-center justify-center rounded-full p-2">
            <FaArrowLeft
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
        ) : (
          <div className="flex border border-gray-500 items-center justify-center rounded-full p-2">
            <FaArrowRight
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
