import React from "react";
import "./loader.css";

const HypnoticLoader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="center-circle"></div>
      </div>
    </div>
  );
};

export default HypnoticLoader;