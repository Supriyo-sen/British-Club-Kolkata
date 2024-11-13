import React, { useEffect, useState } from "react";
import MainCard from "../../components/ui/MainCard";
import { cardData } from "../../constants";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/LOGO.png";
import Loader from "../../components/ui/loader";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const { data: profiledata, isLoading } = useGetOperatorProfileQuery();

  useEffect(() => {
    if (profiledata && profiledata.data.profileImage) {
      setImageUrl(profiledata.data.profileImage.url);
    }
  }, [profiledata]);

  if (isLoading) {
    return <Loader />;
  }

  if (!profiledata) {
    navigate("/login/club");
  }

  return (
    <div className="background h-screen bg-cover bg-center">
      <div className="container mx-auto grid grid-rows-12 grid-cols-12 gap-2">
        <div className="row-start-1 row-end-2 mt-6 col-start-2 col-end-13 flex justify-end items-center">
          <img
            src={logo}
            alt="logo"
            className="absolute top-6 left-24 h-24 aspect-square object-cover object-center"
          />
          <div className="flex gap-4 items-center justify-center mx-2">
            <div className="flex flex-col items-end">
              <h4 className="text-xl font-roboto capitalize">
                {profiledata && profiledata.data && profiledata.data.username}
              </h4>
              <h6 className="text-text_primary capitalize">
                {profiledata && profiledata.data && profiledata.data.role}
              </h6>
            </div>
            {profiledata &&
            profiledata.data &&
            profiledata.data.role === "operator" ? (
              <Link to={"/profile"}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="profile"
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <CgProfile size={60} color="#6B7280" />
                )}
              </Link>
            ) : (
              <>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="profile"
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <CgProfile size={60} color="#6B7280" />
                )}
              </>
            )}
          </div>
        </div>
        <div className="row-start-2 pt-6 row-end-5 col-start-2 col-end-12 flex justify-center gap-6 mb-4">
          {cardData.map((items, index) => {
            if (index < 3)
              return (
                <MainCard
                  img={items.img}
                  title={items.title}
                  subtitle={items.subtitle}
                  shadow={items.shadow}
                  background={items.background}
                  page={items.page}
                  profiledata={profiledata}
                  key={index}
                />
              );
          })}
        </div>
        <div className="row-start-5 row-end-11  col-start-2 col-end-12 flex justify-center gap-6">
          {cardData.map((items, index) => {
            if (index >= 3)
              return (
                <MainCard
                  img={items.img}
                  title={items.title}
                  subtitle={items.subtitle}
                  shadow={items.shadow}
                  background={items.background}
                  page={items.page}
                  profiledata={profiledata}
                  key={index}
                />
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
