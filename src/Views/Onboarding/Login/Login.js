import React from "react";
import PublicLayout from "../../../Components/PublicLayout/PublicLayout";
import passHide from "../../../assets/Icons/passHide.svg";
import passShow from "../../../assets/Icons/passShow.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { Post } from "../../../Constants/apiMethods";
import { adminLogin } from "../../../Constants/apiRoutes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../../../Components/Loader/index";
import { useState } from "react";
import {AiOutlineLaptop,AiFillGithub} from 'react-icons/ai'
import {DiFirebase} from 'react-icons/di';
import {SiFirebase,SiPrisma} from 'react-icons/si';
import {BsFillCloudArrowDownFill,BsFillMouse2Fill} from 'react-icons/bs';
import {FaAws,FaReact} from 'react-icons/fa';




export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
      Post(adminLogin, null, data)
        .then((res) => {
          setLoading(false);
          localStorage.setItem("access_token", res.data.access_token);
          dispatch({
            type: "SIGN_IN",
            payload: res.data.access_token,
          });
          dispatch({
            type: "ADMIN_DATA",
            payload: res.data.user_details,
          });
          navigate("/userManagement", { state: "general" });
          toast.success("Logged in successfully");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <PublicLayout>
        <div className="text-center text-2xl text-black -mt-8 ">
          <p>Log-In</p>
        </div>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <div className="my-8">
            <input
              autoComplete="off"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              className="shadow appearance-none bg-bodyColor rounded-lg placeholder-black w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Email Address"
            />
            {errors.email?.type == "required" && (
              <p className="text-red-500 text-xs italic">Email is required</p>
            )}
            {errors.email?.type == "pattern" && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid Email address
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <img
              src={passShow}
              className="absolute right-4 top-2 cursor-pointer"
              onClick={(e) => {
                var div = document.getElementById("password");
                if (div.type === "password") {
                  div.type = "text";
                  e.target.src = passHide;
                } else {
                  div.type = "password";
                  e.target.src = passShow;
                }
              }}
            />
            <input
              id="password"
              {...register("password", { required: true })}
              autoComplete="off"
              className="shadow appearance-none bg-bodyColor rounded-lg placeholder-black w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
            />
            {errors.password?.type == "required" && (
              <p className="text-red-500 text-xs italic">
                Password is required
              </p>
            )}
            {/* {errors.password?.type == 'pattern' && <p className="text-red-500 text-xs italic">Please enter a Password consists of length 8 to 15 characters, 1 upper case, lower case, special character and number</p>} */}
          </div>

          {/* <div className="mb-8 float-right">
            <NavLink to="/forgot-password" className="text-black-700 underline">
              Forgot Password ?
            </NavLink>
          </div> */}
          <div className="mb-8">
            <button
              className="bg-btnColor bg-teal-600 w-full hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
        <div className=" flex justify-end items-center max-w-[1140px] w-full py-8 m-auto border-t-4">
        <div className="flex items-center justify-center m-auto w-full">
          <h1>Developed By- Ketan Khandelwal</h1>
       
        </div>

      </div>
      </PublicLayout>

    
    </>
  );
}
