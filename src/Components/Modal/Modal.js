import React from 'react';
import { createPortal } from 'react-dom';
import blockIcon from "../../assets/Icons/deleteIcon.svg";

export default function Modal(props) {
    return createPortal(
        <div className="flex overflow-x-hidden overflow-y-auto fixed h-modal top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center bg-modalbackColor">
            <div className="relative max-w-4xl">
                <div className="bg-white text-center rounded-lg shadow relative dark:bg-gray-700">
                {/* <button onClick={() => props.hide()} type="button" className=" float-right mr-4 mt-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button> */}
                    <div className="items-start justify-between p-3  rounded-t dark:border-gray-600">
                        <div className="flex justify-center text-xl lg:text-2xl items-center font-semibold dark:text-white">
                            <img src={blockIcon} height="50px" width="50px"/>
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
