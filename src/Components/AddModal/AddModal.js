import React from "react";
import { createPortal } from "react-dom";

export default function AddModal(props) {
  return createPortal(
    <div className=" z-50 fixed overflow-x-hidden h-modal top-4 left-0 right-0 md:inset-0 overflow-y-auto flex justify-end bg-modalbackColor">

      <div className= "relative w-6/12">
        <div className="bg-white rounded-lg overflow-y-auto shadow relative dark:bg-gray-700">
          <div className="items-start  justify-between p-3 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl lg:text-2xl font-semibold dark:text-white text-center">
              {props.tittle}
            </h3>
            {props?.isCrossIcon && (
              <button
                onClick={() => props.hide()}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white float-right -mt-7"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            )}
          </div>
          <div className="p-6 space-y-6 modal_hi">{props.children}</div>
        </div>
      </div>
    </div>,
    
    document.getElementById("root")
    
  );
}
