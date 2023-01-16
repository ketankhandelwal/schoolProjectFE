import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';

export default function PrivateLayout(props) {
    const token = useSelector((state) => state.auth.isSignedIn);
    if(token){
        return (
            <div className='min-h-screen scr-h'>
                <Header tittle={props.headertittle} childData = {props.children}/>
                {/* <div className='flex flex-row min-h-screen'>
                    <Navbar />
                    <div className='flex-auto w-3/4 bg-white shadow m-1'>
                        {}
                    </div>
                </div> */}
            </div>
        )
    } else {
        return (
			<Navigate replace to="/login" />
		);
    }
}
