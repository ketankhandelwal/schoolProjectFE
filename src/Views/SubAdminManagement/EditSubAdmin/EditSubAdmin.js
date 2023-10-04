import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post, Post2, Get } from "../../../Constants/apiMethods";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../Components/Loader/index";
import { getPermissionsWithStatus } from "../../../Constants/helper";
import {
  updateSubAdmin,
  uploadFile,
  getSubAdminDetail,
} from "../../../Constants/apiRoutes";
import moment from "moment";
import dummyUser from "../../../assets/Icons/dummyUser.svg";
import cameraIcon from "../../../assets/Icons/camera.svg";

export default function EditSubadmin() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const permissionList = useSelector((state) => state.auth.permissionList);
  const currentUser = useSelector((state) => state.auth?.adminData);
  const token = localStorage.getItem("access_token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [designation,setDesignation] = useState("");
  const [permissionDetails, setPermissionDetails] = useState([]);
  const [subAdminDetails, setSubadminData] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const picUrl = dummyUser;
  const isLoggedInUser = currentUser.id == location.state ? true : false;
  

  useEffect(() => {
    getSubAdminDetails();
  }, []);

  const getSubAdminDetails = () => {
    
    setLoading(true);
    const payload = `?id=${location.state.id}`;
    
    Get(`${getSubAdminDetail}${payload}`, token)
      .then((response) => response)
      .then((data) => {
        setLoading(false);
        setSubadminData(data.data);
        setSubAdminInitialData(data.data);
        const permissionData = getPermissionsWithStatus(
          data?.data?.permissions,
          permissionList
        );
        const areAllChecked = permissionData.find((x) => x.status === 2);
        permissionData?.unshift({
          id: 8,
          name: "All Permissions",
          status: areAllChecked ? 2 : 1,
        });
        setPermissionDetails(permissionData);
      });
  };

  const setSubAdminInitialData = (data) => {
    setName(data?.name);
    setEmail(data?.email);
    setPhoneNumber(data?.phone_number);
    setDesignation(data?.designation)
  };

  const handlePermissions = (status, id) => {
    let updatedPermissionList;
    if (id === 8) {
      updatedPermissionList = permissionDetails.map((item) => {
     
        return { ...item, status: status ? 1 : 2 };
      });
    } else {
      updatedPermissionList = permissionDetails.map((item) => {
        return item.id === id ? { ...item, status: status ? 1 : 2 } : item;
      });
    }
    setPermissionDetails(updatedPermissionList);
  };

  const onSubmit = () => {
    setLoading(true);
    const getPermissionArray = createPermissionArray(permissionDetails);
    const body = {
      id: Number(location.state.id),
      name: String(name),
      email: String(email),
      phone_number: String(phone_number),
      permission: getPermissionArray,
      designation: String(designation),
      profile_photo: subAdminDetails?.profile_photo,
    };
    submitAdminDetails(body)
    // imageFile.name ? getPicUrl(imageFile, body) : submitAdminDetails(body);
  };

 

  

  // const getPicUrl = (imagedata, data) => {
  //   let formData = new FormData();
  //   formData.append("file", imagedata, imagedata.name);
  //   Post2(uploadFile, token, formData)
  //     .then((res) => {
  //       data.profile_photo = res.data.key;
  //       submitAdminDetails(data);
  //     })
  //     .catch((error) => {
  //       toast.error(error.message)
  //     });
  // };

  const submitAdminDetails = (body) => {
    Post(updateSubAdmin, token, body)
      .then((res) => {
        
        setLoading(false);

        navigate("/sd");
        toast.success("Sub Admin updated successfully");
        isLoggedInUser &&
          res.data?.permissions &&
          dispatch({
            type: "ADMIN_DATA",
            payload: { ...currentUser, permission: res.data.permission },
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const createPermissionArray = (permissionsList) => {
    const allPermissionsList = [...permissionsList];
    allPermissionsList.shift();

    return allPermissionsList.map(({ permission_id, status }) => {
      return { permission_id, status };
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
        <h1 className="text-2xl">
          Subadmin management &gt; {subAdminDetails?.sudAdminName} &gt; Edit
        </h1>
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

        <div className="flex border border-gray-400 rounded-xl p-4">
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
                    value={name}
                    onChange={({ target }) => setName(target.value)}
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
                    Designation-
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    placeholder="Designation"
                    className = "shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={designation}
                    onChange={({ target }) => setDesignation(target.value)}
                  />
                
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
                    placeholder="phone number"
                    className = "shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={phone_number}
                    onChange={({ target }) => setPhoneNumber(target.value)}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs italic">
                      Phone number is required
                    </p>
                  )}
                  {errors?.invalid_phone && (
                    <p className="text-red-500 text-xs italic">
                      Please enter a valid phone number
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center py-3">
                <div className="w-1/3">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Status -
                  </label>
                </div>
                <div className="w-2/3">
                  <span>
                    {subAdminDetails?.status === 1
                      ? "Active"
                      : "Not Active"}
                  </span>
                </div>
              </div>
              <div className="flex items-center py-3">
                <div className="w-1/3">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Joined On -
                  </label>
                </div>
                <div className="w-2/3">
                  <span>
                    {moment(subAdminDetails?.created_at).format(
                      "DD-MM-YYYY"
                    )}
                  </span>
                </div>
              </div>
              <div className="flex py-3">
                <div className="w-1/3">
                  <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                    Permissions -
                  </label>
                </div>
                <div className="w-2/3">
                  {permissionDetails?.map((permission) => {
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
                      onClick={() => onSubmit()}
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
            <img
              className="w-full rounded-full"
              src={
                previewImage || subAdminDetails?.subAdminProfilePic || picUrl
              }
            />
            <label>
              <img className="float-right" src={cameraIcon} />
              <input
                type="file"
                id="profile_photo"
                className="hidden"
                onChange={handleChangeImage}
                accept=".png ,.jpg, .jpeg, .webp"
              />
          
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
