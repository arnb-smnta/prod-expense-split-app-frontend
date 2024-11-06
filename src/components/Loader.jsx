import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      {" "}
      <div className="lds-hourglass"></div>
    </div>
  );
};

export default Loader;
