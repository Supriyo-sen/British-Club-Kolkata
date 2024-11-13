import React from "react";

const Roles = ({ data }) => {
  const lowerData = String(data).toLowerCase();
  let roleClass = "";
  let roleData = "";

  if (lowerData === "operator") {
    roleClass = "bg-primary text-text_primary";
    roleData = "Operator";
  } else if (lowerData === "auditor") {
    roleClass = "bg-secondary text-text_tertiaary";
     roleData = "Auditor";
  } else if (lowerData === "admin") {
    roleClass = "bg-tettiary text-text_quaternary";
     roleData = "Admin";
  }

  return (
    <>
      <div className={`p-1 ${roleClass} rounded-lg text-center`}>
        {roleData}
      </div>
    </>
  );
};

export default Roles;
