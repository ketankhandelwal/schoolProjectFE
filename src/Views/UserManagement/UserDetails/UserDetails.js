import React, { useState, useEffect } from "react";
// import Widgets from '../../../Components/Widget/Widgets';
import dummyUser from "../../../assets/Icons/dummyUser.svg";
import { Get } from "../../../Constants/apiMethods";
import editIcon from "../../../assets/Icons/editIcon.svg";
import {
  getUserDetails,
  studentTotalFeesDetails,
} from "../../../Constants/apiRoutes";
import { useLocation, useNavigate } from "react-router";
import moment from "moment";
import LoadingSpinner from "../../../Components/Loader/index";
import Table from "../../../Components/Table/Table";

export default function UserDetails() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [engagementsDetails, setEngagementsDetails] = useState([]);
  const [totalActions, setTotalActions] = useState(0);
  const location = useLocation();
  const id = location.search.replace("?id=", "");
  const [userDetail, setUser] = useState();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    getUserDetail();
    getStudentFees();
  }, []);

  let getUserDetail = async () => {
    setLoading(true);

    const payload = `/${id}`;

    Get(getUserDetails, token, payload)
      .then((response) => response)
      .then((data) => {
        setUser(data.data);
        setLoading(false);
      });
  };

  let getStudentFees = async () => {
    const payload = `/${id}`;
    Get(studentTotalFeesDetails, token, payload)
      .then((response) => response)
      .then((data) => {
        setEngagementsDetails(data?.data?.response);
        setTotalActions(data.data.totalActions);
        setLoading(false);
      });
  };

  // const getUserDetail = () => {
  //   setLoading(true);

  //   const payload = `/${id}`;

  //   Get(getUserDetails, token, payload)
  //     .then((response) => response)
  //     .then((data) => {

  //       setUser(data.data);
  //       setLoading(false);
  //     });
  // };

  // const getStudentFees = () => {
  //   setLoading(true);
  //   const payload = `/${id}`;
  //   Get(studentTotalFeesDetails, token, payload)
  //     .then((response) => response)
  //     .then((data) => {

  //       setEngagementsDetails( data?.data?.response);
  //       setTotalActions( data.data.totalActions);
  //       setLoading(false);

  //     });
  // };

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
        <h1 className="text-2xl">Student Management &gt; {userDetail?.name}</h1>
      </div>
      <div className="mx-6">
        <div className="flex flex-row justify-end my-4 ">
          <img
            title="Edit Student"
            className="rounded-md mr-3 bg-slate-200 hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            src={editIcon}
            onClick={() =>
              navigate("EditUser", {
                state: { id: userDetail?.id },
              })
            }
          />
          <button
            onClick={() => navigate("/userManagement")}
            className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Back
          </button>
        </div>

        <h1 className="text-xl mb-4 bg-emerald-300 py-2 px-4 rounded-lg">
          Student Details
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
                    Class -
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.class_id == 1 ? "Kinder Gardern" : userDetail?.class_id == 2
                          ? "L.K.G"
                          : userDetail?.class_id == 3
                          ? "U.K.G"
                          : userDetail?.class_id == 4
                          ? "I"
                          : userDetail?.class_id == 5
                          ? "II"
                          : userDetail?.class_id == 6
                          ? "III"
                          : userDetail?.class_id == 7
                          ? "IV"
                          : userDetail?.class_id == 8
                          ? "V"
                          : userDetail?.class_id == 9
                          ? "VI"
                          : userDetail?.class_id == 10
                          ? "VII"
                          : userDetail?.class_id == 11
                          ? "VIII"
                          : userDetail?.class_id == 12
                          ? "IX"
                          : userDetail?.class_id == 13
                          ? "X"
                          : userDetail?.class_id == 14
                          ? "XI"
                          : userDetail?.class_id == 15
                          ? "XII"
                          : ""} 
                  </span>
                </div>
              </div>


              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Section -
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.sec != ""
                      ? userDetail?.sec
                      : "-"}
                  </span>
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
                    Date of Birth -
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.date_of_birth != null
                      ? moment(userDetail.date_of_birth).format("DD-MM-YYYY")
                      : "-"}
                  </span>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Phone Number
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.phone_number ? userDetail?.phone_number : "-"}
                  </span>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Address
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.address ? userDetail?.address : "-"}
                  </span>
                </div>
              </div>


              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Mother Name
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.mother_name ? userDetail?.mother_name: "-"}
                  </span>
                </div>
              </div>


              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Father Name
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.father_name? userDetail?.father_name : "-"}
                  </span>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Emergency Contact Number
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.emergency_phone_number ? userDetail?.emergency_phone_number: "-"}
                  </span>
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Allergy
                  </label>
                </div>
                <div className="w-2/4">
                  <span>
                    {userDetail?.allergy ? userDetail?.allergy : "-"}
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
                  ? userDetail?.profile_pic
                  : dummyUser
              }
            />
          </div>
        </div>

        <br />
        <h1 className="text-xl mb-4 bg-emerald-300 py-2 px-4 rounded-lg">
          Student Fees Details - {totalActions} Amonut
        </h1>
        <div class="flex-auto">
          <Table
            headerData={field}
            scopedSlots={
              engagementsDetails &&
              engagementsDetails.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                      {item.CategoryName}
                    </td>
                    <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                      {item.regularFees}
                    </td>
                    <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                      {item.examFees}
                    </td>
                    <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                      {item.lateFees}
                    </td>
                    <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                      {item.admissionAndDressFees}
                    </td>
                    <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                      {item.instalmentFees}
                    </td>
                    <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                      {item.TransportFees}
                    </td>
                  </tr>
                );
              })
            }
          />
        </div>
        <br />
      </div>
    </>
  );
}
