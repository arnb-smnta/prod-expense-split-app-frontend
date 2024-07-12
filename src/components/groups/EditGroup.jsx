import { editExpenseGroup, viewExpenseGroupDetails } from "@/api";
import { AvailableExpenseGroupTypes, requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

const EditGroup = () => {
  const navigate = useNavigate();
  const [groupDetails, setGroupDetails] = useState({
    _id: "",
    name: "",
    description: "",
    groupCategory: "",
  });
  const { id } = useParams();
  const getGroupDetails = async () => {
    requestHandler(
      async () => await viewExpenseGroupDetails(id),
      null,
      (res) => {
        const { name, description, groupCategory } = res.data.Group[0];
        setGroupDetails({
          name: name,
          description: description,
          groupCategory: groupCategory,
        });
      },
      toast
    );
  };
  const handleDataChange = (name) => (e) => {
    if (name === "groupCategory") {
      setGroupDetails({ ...groupDetails, [name]: e });
    } else {
      setGroupDetails({ ...groupDetails, [name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    requestHandler(
      async () => await editExpenseGroup(groupDetails, id),
      null,
      () => {
        navigate(`/dashboard/groups/view/${id}`);
      }
    );
  };
  useEffect(() => {
    getGroupDetails();
  }, []);

  return (
    <div className="bg-white py-4 px-8 mt-28 mx-auto w-[70%] rounded-2xl">
      <div>
        <h1 className="font-bold text-2xl mb-4">Group name</h1>

        <Input value={groupDetails.name} onChange={handleDataChange("name")} />
      </div>

      <div className="mt-2 text-2xl font-bold">
        <h1>Group Description</h1>

        <Input
          className="mt-2"
          value={groupDetails.description}
          onChange={handleDataChange("description")}
        />
      </div>

      <div className="my-4">
        <Select
          onValueChange={handleDataChange("groupCategory")}
          value={groupDetails.groupCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Group Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{groupDetails.groupCategory}</SelectLabel>

              {AvailableExpenseGroupTypes.map((item, index) => (
                <SelectItem key={index} value={`${item}`}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between">
        <Link to={`/dashboard/grops/view/${id}`}>
          {" "}
          <Button variant="destructive">Cancel</Button>
        </Link>
        <Button className="bg-blue-600" onClick={handleSubmit}>
          Edit Group Details
        </Button>
      </div>
    </div>
  );
};

export default EditGroup;
