import { LocalStorage, menuItems } from "@/lib/helpers";
import React, { useState } from "react";
import { FaDashcube } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
const Dashboard = () => {
  const MenuItem = ({ icon: Icon, label, isActive, onClick }) => {
    return (
      <div
        className="flex w-full border border-black rounded-2xl shadow-xl"
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
    );
  };
  const name = LocalStorage.get("user");
  const [clickedIcon, setclickedIcon] = useState("dashboard");
  return (
    <div className="w-full grid grid-cols-12 ">
      <div className="col-span-3 border-r border-black border-dotted h-screen px-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBm8eaubRQZt4JeGqzJEdv4Hsso9I7Qo5oDT4IR6YbouQsmqS8PUbOme0eOZ041miCyyE&usqp=CAU"
          alt=""
          className=" w-full h-48 mb-8 mt-4"
        />
        <div className="bg-blue-100 shadow-xl flex rounded-lg mb-8">
          <div className="p-4">
            <img
              src={`${name.avatar.url}`}
              alt="propic"
              className="rounded-full h-12 "
            />
          </div>
          <div className="ml-4 py-4">
            <h1 className="font-bold">{name.username}</h1>
            <h1>{name.email}</h1>
          </div>
        </div>
        {menuItems.map((item) => {
          <MenuItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            onClick={() => setclickedIcon(item.key)}
          />;
        })}
      </div>
      <div className="col-span-6">middle</div>
      <div className="col-span-3">side 2</div>
    </div>
  );
};

export default Dashboard;
