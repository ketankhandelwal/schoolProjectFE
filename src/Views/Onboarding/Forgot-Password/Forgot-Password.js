import React from "react";
import PublicLayout from "../../../Components/PublicLayout/PublicLayout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Post } from "../../../Constants/apiMethods";
import { adminPasswordResetMail } from "../../../Constants/apiRoutes";
import LoadingSpinner from "../../../Components/Loader/index";
import { useState } from "react";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    data.resend_otp = 0;
      Post(adminPasswordResetMail, null, data)
        .then((res) => {
          setLoading(false);

          navigate("/verifyOtp", { state: data.email });
          toast.success(res.data.res);
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
          <p>Forgot Password</p>
        </div>
        <div className="text-black mt-10 text-center rght_txt">
          <p>
            Please enter the registered Email address, we will help you to
            retrieve your password
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 mb-8">
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
          <div className="mb-8">
            <button
              className="bg-btnColor bg-teal-600 w-full hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </PublicLayout>
    </>
  );
}
