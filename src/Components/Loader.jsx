import React from "react";
import "./css/Loader.css";

const Loader = () => {
  return (
    <div className="absolute top-1/2 flex items-center justify-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-filter backdrop-blur-sm   w-full h-full">
      <div className="loader">
        <span className="loader-text">Loading</span>
        <span className="load"></span>
      </div>
    </div>
  );
};

export default Loader;
