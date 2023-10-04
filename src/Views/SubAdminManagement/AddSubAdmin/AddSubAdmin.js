import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Post, Post2, Get } from "../../../Constants/apiMethods";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../Components/Loader/index";
import {
  subAdminPermissionList,
  createSubAdmin,
  uploadFile,
} from "../../../Constants/apiRoutes";
import moment from "moment";
import dummyUser from "../../../assets/Icons/dummyUser.svg";
import cameraIcon from "../../../assets/Icons/camera.svg";

export default function AddSubadmin() {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");
  const [permissionsList, setPermissionList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const picUrl = dummyUser;
  useEffect(() => {
    fetchPermissionList();
  }, []);

  const fetchPermissionList = () => {
    setLoading(true);

    Get(subAdminPermissionList, token)
      .then((response) => response)
      .then((data) => {
        setLoading(false);
        data?.data?.unshift({
          id: 8,
          name: "All Permissions",
          status: 2,
        });
       const permissionData =  data?.data?.map((item) => {
          return { ...item, status: 2 };
        });
        setPermissionList(permissionData);
      });
  };

  const handlePermissions = (status, id) => {
    let updatedPermissionList;
    if (id === 8) {
      updatedPermissionList = permissionsList.map((item) => {
        return { ...item, status: status ? 1 : 2 };
      });
    } else {
      updatedPermissionList = permissionsList.map((item) => {
        return item.id === id ? { ...item, status: status ? 1 : 2 } : item;
      });
    }
    setPermissionList(updatedPermissionList);
  };

  const onSubmit = (data) => {
    setLoading(true);
    const getPermissionArray = createPermissionArray(permissionsList);
    const body = {
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      permission: getPermissionArray,
      password : data.password,
      role: 2,
      designation: data.designation,
      profile_photo: "abcde"
    };
    submitAdminDetails(body);
    // imageFile.name ? getPicUrl(imageFile, body) : submitAdminDetails(body)
  };



  // const getPicUrl = (imagedata, data) => {
  //   let formData = new FormData();
  //   formData.append("file", imagedata, imagedata.name);
  //   Post2(uploadFile, token, formData)
  //     .then((res) => {
  //       data.profile_photo = res.data.Key;
        
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // };

  const submitAdminDetails = (body) => {
    Post(createSubAdmin, token, body)
      .then((res) => {
        setLoading(false);

        navigate("/sd", { state: "corporatefromAdd" });
        toast.success("Sub Admin created successfully");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const createPermissionArray = (permissions_list) => {
    const allPermissionsList = [...permissions_list];
    allPermissionsList.shift();
    return allPermissionsList.map(({ id, status }) => {
      return { id, status };
    });
  };

  const handleChangeImage = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
  };
  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="mx-6 mt-2">
        <h1 className="text-2xl">Sub-Admin management &gt; Add New</h1>
      </div>
      <div className="mx-6">
        <div className="flex">
          <div className="w-5/6"></div>
          <div className="w-1/6 text-right mb-4">
            <button
              onClick={() => navigate("/sd")}
              className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Back
            </button>
          </div>
        </div>

        <form
          className="flex border border-gray-400 rounded-xl p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-3/4">
            <div className="divide-y">
              <div className="flex items-center py-3">
                <div className="w-1/3">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Full Name -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("name", { required: true })}
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
                    Email Address -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    placeholder="Email Id"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.email?.type == "required" && (
                    <p className="text-red-500 text-xs italic">
                      Email address is required
                    </p>
                  )}
                  {errors.email?.type == "pattern" && (
                    <p className="text-red-500 text-xs italic">
                      Please enter a valid Email address
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-1/3">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Password -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("password", { required: true })}
                    placeholder="Password"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic">
                      Enter Valid Password
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
                      // pattern:
                      //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    // defaultValue={props.data && props.data.Email}
                    placeholder="phone number"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.phone_number?.type == "required" && (
                    <p className="text-red-500 text-xs italic">
                      Phone number is required
                    </p>
                  )}
                  {errors.email?.type == "pattern" && (
                    <p className="text-red-500 text-xs italic">
                      Please enter a valid Email number
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center py-3">
                <div className="w-1/3">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Designation -
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("designation", { required: false })}
                    placeholder="Designation"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                
                </div>
              </div>

            


              <div className="flex items-center py-3">
                <div className="w-1/3">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Role-
                  </label>
                </div>
                <div className="w-2/3">
                  <span>Sub Admin</span>
                </div>
              </div>
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
              <div className="flex py-3">
                <div className="w-1/3">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Permissions -
                  </label>
                </div>
                <div className="w-2/3">
                  {permissionsList?.map((permission) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          name="session"
                          checked={permission.status === 1 ? true : false}
                          value="1"
                          className="ml-2 mt-1"
                          onChange={(e) =>
                            handlePermissions(e.target.checked, permission.id)
                          }
                        />
                        <label className="ml-2">{permission.name}</label>
                      </div>
                    );
                  })}
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
              </div>
            </div>
          </div>
          <div className="w-1/4 ml-2">
            <img className="w-full rounded-full" src={previewImage || picUrl} />
            <label>
              <img className="float-right" src={cameraIcon} />
              <input
                {...register("image", { required: false })}
                id="profile_photo"
                type="file"
                className="hidden"
                onChange={handleChangeImage}
                accept=".png ,.jpg, .jpeg, .webp"
              />
           
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
