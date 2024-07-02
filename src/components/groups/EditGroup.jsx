import { viewExpenseGroupDetails } from "@/api";
import { requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "../ui/use-toast";

const EditGroup = () => {
  const { id } = useParams();
  const [groupDetails, setgroupDetails] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const getGroupDetails = () => {
    requestHandler(
      async () => await viewExpenseGroupDetails(id),
      setisLoading,
      (res) => {
        setgroupDetails(res.data.Group[0]);
      },
      toast
    );
  };

  useEffect(() => {
    getGroupDetails();
  }, []);
  if (isLoading) {
    return <div>Loading</div>;
  }

  return <div>EditGroup</div>;
};

export default EditGroup;
