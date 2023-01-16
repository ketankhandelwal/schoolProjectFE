import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { Post } from "../../Constants/apiMethods";
import { toast } from "react-toastify";
import passHide from '../../assets/Icons/passHide.svg';
import passShow from '../../assets/Icons/passShow.svg';
import LoadingSpinner from "../../Components/Loader/index";
import {
    changePassword,
  } from "../../Constants/apiRoutes";


export default function ChangePassword() {
    const token = localStorage.getItem("access_token");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
      
    const onSubmit = (data) => {
        setLoading(true);
        const body = {
            old_password: data.oldPassword,
            new_password: data.newPassword
        }
        Post(changePassword, token, body)
        .then((res) => {
          setLoading(false);
          toast.success("Password changed successfully");
          navigate(-1);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    }

    return (
        <>
        {loading && <LoadingSpinner />}
            <div className='mx-6 mt-5'>
                <div className='flex flex-row justify-end my-4'>
                    <button onClick={()=>navigate('/dashboard')} className='bg-bodyColor bg-teal-600 hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Back</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='divide-y w-3/4 border border-gray-400 rounded-xl p-4'>

                    <div className="flex items-center py-3">
                        <div className="w-1/3">
                            <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                            Old Password
                            </label>
                        </div>
                        <div className="w-2/3 relative">
                            <img src={passShow} className='absolute right-2 top-2 cursor-pointer' onClick={(e)=>{
                                var div = document.getElementById('oldPassword');
                                if(div.type === 'password'){
                                    div.type = 'text';
                                    e.target.src = passHide;
                                }else{
                                    div.type = 'password';
                                    e.target.src = passShow;
                                }
                            }} />
                            <input id='oldPassword' {...register("oldPassword", { required: true })} placeholder='Old Password' className='shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' />
                            {errors.oldPassword && <p className="text-red-500 text-xs italic">Old password is required</p>}
                        </div>
                    </div>
                    <div className="flex items-center  py-3">
                        <div className="w-1/3">
                            <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                            New Password
                            </label>
                        </div>
                        <div className="w-2/3 relative">
                            <img src={passShow} className='absolute right-2 top-2 cursor-pointer' onClick={(e)=>{
                                var div = document.getElementById('newPassword');
                                if(div.type === 'password'){
                                    div.type = 'text';
                                    e.target.src = passHide;
                                }else{
                                    div.type = 'password';
                                    e.target.src = passShow;
                                }
                            }} />
                            <input id='newPassword' {...register("newPassword", { required: true })} placeholder='New Password' className='shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' />
                            {errors.newPassword && <p className="text-red-500 text-xs italic">New password is required</p>}
                        </div>
                    </div>

                    <div className="flex items-center  py-3">
                        <div className="w-1/3">
                            <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                            Confirm Password
                            </label>
                        </div>
                        <div className="w-2/3 relative">
                            <img src={passShow} className='absolute right-2 top-2 cursor-pointer' onClick={(e)=>{
                                var div = document.getElementById('cnfrmPass');
                                if(div.type === 'password'){
                                    div.type = 'text';
                                    e.target.src = passHide;
                                }else{
                                    div.type = 'password';
                                    e.target.src = passShow;
                                }
                            }} />
                            <input id='cnfrmPass' {...register("cnfrmPass", { required: true })} placeholder='Confirm Password' className='shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' />
                            {errors.cnfrmPass && <p className="text-red-500 text-xs italic">Confirm password is required</p>}
                        </div>
                    </div>
                    <div className="flex items-center py-3">
                        <div className="w-1/3">
                        </div>
                        <div className="w-2/3">
                            <button type='submit' className='bg-btnColor bg-teal-600 hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4'>Update</button>
                            <button type='submit' className='bg-btnColor bg-teal-600 hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
