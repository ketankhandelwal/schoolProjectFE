import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { Post } from "../../../Constants/apiMethods";

import { addFees, addLeaves } from "../../../Constants/apiRoutes";


const AddLeaves = (props) => {
  const token = localStorage.getItem("access_token");
  const moment = require("moment-timezone");

  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [leaveFrom, setLeaveFrom] = useState();
  const [leaveTo, setLeaveTo] = useState();

  const onChangeFrom = (data) => {
    const start = new Date(data.target.value);
    const newStart = start.toISOString();


    setLeaveFrom(newStart);
  };
  const onChangeTo = (data) => {
    const end = new Date(data.target.value).toISOString();
    setLeaveTo(end);
  };
  const onSubmit = (data) => {
    const payload = `${location.state}`;
    setLoading(true);
    data.leave_from = String(leaveFrom);
    data.leave_type = Number(data.leave_type);
    data.leave_to = String(leaveTo);
    data.staff_id = Number(payload);
    Post(addLeaves, token, data)
      .then((res) => {
        setLoading(false);

        navigate("/staffManagement");
        toast.success("Staff Leaves added successfully");
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
              Leave Type
            </label>
          </div>
          <div className="w-2/3">
            <select
              {...register("leave_type", { required: true })}
             
           
              className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={0} selected>
                Select Leave Type
              </option>
              <option value={1}>Planned Leave</option>
              <option value={2}>Casual Leave</option>
              <option value={3}>UnInformed Leave</option>
              <option value={4}>Half Day</option>
              
            </select>
            {errors.leave_type && (
              <p className="text-red-500 text-xs italic">Leave Type is required</p>
            )}
          </div>
        </div>

        <div className="flex items-center py-3">
          <div className="w-1/3">
            <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
              From
            </label>
          </div>
          <div className="w-2/3">
          <div className="flex w-2/3 items-center mb-6">
            <div className="w-1/3">
              <label className="block text-right mb-1 md:mb-0 pr-4"></label>
            </div>
            <div className="w-2/3">
              <input
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline date_in"
                type="date"
                // max={moment().format("YYYY-MM-DD")}
                onChange={onChangeFrom}
              />
            </div>
          </div>
            {errors.leave_from && (
              <p className="text-red-500 text-xs italic">Date  is required</p>
            )}
          </div>
        </div>

        <div className="flex items-center py-3">
          <div className="w-1/3">
            <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
              To
            </label>
          </div>
          <div className="w-2/3">
          <div className="flex w-2/3 items-center mb-6">
            <div className="w-1/3">
              <label className="block text-right mb-1 md:mb-0 pr-4"></label>
            </div>
            <div className="w-2/3">
              <input
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline date_in"
                type="date"
                // max={moment().format("YYYY-MM-DD")}
                onChange={onChangeTo}
              />
            </div>
          </div>
            {errors.leave_to && (
              <p className="text-red-500 text-xs italic">
                Date is required.
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
              className=" rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
          {/* <div>
            <h3>Please don't include school holiday while calculating staff leaves</h3>
          </div> */}
        </div>
      </form>
      <div className="text-red-600">
            <h3>Please don't include school holiday while calculating leaves</h3>
          </div>
    </div>
  );
};

export default AddLeaves;
