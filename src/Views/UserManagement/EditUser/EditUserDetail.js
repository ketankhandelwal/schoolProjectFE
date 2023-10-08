import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import {
  fileSignatureAddForPublic,
  getUserDetails,
  updateUserDetails,
} from "../../../Constants/apiRoutes";
import { uploadFile, company } from "../../../Constants/apiRoutes";
import { Get, Post, Post2 } from "../../../Constants/apiMethods";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingSpinner from "../../../Components/Loader/index";
import dummyUser from "../../../assets/Icons/dummyUser.svg";
import cameraIcon from "../../../assets/Icons/camera.svg";

export default function EditUser(props) {
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(false);
  const [companyList, setCompanys] = useState();
  const [addNewCompany, setAddNewCompany] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetail, setUser] = useState();
  const [picUrl, setPicUrl] = useState(dummyUser);
  const [picKey, setPicKey] = useState("");

  const [selectedCompany, setSelectedCompany] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCompanys();
    getUserDetail();
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
  const getUserDetail = () => {
    setLoading(true);

    const payload = `/${location.state.id}`;
    Get(getUserDetails, token, payload)
      .then((response) => response)
      .then((data) => {
        setLoading(false);
        const userData = data.data;

        setUser(userData);
        reset(userData);
      });
  };

  const onSubmit = (data) => {
    setLoading(true);
    let userData = userDetail;

    userData.name = data.name;
    userData.phone_number = data.phone_number;
    userData.emergency_phone_number = data.emergency_phone_number;
    userData.allergy = data.allergy;

    userData.class_id = Number(data.class_id);
    userData.sec = data.sec;
    userData.address = data.address;

    userData.gender = Number(data.gender);

    Post(updateUserDetails, token, userData)
      .then((res) => {
        setLoading(false);

        navigate("/userManagement");
        toast.success("Student details has been updated successfully");
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
          {`User Management > ${
            location.state.type == "corporate"
              ? "Corporate Users"
              : "General Users"
          } > Edit`}
        </h1>
      </div>
      <div className="mx-6">
        <div className="flex flex-row justify-end my-4">
          <button
            onClick={() => navigate("/userManagement", {})}
            className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Back
          </button>
        </div>

        <h1 className="text-xl mb-4 bg-emerald-300 py-2 px-4 rounded-lg">
          User Details
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
                    defaultValue={userDetail?.name}
                    placeholder="Name"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => {
                      let userData = userDetail;
                      userData.name = e.target.value;
                      setUser(userData);
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
                    Class -
                  </label>
                </div>

                <div className="w-2/3">
                  <select
                    {...register("class_id", { required: true })}
                    defaultValue={userDetail?.class_id}
                    // defaultValue={props.data && props.data.UserRole}
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value={0}>Class</option>
                    <option value={1}>Kinder Garden</option>
                    <option value={2}>L.K.G</option>
                    <option value={3}>U.K.G</option>
                    <option value={4}>I</option>
                    <option value={5}>II</option>
                    <option value={6}>III</option>
                    <option value={7}>IV</option>
                    <option value={8}>V</option>
                    <option value={9}>VI</option>
                    <option value={10}>VII</option>
                    <option value={11}>VIII</option>
                    <option value={12}>IX</option>
                    <option value={13}>X</option>
                    <option value={14}>XI</option>
                    <option value={15}>XII</option>
                  </select>
                  {errors.class_id && (
                    <p className="text-red-500 text-xs italic">
                      Class is required
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Section
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("sec", {
                      required: true,
                    })}
                    defaultValue={userDetail?.sec}
                    placeholder="Section"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.sec?.type == "required" && (
                    <p className="text-red-500 text-xs italic">
                      Section is required
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
                    defaultValue={userDetail?.phone_number}
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
                    Address -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("address", {
                      required: true,
                    })}
                    defaultValue={userDetail?.address}
                    placeholder="Address"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.phone_number?.type == "required" && (
                    <p className="text-red-500 text-xs italic">
                      Address is required
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Emergency Phone Number -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("emergency_phone_number", {
                      required: false,
                    })}
                    defaultValue={userDetail?.emergency_phone_number}
                    placeholder="Emergency Phone Number"
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
                    defaultValue={userDetail?.gender}
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

              <div className="flex items-center  py-3">
                <div className="w-2/4">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Allergy -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("allergy", { required: false })}
                    defaultValue={userDetail?.allergy}
                    placeholder="Allergy"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
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
        </form>
      </div>
    </>
  );
}
