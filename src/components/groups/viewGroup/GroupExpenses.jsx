import { viewExpensesInAGroup } from "@/api";
import ExpenseCard from "@/components/expense/ExpenseCard";
import { toast } from "@/components/ui/use-toast";
import { requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";

const GroupExpenses = ({ id }) => {
  const [expenseList, setExpenseList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const getExpenseList = async () => {
    await requestHandler(
      async () => await viewExpensesInAGroup(id),
      setisLoading,
      (res) => {
        console.log(res.data);
        setExpenseList(res.data.payload.expenses);
      },
      toast
    );
  };

  useEffect(() => {
    getExpenseList();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="bg-white p-4 flex mt-8">
      <div className="w-1/2">
        {expenseList.length > 0 ? (
          expenseList.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} />
          ))
        ) : (
          <div> No expenses to show</div>
        )}
      </div>
      <div>Expense chart</div>
    </div>
  );
};

export default GroupExpenses;
