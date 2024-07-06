import { LocalStorage, updateGroupSplit } from "@/lib/helpers";
import React from "react";
import { Link } from "react-router-dom";

const GroupCard = ({ group }) => {
  const colors = {
    1: ["bg-blue-400", "text-blue-700"],
    2: ["bg-red-400", "text-red-700"],
    3: ["bg-yellow-500", "text-yellow-700"],
  };
  const user = LocalStorage.get("user");

  //!Update what is owed or settled or not settled
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  const [bgColor, textColor] = colors[randomNumber];

  return (
    <Link to={`/dashboard/groups/view/${group._id}`}>
      <div className="w-[540px] grid grid-rows-2  h-96 m-6 shadow-xl rounded-2xl bg-white">
        <div className={`row-span-1 ${bgColor} p-4 rounded-2xl`}>
          <h1 className={`font-bold text-2xl ${textColor}`}>{group.name}</h1>
          <h2 className="text-blue-700 font-semibold mt-2">
            {group.description}
          </h2>
        </div>
        <div className="row-span-1 flex justify-between p-4 rounded-xl">
          <div className="">
            <div className="flex my-2">
              <h1
                className={`${
                  group.split[user._id] === 0
                    ? "text-green-800 bg-green-400"
                    : "text-red-800 bg-red-400"
                } mr-2 font-bold rounded-2xl p-2 text-center`}
              >
                {group.split[user._id] === 0 ? "Settled" : "not settled"}
              </h1>{" "}
              <h1
                className={`${
                  group.split[user._id] > -1
                    ? "text-green-800 bg-green-400"
                    : "text-red-800 bg-red-400"
                } mr-2 font-bold rounded-2xl p-2 text-center`}
              >
                {group.split[user._id] > 0
                  ? "You are owed"
                  : group.split[user._id] === 0
                  ? "No dues to settle"
                  : "You owe "}

                {group.split[user._id] === 0
                  ? ""
                  : `:₹ ${group.split[user._id]}`}
              </h1>
            </div>
            <h2 className="flex">
              Category{" "}
              <h1 className="ml-2 bg-yellow-300 text-yellow-900 font-semibold text-center rounded-xl p-1">
                {group.groupCategory}
              </h1>
            </h2>
          </div>

          <div className="flex flex-wrap">
            {group.participants.map((user) => (
              <img
                key={user._id}
                src={user.avatar.url}
                className="w-12 h-12 rounded-full mx-1"
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
