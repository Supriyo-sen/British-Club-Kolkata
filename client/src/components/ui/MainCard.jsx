import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MainCard = ({
  img,
  title,
  subtitle,
  position,
  background,
  shadow,
  posV,
  page,
  profiledata,
}) => {
  const navigate = useNavigate();

  const { data: { role } = {} } = profiledata || {};

  const handleNavigation = () => {
    if (title === "Settings") {
      if (role === "admin") {
        navigate("/settings/admin");
      } else if (role === "operator") {
        navigate("/settings");
      } else {
        navigate(page);
      }
    } else if (title === "Analytics" && role === "operator") {
      toast.error("This is only accessible by admins.");
      return;
    } else {
      navigate(page);
    }
  };

  const isProfileAdmin = title === "Profile" && role === "admin";
  const isAnalyticsOperator = title === "Analytics" && role === "operator";

  const divClasses = `card flex justify-center items-center rounded-3xl shadow-main_card
    ${
      isProfileAdmin || isAnalyticsOperator
        ? ""
        : `${shadow} duration-300 ${position} ${background}`
    } ${
    isProfileAdmin || isAnalyticsOperator
      ? "bg-gray-200 cursor-not-allowed"
      : "cursor-pointer"
  } ${posV} px-6 bg-white delay-75`;

  return (
    <>
      <div
        className={divClasses}
        onClick={(e) => {
          if (!isProfileAdmin && !isAnalyticsOperator) {
            handleNavigation();
          } else {
            e.preventDefault();
          }
        }}
      >
        <div className="img-card rounded-full">
          <img className="w-full aspect-auto" src={img} alt="icons" />
        </div>
        <div className="flex flex-col gap-1">
          <p
            className={`text-2xl font-medium font-roboto ${
              isProfileAdmin || isAnalyticsOperator ? "text-gray-300" : ""
            } card-title`}
          >
            {title}
          </p>
          <p
            className={`text-xs font-roboto font-normal ${
              isProfileAdmin || isAnalyticsOperator
                ? "text-gray-300"
                : "text-text_primary "
            } card-Subtitle`}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
};

export default MainCard;
