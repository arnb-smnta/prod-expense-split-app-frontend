import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="grid grid-cols-9">
      <div className="col-span-7 p-8">
        <div className="bg-blue-200 rounded-2xl p-4 flex ">
          <div className="grid grid-rows-12">
            <h1 className="text-2xl mb-8 text-blue-800 font-bold row-span-3">
              Hello there ,Welcome back !
            </h1>

            <h2 className="text-blue-700 row-span-6">
              Keep track of shared expenses and settle your corresponding
              balances in a convinient and personalised way.
            </h2>

            <Link to="/dashboard/groups" className="row-span-3">
              {" "}
              <Button className="row-span-3 rounded-md bg-blue-800 text-white text-xl w-[50%] ">
                View Groups
              </Button>
            </Link>
          </div>
          <div>
            <img src="/src/assets/dashboard-card.png" alt="" />
          </div>
        </div>
      </div>
      <div className="col-span-2">side 2</div>
    </div>
  );
};

export default Main;
