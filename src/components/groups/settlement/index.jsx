import { getGroupBalanceSheet } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SettlementCard from "./SettlementCard";

const Settlement = () => {
  const { id } = useParams();
  const [GroupBalanceSheet, setGroupBalanceSheet] = useState([]);

  const [isLoading, setisLoading] = useState(true);
  const fetchUserBalance = () => {
    requestHandler(
      async () => {
        return await getGroupBalanceSheet(id);
      },
      setisLoading,
      (res) => {
        const data = res.data.payload.filter((item) => item.value != 0);
        setGroupBalanceSheet(data);
      },
      toast
    );
  };

  console.log(GroupBalanceSheet);
  useEffect(() => {
    fetchUserBalance();
  }, []);
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (GroupBalanceSheet.length < 1) {
    return <div>No balances to show</div>;
  }
  return (
    <div className="flex flex-wrap">
      {GroupBalanceSheet.map((balances, index) => (
        <SettlementCard key={index} data={balances} />
      ))}
    </div>
  );
};

export default Settlement;
