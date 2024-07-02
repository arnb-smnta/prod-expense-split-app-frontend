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
import { createANewGroup, getAvailableUsers } from "@/api";
import { toast } from "@/components/ui/use-toast";
import MultiSelect from "./Multiselect";
import { useNavigate } from "react-router-dom";
const CreateGroup = () => {
  const navigate = useNavigate();
  const [expenseGroupData, setExpenseGroupData] = useState({
    name: "",
    description: "",
    participants: [],
    groupCategory: "",
  });
  const [availableUsers, setavailableUsers] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [participantsList, setparticipantsList] = useState([]);
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
  const handleDisabledButtonClick = () => {
    if (isCreateButtonDisabled()) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description:
          "Please fill out all the required fields before creating a group.",
        status: "warning",
      });
    }
  };

  const handleSubmit = () => {
    expenseGroupData.participants = selectedParticipants;
    requestHandler(
      async () => await createANewGroup(expenseGroupData),
      null,
      (res) => {
        navigate("/dashboard/app");
      },
      toast
    );
  };
  const isCreateButtonDisabled = () => {
    return (
      expenseGroupData.name === "" ||
      expenseGroupData.description === "" ||
      expenseGroupData.groupCategory === "" ||
      selectedParticipants.length < 1
    );
  };
  useEffect(() => {
    const mappedParticiapants = availableUsers.map((user) => ({
      value: user._id,
      label: user.email,
      icon: undefined,
    }));

    setparticipantsList(mappedParticiapants);
  }, [availableUsers]);
  useEffect(() => {
    handlegetParticiapants();
  }, []);
  return (
    <div className="mt-32 grid grid-rows-6  w-[70%] max-h-screen pl-4 bg-white mx-auto rounded-2xl py-4 px-8 mb-8">
      <h1 className="text-2xl font-bold row-span-1">Create new Group</h1>
      <Input
        className="row-span-1"
        placeholder="Enter group name"
        onChange={handleGroupDetailsChange("name")}
      />
      <Input
        className="row-span-1 h-[100%]"
        placeholder="Enter group Description"
        onChange={handleGroupDetailsChange("description")}
      />
      <div>
        <h1 className="text-2xl font-bold mb-4 row-span-1">Group Category</h1>
        <Select
          onValueChange={handleGroupDetailsChange("groupCategory")}
          className=" w-full"
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
      </div>
      <div className=" max-w-xl row-span-2">
        <h1 className="text-2xl font-bold mb-4">Group Participants</h1>
        <MultiSelect
          options={participantsList}
          onValueChange={setSelectedParticipants}
          defaultValue={selectedParticipants}
          placeholder="Select Participants"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      </div>
      {/*  <Select
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
*/}
      <div className="row-span-1 flex items-end justify-end">
        <div className="relative w-[20%]">
          <Button
            className={`cursor-pointer bg-blue-600 font-bold ${
              isCreateButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isCreateButtonDisabled()}
          >
            Create Group
          </Button>
          {isCreateButtonDisabled() && (
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-transparent"
              onClick={handleDisabledButtonClick}
            />
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default CreateGroup;
