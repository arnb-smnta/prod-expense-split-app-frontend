import { deleteExpenseGroup, viewExpenseGroupDetails } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { LocalStorage, requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdAddBox } from "react-icons/md";
import { MdAirplanemodeActive } from "react-icons/md";
import { GiOfficeChair } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { FcSportsMode } from "react-icons/fc";
import { LiaStickyNoteSolid } from "react-icons/lia";
import { CgNotes } from "react-icons/cg";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import GroupExpenses from "./GroupExpenses";
import { cn } from "@/lib/utils";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import MyBalance from "./MyBalance";
import Settlement from "../settlement";

const ViewGroup = () => {
  const user = LocalStorage.get("user");
  const [isActive, setisActive] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [userValue, setUserValue] = useState();
  const icons = {
    Home: IoHome,
    Trip: MdAirplanemodeActive,
    Sports: FcSportsMode,
    Others: LiaStickyNoteSolid,
    Office: GiOfficeChair,
  };
  const renderContent = () => {
    switch (isActive) {
      case 1:
        return <GroupExpenses id={id} />;
      case 2:
        return <Settlement />;
      case 3:
        return <MyBalance />;
      default:
        return null;
    }
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const handledeleteGroup = async (e) => {
    e.preventDefault();

    requestHandler(
      async () => await deleteExpenseGroup(groupDetails._id),
      null,
      (res) => {
        navigate("/dashboard/groups");
      },
      toast
    );
  };

  const [groupDetails, setgroupDetails] = useState("");
  function ProfileForm({ className }) {
    return (
      <form className={cn("grid items-start gap-4", className)}>
        <Button
          className="bg-red-600"
          type="submit"
          onClick={handledeleteGroup}
        >
          Delete Group
        </Button>
      </form>
    );
  }

  const getGroupDetails = async () => {
    requestHandler(
      async () => await viewExpenseGroupDetails(id),
      setisLoading,
      (res) => {
        setgroupDetails(res.data.Group[0]);
      },
      toast
    );
  };
  useEffect(() => {
    if (groupDetails && groupDetails.split) {
      setUserValue(groupDetails.split[user._id]);
    }
  }, [groupDetails]); // Run only when groupDetails or user._id changes

  console.log(userValue);
  const getCategoryIcon = (category) => {
    const IconComponent = icons[category];
    return <IconComponent className="ml-1" />;
  };
  useEffect(() => {
    getGroupDetails();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className=" bg-white mx-4 mt-8">
      <div className=" bg-blue-200 grid grid-rows-4 rounded-2xl px-2 py-4">
        <div className="flex justify-between row-span-1">
          <h1 className="font-bold text-2xl text-blue-800">
            {groupDetails.name}
          </h1>
          {user._id === groupDetails.groupOwner[0]._id ? (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="destructive">Delete group</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Delete Group</DrawerTitle>
                  <DrawerDescription>
                    Are you sure You want to Delete this group and its content ?
                  </DrawerDescription>
                </DrawerHeader>
                <ProfileForm className="px-4" />
                <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : null}
          <Link to={`/dashboard/groups/edit/${groupDetails._id}`}>
            {" "}
            <FaRegEdit color="blue" />
          </Link>
        </div>
        <h2 className="row-span-1 text-blue-700 font-semibold">
          {groupDetails.description}
        </h2>
        <div className="row-span-1 flex">
          <h1 className="text-gray-500">Created by : </h1>
          <h1 className="text-blue-700">
            {groupDetails.groupOwner[0].username}
          </h1>
        </div>
        <div className="row-span-1 flex justify-between">
          <div className="bg-yellow-300 p-2 flex rounded-3xl">
            <h2 className="text-yellow-700 text-semibold">Category :</h2>{" "}
            <h2 className="text-yellow-700 font-semibold flex items-center">
              {groupDetails.groupCategory}
              {getCategoryIcon(groupDetails.groupCategory)}
            </h2>
          </div>
          <Link to={`/dashboard/addExpense/${groupDetails._id}`}>
            <Button className="bg-blue-700 rounded-3xl">
              <MdAddBox /> <h2>Add Expense</h2>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 p-6">
        <div className="bg-blue-500 col-span-1 rounded-xl p-4 grid grid-cols-3 gap-2">
          <div className="bg-blue-700 rounded-full flex justify-center items-center col-span-1">
            <CgNotes color="white" className="h-8 w-8" />
          </div>
          <div className="col-span-2">
            <h1 className="font-bold text-2xl">Total Expense</h1>
            <h1 className="font-bold text-2xl">₹ {groupDetails.groupTotal}</h1>
          </div>
        </div>
        <div className="bg-green-300 col-span-1 rounded-xl p-4 grid grid-cols-3 gap-2">
          <div className="bg-green-700 rounded-full flex justify-center items-center col-span-1">
            <FaRegMoneyBill1 color="white" className="h-8 w-8" />
          </div>
          <div className="col-span-2">
            <h1 className="font-bold text-2xl">You are owed</h1>
            <h1 className="font-bold text-2xl">
              ₹ {userValue > 0 ? userValue : 0}{" "}
            </h1>
          </div>
        </div>
        <div className="bg-red-300 col-span-1 rounded-xl p-4 grid grid-cols-3 gap-2">
          <div className="rounded-full bg-red-700 flex justify-center items-center">
            <FaMoneyBillTransfer color="white" className="h-8 w-8" />
          </div>
          <div>
            <h1 className="font-bold text-2xl">You owe</h1>
            <h1 className="font-bold text-2xl">
              ₹ {userValue < 0 ? userValue * -1 : 0}
            </h1>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-2">
        <div
          className={`text-center col-span-1 border border-r-black rounded-xl p-2 text-xl cursor-pointer ${
            isActive === 1 ? "bg-blue-300 font-bold" : ""
          }`}
          onClick={() => setisActive(1)}
        >
          <h1>Group expense </h1>
        </div>
        <div
          className={`text-center col-span-1 border border-r-black rounded-xl p-2 text-xl cursor-pointer ${
            isActive === 2 ? "bg-blue-300 font-bold" : ""
          }`}
          onClick={() => setisActive(2)}
        >
          <h1>Group Balance </h1>
        </div>
        <div
          className={`text-center col-span-1 text-xl cursor-pointer ${
            isActive === 3 ? "bg-blue-300 font-bold" : ""
          } rounded-xl p-2`}
          onClick={() => setisActive(3)}
        >
          <h1 className="">My Balance</h1>
        </div>
      </div>

      <div>{renderContent()}</div>
    </div>
  );
};

export default ViewGroup;
