import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Get, Post, Post2 } from "../../Constants/apiMethods";
import {
  adminDetails,
  adminUpdateDetails,
  uploadFile,
} from "../../Constants/apiRoutes";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/Loader/index";
import UserDetails from "../UserManagement/UserDetails/UserDetails";

export default function AdminProfile(props) {
  const token = localStorage.getItem("access_token");
  const [profileValues, setProfileValues] = useState();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
  } = useForm();

  useEffect(() => {
    
    getAdminDetails();
  }, []);

  const handleApiError = (error) => {
    setLoading(false);
    toast.error(error.message);
  };

  const getAdminDetails = () => {
    setLoading(true);
   
    Get(adminDetails, token, "")
      .then((response) => response)
      .then((data) => {
        setLoading(false);

        setProfileValues(data.data);
      });
  };

  const onSubmit = (data) => {
    setLoading(true);

    let body = {
      name: profileValues.name,
      profile_photo: "abcde" ,
      phone_number: profileValues.phone_number,
    };

    Post(adminUpdateDetails, token, body)
      .then((res) => {
        setLoading(false);

        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        handleApiError(error)
      });
  };

  const getPicUrl = (data) => {
    setLoading(true);

    let formData = new FormData();
    const imagedata = data.target.files[0];
    formData.append("file", imagedata, imagedata.name);

    Post2(uploadFile, token, formData)
      .then((res) => {
        setLoading(false);

        document.getElementById("profile_photo").value = res.data.Key;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const handleName = (e) => {
    const data = profileValues;
    data.name = e.target.value;
    setProfileValues(data);
  };

  const handlePhone = (e) => {
    const data = profileValues;
    data.phone = e.target.value;
    setProfileValues(data);
  };

  return (
    <>
      <div className="mx-6 mt-5">
        <h1 className="text-xl mb-4 bg-emerald-300 py-2 px-4 rounded-lg">
          My Profile
        </h1>

        <form
          className="divide-y w-3/4 border border-gray-400 rounded-xl p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {loading && <LoadingSpinner />}

          <div className="text-center py-3">
            {profileValues?.profile_photo ? (
              <img
                src={profileValues?.profile_photo}
                alt="profile_photo"
                className="image ml-48"
              />
            ) : (
              ""
            )}
            <input
              className="mt-4"
              type="file"
              onChange={(event) => getPicUrl(event)}
              accept=".png ,.jpg, .jpeg, .webp"
            />
            <input type="text" className="hidden" id="profile_pic" />
          </div>

          <div className="flex items-center py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Name -
              </label>
            </div>
            <div className="w-2/3">
              <input
                defaultValue={profileValues?.name}
                onChange={handleName}
                placeholder="Name"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Email Address -
              </label>
            </div>
            <div className="w-2/3">
              <input
                pattern=' /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/'
                defaultValue={profileValues?.email}
                placeholder="Email Address"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                readOnly
              />
            </div>
          </div>

          <div className="flex items-center py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Phone Number -
              </label>
            </div>
            <div className="w-2/3">
              <input
                defaultValue={profileValues?.phone_number}
                onChange={handlePhone}
                placeholder="Phone Number"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center py-3">
            <div className="w-1/3"></div>
            <div className="w-2/3">
              <button
                type="submit"
                className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
