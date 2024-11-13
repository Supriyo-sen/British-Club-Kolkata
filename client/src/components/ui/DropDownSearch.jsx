import React from "react";
import { useGetAllMembersQuery } from "../../store/api/memberAPI";
import { CgProfile } from "react-icons/cg";

const DropDownSearch = ({ handleSearch, memberSearch, setMemberSearch }) => {
  const {
    data: allMembers,
    isLoading: memberLoading,
    refetch,
  } = useGetAllMembersQuery({
    search: memberSearch,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setMemberSearch(value);
    if (value) {
      setTimeout(() => refetch(), 1000);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Membership ID, Name, Phone Number, Email"
        className="bg-gray-200 w-full h-12 rounded-lg px-6 py-4 text-text_primary outline-none relative"
        onChange={handleChange}
      />
      {memberSearch.length > 0 &&
        (memberLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : allMembers && allMembers.data.length === 0 ? (
          <div className="absolute bg-gray-200 mt-2 rounded-md w-full max-w-60 max-h-40 overflow-auto z-10 shadow-md">
            <p className="flex justify-center items-center py-2 px-4 ">
              No Member Found
            </p>
          </div>
        ) : (
          <div className="absolute bg-gray-200 mt-2 rounded-md w-full max-w-60 max-h-40 overflow-auto z-10 shadow-md">
            {allMembers.data.map((member) => (
              <div
                key={member.id}
                onClick={() => handleSearch(member)}
                className={`flex justify-between items-center py-2 px-4  hover:bg-gray-300 cursor-pointer ${allMembers
                  .data.length > 1 && "border-b border-white"}`}
              >
                {member.image.url ? (
                  <img
                    src={member.image.url}
                    className="w-6 aspect-square object-cover object-center rounded-full"
                    alt=""
                  />
                ) : (
                  <CgProfile
                    className="w-6 h-6 object-cover object-center rounded-full"
                    color="#6B7280"
                  />
                )}
                <p className="lato !text-sm uppercase">
                  {member.name.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default DropDownSearch;
