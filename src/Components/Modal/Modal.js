import React from 'react';
import { createPortal } from 'react-dom';
import blockIcon from "../../assets/Icons/deleteIcon.svg";

export default function Modal(props) {
    return createPortal(
        <div className="flex overflow-x-hidden overflow-y-auto fixed h-modal top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center bg-modalbackColor">
            <div className="relative max-w-4xl">
                <div className="bg-white text-center rounded-lg shadow relative dark:bg-gray-700">
                    <div className="items-start justify-between p-3  rounded-t dark:border-gray-600">
                        <div className="flex justify-center text-xl lg:text-2xl items-center font-semibold dark:text-white">
                            {/* <img src={blockIcon} height="50px" width="50px"/> */}
                        </div>
                        <div>
                        <h3 className="text-xl lg:text-2xl items-center font-semibold dark:text-white mt-4">
                            {props.tittle}
                        </h3>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
        , document.getElementById('root'))
}
