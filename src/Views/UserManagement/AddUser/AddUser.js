import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { addUser } from "../../../Constants/apiRoutes";
import { uploadFile } from "../../../Constants/apiRoutes";
import { Post } from "../../../Constants/apiMethods";
import { Post2 } from "../../../Constants/apiMethods";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingSpinner from "../../../Components/Loader/index";

export default function AddUser(props) {
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

  // useEffect(() => {
  //   getCompanys();
  // }, []);

  // const getCompanys = () => {
  //   setLoading(true);

  //   Post(company, token, "")
  //     .then((response) => response)
  //     .then((data) => {
  //       setLoading(false);

  //       setClass(data.data.data);
  //     });
  // };

  const onSubmit = (data) => {
    setLoading(true);
    data.class_id =Number(data.class_id);
   
    data.gender = String(data.gender);
    data.date_of_birth = new Date(data.date_of_birth);

    data.profile_photo = document.getElementById("profile_photo").value;
    Post(addUser, token, data)
      .then((res) => {
        setLoading(false);

        navigate("/userManagement");
        toast.success("User added successfully");
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
        <h1 className="text-2xl">Student Management &gt; Add New Student</h1>
      </div>
      <div className="mx-6">
        <div className="flex">
          <div className="w-5/6 text-right mb-4">
            <button
              onClick={() =>
                navigate("/userManagement")
              }
              className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Back
            </button>
          </div>
        </div>
        <h1 className="text-xl mb-4 bg-emerald-300 py-2 px-4 rounded-lg">
          Student Details
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
                Class -
              </label>
            </div>

            
            <div className="w-2/3">
              <select
                {...register("class_id", { required: true })}
                defaultValue={props.data && props.data.Class}
                // defaultValue={props.data && props.data.UserRole}
                className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <p className="text-red-500 text-xs italic">Class is required</p>
              )}
            </div>
          </div>

          <div className="flex items-center py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Section
              </label>
            </div>
            <div className="w-2/3">
              <select
                {...register("sec", { required: true })}
                defaultValue={props.data}
                // onChange={handleCompanyChange}
                className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={0} selected>
                  Select Section
                </option>
                <option value={"A"}>A</option>
                <option value={"B"}>B</option>
                <option value={"C"}>C</option>
                <option value={"D"}>D</option>
                <option value={"E"}>E</option>
                <option value={"F"}>F</option>
                <option value={"G"}>G</option>
                <option value={"H"}>H</option>
                <option value={"I"}>I</option>
              </select>
              {errors.sec && (
                <p className="text-red-500 text-xs italic">
                  Section is required
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
                Address -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("address", {
                  required: true,
                })}
                // defaultValue={props.data && props.data.Age}
                defaultValue={props.data}
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
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Mother Name
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("mother_name", {
                  required: false,
                })}
                // defaultValue={props.data && props.data.Age}
                defaultValue={props.data}
                placeholder="Mother's Name"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Father Name
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("father_name", {
                  required: false,
                })}
                // defaultValue={props.data && props.data.Age}
                defaultValue={props.data}
                placeholder="Father's Name"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Previous School
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("previous_school", {
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
                Emergency Phone Number -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("emergency_phone_number", {
                  required: false,
                })}
                defaultValue={props.data}
                // defaultValue={props.data && props.data.Age}
                placeholder="Emeryency Phone Number"
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center  py-3">
            <div className="w-1/3">
              <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                Allergy -
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("allergy", {
                  required: false,
                })}
                defaultValue={props.data}
                // defaultValue={props.data && props.data.Age}
                placeholder="Allergy"
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

          {/* <div className="flex">
            <div className="w-1/3"></div>
            <div className="w-2/3">
              <p
                onClick={() =>
                  setAddNewCompany(!addNewCompany)
                }
                className="text-left text-blue-700 cursor-pointer"
              >
                Add new company name
              </p>
              {addNewCompany && selectedCompany !=0 &&
                <p className="text-orange-400">Please deselect the company dropdown for adding new company</p>
                }
            </div>
          </div> */}
          {/* {addNewCompany && selectedCompany == 0 ? (
            <div className="flex items-center  py-3">
              <div className="w-1/3"></div>
              <div className="w-2/3">
                <input
                  {...register("company_name", { required: true })}
                  placeholder="Company Name"
                  className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
                {errors.company_name && (
                  <p className="text-red-500 text-xs italic">
                    Company Name is required
                  </p>
                )}
              </div>
            </div>
          ) : (
            ""
          )} */}
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
