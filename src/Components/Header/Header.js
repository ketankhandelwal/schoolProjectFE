import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import dropDownArrow from '../../assets/Icons/dropDownArrow.svg';
import { useDispatch } from 'react-redux';
import Modal from '../../Components/Modal/Modal';
import { toast } from 'react-toastify';
import { FaBars } from 'react-icons/fa'

import Navbar from '../SideBar/Navbar';
import schoolName from '../../assets/Icons/simpleSchoolName.png'


export default function Header(props) {
    const [dropDown, setDropDown] = useState('hidden');
    const [modal, setModal] = useState(false);
    const [sideBar, setSideBar] = useState(true)
    const dispatch = useDispatch();

    const showDropDown = (e) => {
        e.preventDefault();
        if (dropDown === 'hidden') {
            setDropDown('visible')
        } else {
            setDropDown('hidden')
        }
    }

    const showSideBar = () => setSideBar(!sideBar)

    return (
        <>
            <header className='flex flex-row justify-between bg-white shadow p-6 pt-2 mb-2 bg-emerald-300'>
                <div className='w-60 mt-2 flex'>
                {/* <div className='mr-4'> <Hamburger toggled={!sideBar} toggle={showSideBar} size={30} duration={0.5}/></div> */}
                    <div className='mr-4 ml-3 mt-2 cursor-pointer'><FaBars size={30} onClick ={showSideBar} /></div>:
                    {/* <div className='mr-4'><AiOutlineClose size={30} onClick ={showSideBar} /></div> */}
                    {/* <img  src={schoolName} /> */}
                </div>
                <div>
                </div>
                {/* <div className='text-3xl absolute left-80 ml-6 mt-6 xs:hidden'>
                    {props.tittle}
                </div> */}
                <div className='flex flex-row'>
                    {/* <img className="cursor-pointer m-4 h-8" src={bellIcon} /> */}
                    <div className="mt-2 relative z-50 w-56 " onClick={showDropDown}>
                        <button className="font-semibold border border-gray-400 rounded-lg py-2 px-4 inline-flex items-center">
                            <span className="mr-1">Welcome Admin</span>
                            <img className="fill-current h-4 w-4" src={dropDownArrow} />
                        </button>
                        <ul className={`divide-y border border-gray-400 bg-white absolute text-gray-700 pt-1 ${dropDown}`}>
                            <li><NavLink to='/profile' className="rounded-t hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">My Profile</NavLink></li>
                            <li><NavLink to='/changePass' className="hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Change Password</NavLink></li>
                            <li onClick={() => {
                                setModal(true);
                            }}><span className="rounded-b hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Log Out</span></li>
                        </ul>
                    </div>
                </div>
            </header>
            {modal && <Modal tittle='Logout' hide={() => setModal(false)}>
                <div className="flex items-center justify-between">
                    <p>Are you sure you want to Logout ?</p>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={e => {
                        dispatch({
                            type: 'SIGN_OUT',
                            payload: null,
                        });
                        toast.success('Logout success!');
                    }} className="bg-btnColor hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Yes
                    </button>
                    <button onClick={() => setModal(false)} className="bg-bodyColor hover:shadow-customShadow text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Cancel
                    </button>
                </div>
            </Modal>
            }
                <div className='flex flex-row min-h-screen'>
                    <Navbar toggleSideBar ={sideBar}/>
                    <div className='flex-auto w-3/4 bg-white shadow m-1'>
                        {props.childData}
                    </div>
                </div>

        </>
    )
}
