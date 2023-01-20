import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import {
  fileSignatureAddForPublic,
  getStaffDetails,
  updateStaffDetails,
} from "../../../Constants/apiRoutes";
import { uploadFile, company } from "../../../Constants/apiRoutes";
import { Get, Post, Post2 } from "../../../Constants/apiMethods";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingSpinner from "../../../Components/Loader/index";
import dummyUser from "../../../assets/Icons/dummyUser.svg";
import cameraIcon from "../../../assets/Icons/camera.svg";

export default function EditStaff(props) {
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(false);
  const [companyList, setCompanys] = useState();
  const [addNewCompany, setAddNewCompany] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [staffDetail, setStaff] = useState();
  const [picUrl, setPicUrl] = useState(dummyUser);
  const [picKey, setPicKey] = useState("");
  const [updateProfile, setUpdatePic] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getStaffDetail();
  }, []);

  const getCompanys = () => {
    // setLoading(true);
    // Post(company, token, "")
    //   .then((response) => response)
    //   .then((data) => {
    //     setLoading(false);
    //     setCompanys(data.data.data);
    //   });
  };
  const getStaffDetail = () => {
    setLoading(true);

    const payload = `/${location.state.id}`;
    Get(getStaffDetails, token, payload)
      .then((response) => response)
      .then((data) => {
        setLoading(false);
        const userData = data.data;
        let profilePic = userData?.profile_photo
          ? userData?.profile_photo
          : dummyUser;
        setPicUrl(profilePic);
        setStaff(userData);
        reset(userData);
      });
  };

  const onSubmit = (data) => {
    setLoading(true);
    let userData = staffDetail;
    userData.profile_photo = data.profile_photo;
    userData.name = data.name;
    userData.phone_number = data.phone_number;
    userData.role = Number(data.role);
    userData.email = data.email;
    userData.address = data.address;
    userData.salary = Number(data.salary);
    userData.previous_organization = String(data.previous_organization);
    userData.last_qualification = String(data.last_qualification);
    userData.subject_speciality = String(data.subject_speciality);
    userData.YOE = Number(data.YOE);

    userData.gender = Number(data.gender);

    Post(updateStaffDetails, token, userData)
      .then((res) => {
        setLoading(false);

        navigate("/staffManagement");
        toast.success("Staff details has been updated successfully");
      })
      .catch((error) => {
        setLoading(false);

        toast.error(error.message);
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
        let userData = staffDetail;
        userData.profile_photo = res.data.key;
        setStaff(userData);
        setPicKey(res.data.key);
        setUpdatePic(true);
        let payload = `?key=${res.data.key}`;
        Get(fileSignatureAddForPublic, token, payload)
          .then((response) => response)
          .then((res) => {
            setPicUrl(res.data.signatureUrl);
          });
      })
      .catch((error) => {
        setLoading(false);

        toast.error(error.message);
      });
  };
  const handleCompanyChange = ({ target }) => {
    setSelectedCompany(target.value);
    setAddNewCompany(false);
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="mx-6 mt-2">
        <h1 className="text-2xl">
          {`Staff Management > ${
            location.state.type == "corporate"
              ? "Corporate Users"
              : "General Users"
          } > Edit`}
        </h1>
      </div>
      <div className="mx-6">
        <div className="flex flex-row justify-end my-4">
          <button
            onClick={() => navigate("/staffManagement", {})}
            className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Back
          </button>
        </div>

        <h1 className="text-xl mb-4 bg-emerald-300 py-2 px-4 rounded-lg">
          Staff Details
        </h1>

        <form
          className="flex border border-gray-400 rounded-xl p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-3/4">
            <div className="divide-y">
              <div className="flex items-center py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Full Name -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("name", { required: true })}
                    defaultValue={staffDetail?.name}
                    placeholder="Name"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => {
                      let userData = staffDetail;
                      userData.name = e.target.value;
                      setStaff(userData);
                    }}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      Full name is required
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Email -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("email", {
                      required: true,
                    })}
                    defaultValue={staffDetail?.email}
                    placeholder="Staff Email"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.age?.type == "required" && (
                    <p className="text-red-500 text-xs italic">
                      Email is required
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Role
                  </label>
                </div>

                <div className="w-2/3">
                  <select
                    {...register("role", { required: true })}
                    defaultValue={staffDetail?.role}
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value={0}>Role</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Sub Admin</option>
                    <option value={3}>Teacher</option>
                    <option value={4}>Transport</option>
                    <option value={5}>Cleaner</option>

                    <option value={6}>Gate Keeper</option>
                    <option value={7}>Other</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-xs italic">Role</p>
                  )}
                </div>
              </div>

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Address
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("address", {
                      required: true,
                    })}
                    defaultValue={staffDetail?.address}
                    placeholder="Address"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.address?.type == "required" && (
                    <p className="text-red-500 text-xs italic">
                      Address is required
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Phone Number -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("phone_number", {
                      required: true,
                    })}
                    defaultValue={staffDetail?.phone_number}
                    placeholder="Phone Number"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.phone_number?.type == "required" && (
                    <p className="text-red-500 text-xs italic">
                      Phone Number is required
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Salary
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("salary", {
                      required: true,
                    })}
                    defaultValue={staffDetail?.salary}
                    placeholder="Salary"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.salary?.type == "required" && (
                    <p className="text-red-500 text-xs italic">
                      Salary is required
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Years of Experience
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("YOE", {
                      required: true,
                    })}
                    defaultValue={staffDetail?.YOE}
                    placeholder="Staff YOE"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Subject Speciality
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("subject_speciality", { required: false })}
                    defaultValue={staffDetail?.subject_speciality}
                    placeholder="Subject Speciality"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                </div>
              </div>


              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Previous Organization
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("previous_organization", { required: false })}
                    defaultValue={staffDetail?.previous_organization}
                    placeholder="Previous Organization"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Gender -
                  </label>
                </div>
                <div className="w-2/3">
                  <select
                    {...register("gender", { required: true })}
                    defaultValue={staffDetail?.gender}
                    className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                    <option value={3}>Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs italic">
                      Gender is required
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-2/4"></div>
                <div className="w-2/3">
                  <button
                    type="submit"
                    className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 ml-2">
            <img className="w-full rounded-full" src={picUrl} />
            <label>
              {" "}
              <img className="float-right mb-2" src={cameraIcon} />
              <input
                type="file"
                className="hidden"
                onChange={(event) => getPicUrl(event)}
                accept=".png ,.jpg, .jpeg, .webp"
              />
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
