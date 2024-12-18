import { LocalStorage, menuItems } from "@/lib/helpers";
import React, { useEffect } from "react";
import { MenuItem } from "./MenuItem";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeMenu } from "@/redux/menuSlice";

import { CreditCard, Keyboard, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/useAuthHook";
import Header from "../Header";
const Dashboard = () => {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const currentMenu = useSelector((appStore) => appStore.menu);
  const name = LocalStorage.get("user");
  const location = useLocation();

  //menu items color controller
  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find(
      (item) => `/${item.link}` === currentPath
    )?.key;
    if (!activeMenuItem) {
      dispatch(activeMenu(null));
    } else {
      dispatch(activeMenu(activeMenuItem));
    }
  }, [location, dispatch]);

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="w-full grid grid-cols-12 bg-gray-200 ">
      <div className="col-span-3 border-r border-black border-dotted h-screen px-4 cursor-pointer">
        <Link to="/dashboard/app">
          {" "}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBm8eaubRQZt4JeGqzJEdv4Hsso9I7Qo5oDT4IR6YbouQsmqS8PUbOme0eOZ041miCyyE&usqp=CAU"
            alt=""
            className=" w-full h-48 mb-8 mt-4"
          />
        </Link>
        <Link to="/dashboard/userProfile">
          <div className="bg-blue-100 shadow-xl flex rounded-lg mb-8 cursor-pointer">
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
        </Link>
        <div>
          {" "}
          {menuItems.map((item) => {
            return (
              <MenuItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                link={item.link}
                isActive={currentMenu == item.key}
                onClick={() => dispatch(activeMenu(item.key))}
              />
            );
          })}
        </div>
      </div>
      <div className="col-span-9">
        <div className="mt-8 grid grid-cols-12">
          <div className="col-span-9">
            {" "}
            <Header />
          </div>
          <div className="col-span-3 flex justify-end p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={`https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D`}
                  alt=""
                  className="rounded-full h-12 cursor-pointer "
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <h1>{name.username}</h1>
                  <h2>{name.email}</h2>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dotted-separator" />
                <DropdownMenuGroup>
                  <Link to="/dashboard/userProfile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/dashboard/app">
                    <DropdownMenuItem
                      as={Link}
                      to="/dashboard/app"
                      className="cursor-pointer"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Home</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="dotted-separator" />
                  <DropdownMenuItem onClick={handleLogout}>
                    <Keyboard className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
