import React from "react";
import PublicLayout from "../../../Components/PublicLayout/PublicLayout";
import passHide from "../../../assets/Icons/passHide.svg";
import passShow from "../../../assets/Icons/passShow.svg";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { adminPasswordChange } from "../../../Constants/apiRoutes";
import { Post } from "../../../Constants/apiMethods";
import LoadingSpinner from "../../../Components/Loader/index";
import { useState } from "react";

export default function ResetPassword(props) {
  const [loading, setLoading] = useState(false);

  let location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    delete data["cnfrmPassword"];
      Post(adminPasswordChange, location.state, data)
        .then((res) => {
          setLoading(false);

          navigate("/login");
          toast.success("Password changed.");
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
          <p>Set New Password</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="my-6 hidden">
                        <input autoComplete='off' {...register("email", { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} className="shadow appearance-none bg-bodyColor rounded-lg placeholder-black w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email" placeholder="Email" />
                        {errors.email?.type == 'required' && <p className="text-red-500 text-xs italic">Email is required</p>}
                        {errors.email?.type == 'pattern' && <p className="text-red-500 text-xs italic">Please enter a valid Email address</p>}
                    </div> */}
          <div className="my-6 relative">
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
              autoComplete="off"
              {...register("password", { required: true })}
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
          <div className="mb-6 relative">
            <img
              src={passShow}
              className="absolute right-4 top-2 cursor-pointer"
              onClick={(e) => {
                var div = document.getElementById("cnfrmPassword");
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
              id="cnfrmPassword"
              {...register("cnfrmPassword", { required: true })}
              autoComplete="off"
              className="shadow appearance-none bg-bodyColor rounded-lg placeholder-black w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Confirm password"
            />
            {errors.cnfrmPassword?.type == "required" && (
              <p className="text-red-500 text-xs italic">
                Confirm Password is required
              </p>
            )}
            {/* {errors.cnfrmPassword?.type == 'pattern' && <p className="text-red-500 text-xs italic">Please enter a Password consists of length 8 to 15 characters, 1 upper case, lower case, special character and number</p>} */}
          </div>
          <div className="mb-6">
            <button
              className="bg-btnColor bg-teal-600 w-full hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </PublicLayout>
    </>
  );
}
