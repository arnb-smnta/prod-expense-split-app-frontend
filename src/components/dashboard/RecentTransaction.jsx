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
        console.log(res.data);
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

  return (
    <div className="pr-2">
      {recentTransactions.map((transaction) => (
        <ExpenseCard key={transaction._id} expense={transaction} />
      ))}
    </div>
  );
};

export default RecentTransaction;
