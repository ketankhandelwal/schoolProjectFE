import React, { useState, useEffect } from "react";
import dummyUser from "../../../assets/Icons/dummyUser.svg";
import { Get } from "../../../Constants/apiMethods";
import editIcon from "../../../assets/Icons/editIcon.svg";
import {
  getStaffDetails,
  staffLeavesDetails,
} from "../../../Constants/apiRoutes";
import { useLocation, useNavigate } from "react-router";
import moment from "moment";
import LoadingSpinner from "../../../Components/Loader/index";
import Table from "../../../Components/Table/Table";

export default function StaffDetails() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [engagementsDetails, setEngagementsDetails] = useState([]);
  const [totalActions, setTotalActions] = useState(0);
  const location = useLocation();
  const id = location.search.replace("?id=", "");
  const [userDetail, setUser] = useState();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    getStaffDetail();
    // getStaffLeaves();
  }, []);

  let getStaffDetail = async () => {
    setLoading(true);

    const payload = `/${id}`;

    Get(getStaffDetails, token, payload)
      .then((response) => response)
      .then((data) => {
        setUser(data.data);
        setLoading(false);
      });
  };

  let getStaffLeaves = async () => {
    const payload = `/${id}`;
    Get(staffLeavesDetails, token, payload)
      .then((response) => response)
      .then((data) => {
        setEngagementsDetails(data?.data?.response);
        setTotalActions(data.data.totalActions);
        setLoading(false);
      });
  };





  const field = [
    "Month",
    "Regular Fees",
    "Exam Fees",
    "Late Fees",
    "Admission & Dress Fees",
    "Instalment Fees",
    "Transport Fees",
  ];

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="mx-6 mt-2">
        <h1 className="text-2xl">Staff Management &gt; {userDetail?.name}</h1>
      </div>
      <div className="mx-6">
        <div className="flex flex-row justify-end my-4 ">
          <img
            title="Edit Student"
            className="rounded-md mr-3 bg-slate-200 hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            src={editIcon}
            onClick={() =>
              navigate("EditStaff", {
                state: { id: userDetail?.id },
              })
            }
          />
          <button
            onClick={() => navigate("/staffManagement")}
            className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Back
          </button>
        </div>

        <h1 className="text-xl mb-4 bg-emerald-300 py-2 px-4 rounded-lg">
        Staff Details
        </h1>
        <div className="flex border border-gray-400 rounded-xl p-4">
          <div className="w-3/4">
            <div className="divide-y">
              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Full Name -
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.name}</span>
                </div>
              </div>
              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Role -
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.role == 1 ?  "Admin"
                          : userDetail?.role == 2
                          ? "Sub Admin"
                          : userDetail?.role == 3
                          ? "Teacher"
                          : userDetail?.role == 4
                          ? "Transport"
                          : userDetail?.role == 5
                          ? "Cleaner"
                          : userDetail?.role == 6
                          ? "Gate Keeper"
                          : ""} 
                  </span>
                </div>
              </div>
              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Email-
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.email}</span>
                </div>
              </div>
              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Phone Number -
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.phone_number}</span>
                </div>
              </div>
              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Address-
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.address}</span>
                </div>
              </div>
           
              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Salary
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.salary}</span>
                </div>
              </div>
              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Years of Experience
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.YOE}</span>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Subject Speciality
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.subject_speciality}</span>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Latest Qualification
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.last_qualification}</span>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Previous Organization-
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.previous_organization}</span>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Gender -
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.gender == 1
                      ? "Male"
                      : userDetail?.gender == 2
                      ? "Female"
                      : userDetail?.gender == 3
                      ? "Prefer not to say"
                      : ""}
                  </span>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Status -
                  </label>
                </div>
                <div className="w-2/4">
                  <span>{userDetail?.status == 1 ? "Active" : "Inactive"}</span>
                </div>
              </div>
              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Joined On -
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.created_at != null
                      ? moment(userDetail?.created_at).format("DD-MM-YYYY")
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 ml-2">
            <img
              className="w-full"
              src={
                userDetail?.profile_photo != ""
                  ? userDetail?.profile_photo
                  : dummyUser
              }
            />
          </div>
        </div>

        <br />
       
      </div>
    </>
  );
}
