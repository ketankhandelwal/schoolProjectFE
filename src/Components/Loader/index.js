import React from "react";
import {ThreeDots} from "react-loader-spinner";
import "./loader.css";
const LoadingSpinner = () => {
  return (
    <>
      <ThreeDots
        className="loader"
        type="Puff"
        color="#50C878"
        height={60}
        width={60}
        // 6EE7B7
      />
    </>
  );
};

export default LoadingSpinner;
