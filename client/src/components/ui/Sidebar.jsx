import React, { useState } from "react";
import arrow from "../../assets/icons/sidebar_arrow.png";
import { sidebarItem1 } from "../../constants";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ value }) => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const [item, setItem] = useState("items-center");
  const [margin, setMargin] = useState("");
  const [title, setTitle] = useState("");
  const [toggle, setToggle] = useState(true);
  const [rotate, setRotate] = useState("-rotate-180");

  const handleClick = () => {
    setSidebar(!sidebar);
    setRotate(rotate === "-rotate-180" ? "-rotate-0" : "-rotate-180");
    setItem(item === "items-center" ? "items-start" : "items-center");
    setMargin(margin === "" ? "mx-16" : "");
    setToggle(!toggle);
  };

  return (
    <>
      {sidebar && (
        <div
          className="h-screen w-screen fixed top-0 right-0 left-0 bottom-0 z-10  bg-slate-400/25"
          onClick={() => {
            handleClick();
          }}
        ></div>
      )}
      <div
        className={`row-start-1 row-end-13 fixed bottom-0 top-0 col-start-1 bg-primary rounded-r-3xl grid grid-rows-12 z-10 transition-all duration-300 ease-in overflow-hidden ${
          sidebar ? "w-60" : "w-28"
        } shadow-sidebar_shadow`}
      >
        <div
          className={`row-start-4 row-end-9 flex flex-col ${margin}  ${item}  gap-11`}
        >
          {sidebarItem1.map((item, index) => {
            return (
              <div
                className="flex gap-4 items-center cursor-pointer"
                id={index}
                onClick={() => {
                  setTitle(item.title);
                  handleClick();
                  navigate(item.page);
                }}
                key={index}
              >
                <img
                  className="cursor-pointer"
                  src={item.title === title ? item.iconBold : item.icon}
                  alt="icons"
                />
                {!toggle && (
                  <p
                    className={`text-xl roboto ${
                      item.title === title
                        ? "text-black font-semibold"
                        : "text-text_primary"
                    } `}
                  >
                    {item.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="row-start-11 row-end-12 rounded-full flex items-center justify-center ">
          <img
            onClick={() => {
              handleClick();
            }}
            src={arrow}
            alt="sidebar_arrow"
            className={`${rotate} w-10 cursor-pointer `}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
