import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { addStaff } from "../../../Constants/apiRoutes";
import { uploadFile } from "../../../Constants/apiRoutes";
import { Post } from "../../../Constants/apiMethods";
import { Post2 } from "../../../Constants/apiMethods";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingSpinner from "../../../Components/Loader/index";

export default function AddStaff(props) {
  const token = localStorage.getItem("access_token");
  const [classList, setClass] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    data.profile_photo = String(data.profile_photo);
    data.name = String(data.name);
    data.phone_number = String(data.phone_number);
    data.role = Number(data.role);
    data.email = String(data.email);
    data.address = String(data.address);
    data.salary = Number(data.salary);
    data.previous_organization = String(data.previous_organization);
    data.last_qualification = String(data.last_qualification);
    data.subject_speciality = String(data.subject_speciality);
    data.YOE = Number(data.YOE);

    data.gender = Number(data.gender);
    data.date_of_birth = new Date(data.date_of_birth);

    data.profile_photo = document.getElementById("profile_photo").value;
    Post(addStaff, token, data)
      .then((res) => {
        setLoading(false);

        navigate("/staffManagement");
        toast.success("Staff added successfully");
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

        document.getElementById("profile_photo").value = res.data.Key;
      })
      .catch((error) => {
        setLoading(false);

        toast.error(error.message);
      });
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="mx-6 mt-2">
        <h1 className="text-2xl">Staff Management &gt; Add New Staff</h1>
      </div>
      <div className="mx-6">
        <div className="flex">
          <div className="w-5/6 text-right mb-4">
            <button
              onClick={() => navigate("/staffManagement")}
              className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Back
            </button>
          </div>
        </div>
        <h1 className="text-xl mb-4 bg-emerald-300 py-2 px-4 rounded-lg">
          Staff Details
        </h1>

        <form
          className="divide-y w-3/4 border border-gray-400 rounded-xl p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Full Name -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("name", { required: true })}
                defaultValue={props.data && props.data.Name}
                placeholder="Name"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  Full name is required
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Email -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("email", {
                  required: true,
                })}
                defaultValue={props.data}
                placeholder="Email"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
              {errors.age?.type == "required" && (
                <p className="text-red-500 text-xs italic">Email is required</p>
              )}
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Role-
              </label>
            </div>

            <div className="w-2/3">
              <select
                {...register("role", { required: true })}
                className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={0}>Role</option>
                <option value={3}>Teacher</option>
                <option value={4}>Transport</option>
                <option value={5}>Cleaner</option>

                <option value={6}>Gate Keeper</option>
                <option value={7}>Other</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs italic">Role is required</p>
              )}
            </div>
          </div>

          <div className="flex items-center py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Address
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("address", {
                  required: true,
                })}
                placeholder="Address"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />

              {errors.address && (
                <p className="text-red-500 text-xs italic">
                  Address is required
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Phone Number -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("phone_number", {
                  required: true,
                })}
                defaultValue={props.data}
                // defaultValue={props.data && props.data.Age}
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
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Date of Birth -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("date_of_birth", { required: true })}
                placeholder="D.O.B."
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                max={moment().format("YYYY-MM-DD")}
              />
              {errors.date_of_birth && (
                <p className="text-red-500 text-xs italic">
                  D.O.B. is required
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Years of Experience-
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("YOE", {
                  required: true,
                })}
                // defaultValue={props.data && props.data.Age}
                defaultValue={props.data}
                placeholder="YOE"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
              {errors.YOE?.type == "required" && (
                <p className="text-red-500 text-xs italic">YOE is required</p>
              )}
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Salary -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("salary", {
                  required: true,
                })}
                // defaultValue={props.data && props.data.Age}
                defaultValue={props.data}
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
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Previous Organization
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("previous_organization", {
                  required: false,
                })}
                // defaultValue={props.data && props.data.Age}
                defaultValue={props.data}
                placeholder="Previos School"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Subject Speciality -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("subject_speciality", {
                  required: false,
                })}
                defaultValue={props.data}
                // defaultValue={props.data && props.data.Age}
                placeholder="Enter Subject Speciality"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Latest Qualification -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("last_qualification", {
                  required: false,
                })}
                defaultValue={props.data}
                // defaultValue={props.data && props.data.Age}
                placeholder="Enter Latest Qualification"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Gender -
              </label>
            </div>
            <div className="w-2/3">
              <select
                {...register("gender", { required: true })}
                // defaultValue={props.data}
                className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={1}>Male</option>
                <option value={2}>Female</option>
                <option value={3}>Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs italic">
                  Gender is required
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Profile Picture -
              </label>
            </div>
            <div className="w-2/3">
              <input
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                onChange={(event) => getPicUrl(event)}
                accept=".png ,.jpg, .jpeg, .webp"
              />
              {/* {errors.date_of_birth && <p className="text-red-500 text-xs italic">Profile picture is required</p>} */}
            </div>
          </div>
          <input
            type="text"
            className="hidden"
            {...register("profile_photo")}
            id="profile_photo"
          />

          <div className="flex items-center py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Status -
              </label>
            </div>
            <div className="w-2/3">
              <span>Active</span>
            </div>
          </div>
          <div className="flex items-center py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Joined On -
              </label>
            </div>
            <div className="w-2/3">
              <span>{moment(new Date()).format("DD-MM-YYYY")}</span>
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
