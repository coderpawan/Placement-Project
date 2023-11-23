import React from "react";
// import { Circles } from "react-loader-spinner";
import "./Preloader.css";

const Loading = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-card-image"></div>
      <div className="flex text-left justify-end mt-4">
        <div className="feature realtive right-12"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loading;
