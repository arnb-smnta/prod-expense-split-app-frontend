import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvailableExpenseGroupTypes, requestHandler } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { getAvailableUsers } from "@/api";
import { toast } from "@/components/ui/use-toast";
const CreateGroup = () => {
  const [expenseGroupData, setExpenseGroupData] = useState({
    name: "",
    description: "",
    participants: [],
    groupCategory: "",
  });
  const [availableUsers, setavailableUsers] = useState([]);

  const handlegetParticiapants = async () => {
    requestHandler(
      async () => getAvailableUsers(),
      null,
      (req) => {
        setavailableUsers(req.data);
      },
      toast
    );
  };

  const handleGroupDetailsChange = (name) => (e) => {
    if (name === "participants") {
      setExpenseGroupData((prevState) => ({
        ...prevState,
        participants: [...prevState.participants, e.target.value],
      }));
    } else if (name === "groupCategory") {
      setExpenseGroupData({ ...expenseGroupData, [name]: e });
    } else {
      setExpenseGroupData({ ...expenseGroupData, [name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    console.log(expenseGroupData);
  };

  useEffect(() => {
    handlegetParticiapants();
  }, []);
  return (
    <div className="mt-32 border border-black grid grid-rows-8 gap-3 w-[70%]">
      <h1 className="text-2xl font-bold row-span-1">Create new Group</h1>

      <Input
        className="row-span-1"
        placeholder="Enter group name"
        onChange={handleGroupDetailsChange("name")}
      />
      <Input
        className="row-span-2 h-[100%]"
        placeholder="Enter group Description"
        onChange={handleGroupDetailsChange("description")}
      />

      <Select
        onValueChange={handleGroupDetailsChange("groupCategory")}
        className="row-span-1 w-full"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Group Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>GroupCategory</SelectLabel>

            {AvailableExpenseGroupTypes.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        className="row-span-1"
        onValueChange={handleGroupDetailsChange("groupCategory")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Participants" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Participants</SelectLabel>

            {availableUsers.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item.username}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button className="row-span-1 w-[20%]" onClick={handleSubmit}>
        Create Group
      </Button>
    </div>
  );
};

export default CreateGroup;
