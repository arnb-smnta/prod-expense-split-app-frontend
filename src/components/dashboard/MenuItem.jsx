import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const MenuItem = ({ icon: Icon, label, isActive, onClick, link }) => {
  return (
    <Link to={`/${link}`}>
      <div
        className={`flex w-full ${
          isActive ? "bg-gray-200" : ""
        } rounded-2xl shadow-xl mb-4 cursor-pointer`}
        onClick={onClick}
      >
        <Icon className={`h-12 w-8 ${isActive ? "text-blue-500" : ""}`} />
        <h1
          className={`text-xl ml-8 pt-2 font-bold ${
            isActive ? "text-blue-800" : ""
          }`}
        >
          {label}
        </h1>
      </div>
    </Link>
  );
};
MenuItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  link: PropTypes.func.isRequired,
};
