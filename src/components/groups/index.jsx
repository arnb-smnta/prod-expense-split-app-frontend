import { getUserExpenseGroups } from "@/api";
import { requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import GroupCard from "./GroupCard";
import { Link } from "react-router-dom";
import { MdGroupAdd } from "react-icons/md";

const Groups = () => {
  const [groupList, setgroupList] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const getUserGroups = async () => {
    requestHandler(
      async () => await getUserExpenseGroups(),
      setisLoading,
      (res) => {
        setgroupList(res.data.groups);
      },
      toast
    );
  };

  useEffect(() => {
    getUserGroups();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="mt-32 flex flex-wrap">
      <Link to="/dashboard/createGroup">
        <div className="w-[540px] flex  h-48 m-6 shadow-2xl rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 items-center justify-center">
          <div className="text-center">
            <MdGroupAdd color="white" className="h-12 w-12" />
            <h1 className="font-bold text-white text-2xl">
              Create a new group
            </h1>
          </div>
        </div>
      </Link>

      {groupList.map((group) => (
        <GroupCard key={group._id} group={group} />
      ))}
    </div>
  );
};

export default Groups;
