import React from "react";
import { Link } from "react-router-dom";

const GroupCard = ({ group }) => {
  return (
    <Link to={`/dashboard/groups/view/${group._id} `}>
      <div className="w-[540px] grid grid-rows-2  h-48 m-6 shadow-xl rounded-2xl">
        <div className="row-span-1 bg-blue-400 p-4 rounded-2xl">
          <h1 className="font-bold text-2xl">{group.name}</h1>
          <h2>{group.description}</h2>
        </div>
        <div className="row-span-1 flex justify-between p-4">
          <div>
            <h1>Split</h1>
            <h2>Category {group.groupCategory}</h2>
          </div>

          <div className="flex flex-wrap">
            {group.participants.map((user) => (
              <img
                key={user._id}
                src={user.avatar.url}
                className="w-12 h-12 rounded-full"
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
