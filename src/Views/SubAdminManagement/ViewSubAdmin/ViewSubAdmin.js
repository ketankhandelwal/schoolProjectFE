import React, { useState, useEffect } from "react";
import { Get } from "../../../Constants/apiMethods";
import { getSubAdminDetail } from "../../../Constants/apiRoutes";
import { getPermissionsWithStatus } from "../../../Constants/helper";
import { useLocation, useNavigate } from "react-router";
import editIcon from "../../../assets/Icons/editIcon.svg";
import moment from "moment";
import LoadingSpinner from "../../../Components/Loader/index";
import dummyUser from "../../../assets/Icons/dummyUser.svg";
import { useSelector } from "react-redux";

export default function ViewSubAdmin() {
  const permissionList = useSelector((state) => state.auth.permissionList);
  const navigate = useNavigate();
  const location = useLocation();
  const [subAdminDetails, setSubadminData] = useState();
  const token = localStorage.getItem("access_token");
  const [permissionDetails, setPermissionDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = location.search.replace("?id=", "");

  useEffect(() => {
    getSubAdminDetails();
  }, []);

  const getSubAdminDetails = () => {
    const payload = `?id=${id}`;
    setLoading(true);
    Get(`${getSubAdminDetail}/${payload}`, token)
      .then((response) => response)
      .then((data) => {
        setLoading(false);
       
        setSubadminData(data.data);
  
        const permissionData = getPermissionsWithStatus(
          data?.data?.permissions,
          permissionList
        );
        setPermissionDetails(permissionData);
      });
  };

  
  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="mx-6 mt-2">
        <h1 className="text-2xl">Sub-Admin Management</h1>
      </div>
      <div className="mx-6">
        <div className="flex flex-row justify-end my-4">
          <img
            title="Edit Student"
            className="rounded-md mr-3 bg-slate-200 hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            src={editIcon}
            onClick={() => navigate("EditSubAdmin", {state:{id:subAdminDetails.id}})}
          />

          <button
            onClick={() => navigate("/sd")}
            className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Back
          </button>
        </div>
        <div className="flex border border-gray-400 rounded-xl p-4 ">
          <div className="w-3/4">
            <div className="flex items-center py-3">
              <div className="w-1/3">
                <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                  Full Name -
                </label>
              </div>
              <div className="w-2/3">
                <p>{subAdminDetails?.name}</p>
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="w-1/3">
                <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                  Email Address -
                </label>
              </div>
              <div className="w-2/3">
                <p>{subAdminDetails?.email}</p>
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="w-1/3">
                <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                  Phone Number -
                </label>
              </div>
              <div className="w-2/3">
                <p>{subAdminDetails?.phone_number}</p>
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="w-1/3">
                <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                  Designation -
                </label>
              </div>
              <div className="w-2/3">
                <p>{subAdminDetails?.designation}</p>
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="w-1/3">
                <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                  Status -
                </label>
              </div>
              <div className="w-2/3">
                <p>{subAdminDetails?.status === 1 ? "Active" : "Not Active"}</p>
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="w-1/3">
                <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                  Added On -
                </label>
              </div>
              <div className="w-2/3">
                <p>
                  {moment(subAdminDetails?.created_at).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
            <div className="flex py-3">
              <div className="w-1/3">
                <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                  Permissions -
                </label>
              </div>
              <div className="w-2/3">
                {permissionDetails?.map((item, index) => {
                  return item.status === 1 && <p>{item.name}</p>;
                })}
              </div>
            </div>
          </div>
          <div className="w-1/4 ml-2">
            <img
              className="w-full rounded-full"
              src={subAdminDetails?.profile_photo || dummyUser}
            />
          </div>
        </div>
      </div>
    </>
  );
}
