// MemberPage.js
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/ui/loader";
import { useGetMemberByIdQuery } from "../../store/api/memberAPI";
import Logo from "../../assets/images/LOGO.png";

const MemberPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetMemberByIdQuery({
    memberId: id,
  });

  if (isLoading) return <Loader />;
  if (!data.data) return <h1>Member not found</h1>;

  return (
    <section className="background_3 flex justify-center items-center bg-cover bg-center">
      <div className="bg-[#D4D4D4]/10 w-full max-w-[400px] rounded-md border-white/50 border-[1px] m-9 relative backdrop-blur-lg">
        <img
          src={Logo}
          alt=""
          className="w-15 aspect-square top-0 left-0 absolute -translate-x-1/2 -translate-y-1/2"
        />
        <div className="p-4">
          <h3 className="text-2xl font-bold  text-white uppercase p-3 bg-[#71ABAB] rounded-md shadow-inner-sm text-center">
            Digital Member Card
          </h3>
          <div className="flex items-center justify-between mt-6 max-sm:flex-wrap max-sm:justify-center">
            <img
              src={data.data.image.url}
              alt=""
              className="w-32 aspect-square object-cover object-center rounded-full shadow-md"
            />
            <div className="sm:ps-6 max-sm:pt-4 w-full max-sm:text-center">
              <h3 className="capitalize text-3xl font-bold text-white">
                {data.data.firstname.toLowerCase()}{" "}
                {data.data.lastname.toLowerCase()}
              </h3>
              <p>@{data.data.name}</p>
            </div>
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-white to-white/50" />
        <div className="p-6 space-y-6">
          <div>
            <h4 className="!text-2xl text-white roboto">Email</h4>
            <p className="lato !text-sm">{data.data.email}</p>
          </div>
          <div>
            <h4 className="!text-2xl text-white roboto">Membership ID</h4>
            <p className="lato !text-sm">{data.data._id}</p>
          </div>
          <div>
            <h4 className="!text-2xl text-white roboto">Address</h4>
            <p className="lato !text-sm">{data.data.address}</p>
          </div>
          <div>
            <h4 className="!text-2xl text-white roboto">Membership Validity</h4>
            <p className="lato !text-sm">
              Expires on{" "}
              {new Date(data.data.expiryTime).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </p>
          </div>
          <div>
            <h4 className="!text-2xl text-white roboto">Wallet Amount</h4>
            <p className="lato !text-sm">
              {data.data.wallet && data.data.wallet.balance}
            </p>
          </div>
          <div>
            <h4 className="!text-2xl text-white roboto">Mobile Number</h4>
            <p className="lato !text-sm">
              {data.data.mobileNumber ? data.data.mobileNumber : "Not Provided"}
            </p>
          </div>
          <div>
            <h4 className="!text-2xl text-white roboto">Organization Name</h4>
            <p className="lato !text-sm">
              {data.data.organization ? data.data.organization : "Not Provided"}
            </p>
          </div>
          <div>
            <h4 className="!text-2xl text-white roboto">Blood Group</h4>
            <p className="lato !text-sm">
              {data.data.bloodGroup ? data.data.bloodGroup : "Not Provided"}
            </p>
          </div>
          <div>
            <h4 className="!text-2xl text-white roboto">
              National ID (
              {data.data.idProof
                ? data.data.idProof && data.data.idProof.idType
                : "Not Provided"}
              )
            </h4>
            <p className="lato !text-sm">
              {data.data.idProof
                ? data.data.idProof && data.data.idProof.idNumber
                : "Not Provided"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberPage;
