import { LocalStorage } from "@/lib/helpers";
import React from "react";

const Profile = () => {
  const name = LocalStorage.get("user");
  console.log(name);
  return (
    <div className="border border-black mt-36">
      <h1>User Profile</h1>

      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Profile;
