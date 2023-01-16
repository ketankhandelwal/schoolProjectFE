import React from 'react';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import { PublicRoutes } from '../Routes/PublicRoutes.js';
import { PrivateRoutes } from '../Routes/PrivateRoutes.js';
import PrivateLayout from '../Components/PrivateLayout/PrivateLayout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function index() {
    return (
        <>

            <ToastContainer position="top-center" autoClose={2000} />
            <HashRouter>
                <Routes>
                <Route path="/" element={<Navigate replace to="/Login" />} />
                    {PublicRoutes.map((item, index) => {
                        return (
                            <Route key={item.element} path={item.path}
                                element={item.element}
                            />
                        )
                    }
                    )}
                    {PrivateRoutes.map((item, index) => {
                        return (
                            <Route key={item.element} path={item.path}
                                element={<PrivateLayout headertittle={item.headerTittle}>{item.element}</PrivateLayout>}
                            />
                        )
                    }
                    )}
                </Routes>
            </HashRouter>
        </>
    )
}
