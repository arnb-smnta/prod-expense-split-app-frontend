import { LocalStorage } from "@/lib/helpers";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { MdOutlineDelete } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcCancel } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (name) => (e) => {
    e.preventDefault();
    setPasswordData({ ...passwordData, [name]: e.target.value });
  };
  const [editProfile, setEditProfile] = useState(false);
  const [changePasswordClicked, setChangePasswordClicked] = useState(false);
  const name = LocalStorage.get("user");
  const handleEditUser = () => {
    //await Edit Profile
    //!handle edit profile
    setEditProfile(false);
  };
  const handleDeleteUser = () => {
    //! Handle delete user
  };
  const handlePasswordUpdate = () => {
    //!handle password change backend
    console.log(passwordData);
  };

  const handleDataChange = (name) => (e) => {
    e.preventDefault();
    setUserData({ ...userData, [name]: e.target.value });
  };
  function ProfileForm({ className }) {
    return (
      <div className={`${className}`}>
        <div className="flex justify-between">
          <Button
            className="w-[50%] mr-2 bg-transparent text-red-600 border border-red-600 hover:bg-red-100"
            type="submit"
            onClick={handleDeleteUser}
          >
            <MdOutlineDelete />
            Delete
          </Button>
          <Button
            onClick={() => setOpen(false)}
            type="submit"
            className="w-[50%] bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-100"
          >
            <MdCancel />
            Cancel
          </Button>
        </div>
      </div>
    );
  }
  const [open, setOpen] = useState(false);
  return (
    <div className=" mt-36 grid grid-cols-9">
      <div className="col-span-3 pl-4">
        <h1 className="font-bold text-xl">User Profile</h1>
        <img src={`${name.avatar.url}`} className="rounded-full" alt="" />
      </div>
      {!changePasswordClicked ? (
        <div className="col-span-6 grid grid-row-4 w-[70%]">
          <div className="row-span-1 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              type="email"
              id="email"
              placeholder="Username"
              value={userData.username}
              onChange={handleDataChange("username")}
              disabled={!editProfile}
              className="border hover:border-black"
            />
          </div>
          <div className="row-span-2 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleDataChange("email")}
              disabled={!editProfile}
              className="border hover:border-black"
            />
          </div>
          {!editProfile ? (
            <div className="row-span-1 flex justify-between">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-transparent text-red-600 border border-red-600 hover:bg-red-100">
                    <MdOutlineDelete />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm User Deletion</DialogTitle>
                    <DialogDescription>
                      Are you Sure you want to delete the user Account?
                    </DialogDescription>
                  </DialogHeader>
                  <ProfileForm />
                </DialogContent>
              </Dialog>

              <Button
                className="bg-transparent text-yellow-500 border border-yellow-500 hover:bg-yellow-100"
                onClick={() => setChangePasswordClicked(true)}
              >
                <FaLock />
                change password
              </Button>
              <Button
                className="bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-100"
                onClick={() => setEditProfile(true)}
              >
                <MdModeEdit />
                Edit Details
              </Button>
            </div>
          ) : (
            <div className="row-span-1">
              <Button
                className="bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-100"
                onClick={handleEditUser}
              >
                <MdModeEdit />
                Save Details
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="col-span-6 grid grid-rows-4 w-[70%]">
          <Input
            type="password"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange("oldPassword")}
            className="border row-span-1  hover:border-black"
          />
          <Input
            type="password"
            id="new Password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange("newPassword")}
            className="border row-span-1  hover:border-black"
          />
          <Input
            type="password"
            id="confirm Password"
            placeholder="confirm Password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange("confirmPassword")}
            className="border row-span-1  hover:border-black"
          />
          <div className="row-span-1  flex justify-between">
            <Button
              className="bg-transparent text-red-600 border border-red-600 hover:bg-red-100 w-[50%] mr-2"
              onClick={() => setChangePasswordClicked(false)}
            >
              <FcCancel />
              Cancel
            </Button>
            <Button
              className="bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-100 w-[50%]"
              onClick={handlePasswordUpdate}
            >
              <TiTick />
              Update
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
