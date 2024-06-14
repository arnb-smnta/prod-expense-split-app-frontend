import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      {" "}
      <div className="lds-hourglass"></div>
    </div>
  );
};

export default Loader;
