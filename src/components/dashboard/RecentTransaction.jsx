import { requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { viewUserRecentExpenses } from "@/api";
import ExpenseCard from "../expense/ExpenseCard";

const RecentTransaction = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const getRecentTransactions = async () => {
    requestHandler(
      async () => await viewUserRecentExpenses(),
      setisLoading,
      (res) => {
        setRecentTransactions(res.data.payload);
      },
      toast
    );
  };

  useEffect(() => {
    getRecentTransactions();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const handleDelete = (deleteId) => {
    setRecentTransactions(
      recentTransactions.filter((expense) => expense._id !== deleteId)
    );
  };

  return (
    <div className="pr-2">
      {recentTransactions.slice(0, 5).map((transaction) => (
        <ExpenseCard
          key={transaction._id}
          expense={transaction}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default RecentTransaction;
