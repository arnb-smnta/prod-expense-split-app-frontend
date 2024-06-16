import { LocalStorage, menuItems } from "@/lib/helpers";
import React, { useState } from "react";
import { MenuItem } from "./MenuItem";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const name = LocalStorage.get("user");
  const [clickedIcon, setclickedIcon] = useState(menuItems[0].key);
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
        <div>
          {" "}
          {menuItems.map((item) => {
            return (
              <MenuItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                link={item.link}
                isActive={clickedIcon == item.key}
                onClick={() => setclickedIcon(item.key)}
              />
            );
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
