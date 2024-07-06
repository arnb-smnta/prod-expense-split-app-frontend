import { viewExpense } from "@/api";
import { requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "../ui/use-toast";
import Loader from "../ui/Loader";
import { Button } from "../ui/button";

const ViewExpense = () => {
  const { id } = useParams();
  const [expenseDetails, setExpenseDetails] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const getExpenseDetails = async () => {
    requestHandler(
      async () => await viewExpense(id),
      setisLoading,
      (res) => {
        setExpenseDetails(res.data.payload);
      },
      toast
    );
  };

  useEffect(() => {
    getExpenseDetails();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white mx-auto w-[70%] rounded-2xl shadow-2xl mt-10">
      <div className="bg-yellow-300 border border-b-2 p-8">
        <div>
          <h1 className="font-bold text-2xl text-blue-500">Expense Name</h1>
          <h1 className="font-bold text-xl">{expenseDetails.name}</h1>
        </div>
        <div>
          <h2 className="font-bold text-2xl text-orange-500">
            Expense Description
          </h2>
          <h2 className="font-bold text-xl">{expenseDetails.description}</h2>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between mb-4">
          <div className="flex">
            <h1 className="mr-2">Total expense Amount :</h1>
            <h2>₹ {expenseDetails.amount}</h2>
          </div>

          <div className="flex ">
            <h1 className="font-bold text-xl mr-2">Date :</h1>
            <h1>{expenseDetails.createdAt}</h1>
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="flex">
            <h2 className="mr-2 font-bold">Payment Method :</h2>
            <h2 className="font-bold">₹ {expenseDetails.expenseMethod}</h2>
          </div>

          <div className="flex">
            <h2 className="font-bold mr-2">Expense Per Member :</h2>
            <h2 className="font-bold">₹ {expenseDetails.expensePerMember}</h2>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="font-bold">Expense Participants :</h2>

          {expenseDetails.participants.map((user) => (
            <h2 key={user._id}>{user.username}</h2>
          ))}
        </div>
        <div className="flex">
          <h2 className="mr-2 font-bold text-xl">Expense Made by :</h2>

          <h2 className="font-bold text-xl">
            {expenseDetails.owner[0].username}
          </h2>
        </div>
      </div>
      <div className="mb-4 flex justify-end items-end p-4">
        <div>
          <Link to={`/dashboard/groups/view/${expenseDetails.groupId[0]._id}`}>
            <Button variant="destructive">Cancel</Button>
          </Link>
          <Link to={`/dashboard/editExpense/${expenseDetails._id}`}>
            {" "}
            <Button className="bg-blue-600 mb-4">EDIT Expense</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewExpense;
