import React from 'react';
import appIcon from '../../assets/Icons/appLogo.svg';
import "../../App.css";

export default function PublicLayout(props) {
    return (
        <div className='bg-emerald-300 min-h-full h-screen flex justify-center pt-36 move_top'>
            <div className='flex w-2/3 h-96 flex-row rounded-xl py-10 bg-white main_layout'>
                <div className='w-2/5 px-14 items-center justify-center left_cont'>
                    <img className='w-full' src={appIcon} alt='' />
                    <span className='px-2.5 text-2xl italic text-green-900 font-bold app_head'>School Administration WebPage  </span>
                    <p className='text-sm small_txt'>A Step Towards Digitalization</p>
                </div>
                <div className='w-3/5 px-14 mt-4 right_cont'>
                    {props.children}
                </div>
            </div>
           
        </div>
    )
}
