import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { Post } from "../../../Constants/apiMethods";
import { addFees } from "../../../Constants/apiRoutes";

const AddFees = (props) => {
  const token = localStorage.getItem("access_token");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    const payload = `${location.state}`;
    setLoading(true);
    data.month = Number(data.month);
    data.amount = Number(data.amount);
    data.fees_type = Number(data.fees_type);
    data.year = Number(data.year);
    data.student_id = Number(payload);
    Post(addFees, token, data)
      .then((res) => {
        setLoading(false);

        navigate("/userManagement");
        toast.success("Student Fees added successfully");
      })
      .catch((error) => {
        setLoading(false);

        toast.error(error.message);
      });
  };

  return (
    <div>
      <form
        className="divide-y w-3/4 border border-gray-400 rounded-xl p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center py-3">
          <div className="w-1/3">
            <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
              Month
            </label>
          </div>
          <div className="w-2/3">
            <select
              {...register("month", { required: true })}
              defaultValue={props.data}
              // onChange={handleCompanyChange}
              className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={0} selected>
                Select Month
              </option>
              <option value={1}>January</option>
              <option value={2}>Feb</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>Novermber</option>
              <option value={12}>December</option>
            </select>
            {errors.month && (
              <p className="text-red-500 text-xs italic">Month is required</p>
            )}
          </div>
        </div>

        <div className="flex items-center py-3">
          <div className="w-1/3">
            <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
              Year
            </label>
          </div>
          <div className="w-2/3">
            <select
              {...register("year", { required: true })}
              defaultValue={props.data}
              // onChange={handleCompanyChange}
              className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={0} selected>
                Select Year
              </option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
            </select>
            {errors.year && (
              <p className="text-red-500 text-xs italic">Year is required</p>
            )}
          </div>
        </div>

        <div className="flex items-center py-3">
          <div className="w-1/3">
            <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
              Fees Type
            </label>
          </div>
          <div className="w-2/3">
            <select
              {...register("fees_type", { required: true })}
              defaultValue={props.data}
              // onChange={handleCompanyChange}
              className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={0} selected>
                Select Fees Type
              </option>
              <option value={1}>Regular</option>
              <option value={2}>Exam Fees</option>
              <option value={3}>Late Fees</option>
              <option value={4}>Admission and DressFees</option>
              <option value={5}>Transport Fees</option>
              <option value={6}>Instalment Fees</option>
            </select>
            {errors.fees_type && (
              <p className="text-red-500 text-xs italic">
                Fees Type is required.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center py-3">
          <div className="w-1/3">
            <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
              Fees Amount -
            </label>
          </div>
          <div className="w-2/3">
            <input
              {...register("amount", { required: true })}
              defaultValue={props.data}
              placeholder="Amount"
              className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs italic">
                Please enter fees amount
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center py-3">
          <div className="w-1/3"></div>
          <div className="w-2/3"></div>
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
  );
};

export default AddFees;
