import React from "react";
import PublicLayout from "../../../Components/PublicLayout/PublicLayout";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { adminOTPVerification } from "../../../Constants/apiRoutes";
import { Post } from "../../../Constants/apiMethods";
import LoadingSpinner from "../../../Components/Loader/index";
import { useState } from "react";

// import { useDispatch } from 'react-redux';

export default function VerifyOtp() {
  const [loading, setLoading] = useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const param = useParams();
  // alert(param.id)
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    data["email"] = location.state;
      Post(adminOTPVerification, null, data)
        .then((res) => {
          setLoading(false);

          navigate("/resetPassword", { state: res.data.access_token });
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
          <p>Verify OTP</p>
        </div>
        <div className="text-black mt-10 text-center">
          <p>Please enter OTP</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 mb-8">
            <input
              autoComplete="off"
              {...register("otp", { required: true })}
              className="shadow appearance-none bg-bodyColor rounded-lg placeholder-black w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="OTP"
            />
            {errors.otp?.type == "required" && (
              <p className="text-red-500 text-xs italic">OTP is required</p>
            )}
          </div>
          <div className="mb-2">
            <button
              className="bg-btnColor bg-teal-600 w-full hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Verify
            </button>
          </div>
          {/* <div className="mb-8 text-center">
                        <div className='text-black-700 underline'>Resend OTP</div>
                    </div> */}
        </form>
      </PublicLayout>
    </>
  );
}
