import { Button } from "@/components/ui/button";
import React from "react";

const SettlementCard = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-2 shadow-2xl mt-4 mx-8 p-4 w-[450px] rounded-xl border bg-yellow-200">
      <div className="flex justify-center items-center">
        <img
          src={`${data[0].settleFrom.avatar.url}`}
          alt=""
          className="rounded-full h-24 w-24"
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="flex flex-wrap ">
          <h1 className="font-bold">{data[0].settleFrom.username}</h1>
          {"  "} to{"  "}
          <h1 className="font-bold"> {data[1].settleTo.username}</h1>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="text-red-600 font-bold">
          <h1>Settlement Amount</h1> <h1> Rs {data[2].value}</h1>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button className="bg-transparent font-bold text-blue-600 hover:bg-slate-200">
          Settle
        </Button>
      </div>
    </div>
  );
};

export default SettlementCard;
