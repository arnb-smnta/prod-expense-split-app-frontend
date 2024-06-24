import { format } from "date-fns";
import React from "react";

const ExpenseCard = ({ expense }) => {
  const formatDate = (isoDate) => {
    return format(new Date(isoDate), "do MMMM yyyy");
  };

  return (
    <div className="bg-white shadow-2xl grid grid-cols-4 gap-2 my-2 rounded-xl p-4">
      <div className="bg-yellow-200 rounded-full col-span-1 flex justify-center items-center">
        <h1 className="text-2xl text-yellow-900 text-center">
          {formatDate(expense.expenseDate)}
        </h1>
      </div>

      <div className="col-span-2 grid-rows-4">
        <div className="text-2xl text-blue-700 row-span-1">
          <h1>{expense.name}</h1>
        </div>
        <div className="row-span-1">
          <h2 className="text-xl text-blue-700">Total ₹{expense.amount}</h2>
        </div>
        <div>
          <div className="row-span-1">
            <h1 className="">Paid by</h1>
          </div>
          <div className="row-span-1">
            <h2 className="">{expense.owner[0].username}</h2>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div>
          <h1 className="text-xl text-red-600">Per Person</h1>
        </div>
        <div className="">
          <h1 className="text-2xl text-red-600 ">
            ₹ {expense.expensePerMember.toFixed(2)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
