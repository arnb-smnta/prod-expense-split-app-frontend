import {
  editExpenseGroup,
  getAvailableUsers,
  viewExpenseGroupDetails,
} from "@/api";
import { AvailableExpenseGroupTypes, requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { Button } from "@/components/ui/button";
import MultiSelect from "./createGroup/Multiselect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const EditExpense = () => {
  //!Backend bug owner is not fetched in get users need to change participants and owner
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    description: "",
    participants: [],
    groupCategory: "",
  });
  const { id } = useParams();
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);
  const navigate = useNavigate();

  const getGroupDetails = () => {
    requestHandler(
      async () => await viewExpenseGroupDetails(id),
      null,
      (res) => {
        const { name, description, participants, groupCategory } =
          res.data.Group[0];
        setGroupDetails({
          name,
          description,
          participants: participants.map((p) => p._id), // Map participants to their ids
          groupCategory,
        });
        setSelectedParticipants(participants.map((p) => p._id));
      },
      toast
    );
  };

  const handleGetParticipants = async () => {
    requestHandler(
      async () => getAvailableUsers(),
      null,
      (req) => {
        setAvailableUsers(req.data);
      },
      toast
    );
  };

  const handleGroupDetailsChange = (name) => (e) => {
    if (name === "groupCategory") {
      setGroupDetails({ ...groupDetails, [name]: e });
    } else {
      setGroupDetails({ ...groupDetails, [name]: e.target.value });
    }
  };

  const isCreateButtonDisabled = () => {
    return (
      groupDetails.name === "" ||
      groupDetails.description === "" ||
      groupDetails.groupCategory === "" ||
      selectedParticipants.length < 1
    );
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
    const updatedGroupDetails = {
      ...groupDetails,
      participants: selectedParticipants,
    };

    requestHandler(
      async () => await editExpenseGroup(id, updatedGroupDetails),
      null,
      (res) => {
        navigate(`/dashboard/groups/${id}`);
      },
      toast
    );
  };

  useEffect(() => {
    const mappedParticipants = availableUsers.map((user) => ({
      value: user._id,
      label: user.email,
    }));
    setParticipantsList(mappedParticipants);
  }, [availableUsers]);

  useEffect(() => {
    handleGetParticipants();
    getGroupDetails();
  }, []);

  return (
    <div className="mt-32 grid grid-rows-6 w-[70%] max-h-screen pl-4 bg-white mx-auto rounded-2xl py-4 px-8 mb-8">
      <h1 className="text-2xl font-bold row-span-1">Edit Group Details</h1>
      <Input
        className="row-span-1"
        placeholder="Enter group name"
        onChange={handleGroupDetailsChange("name")}
        value={groupDetails.name}
      />
      <Input
        className="row-span-1 h-[100%]"
        placeholder="Enter group description"
        onChange={handleGroupDetailsChange("description")}
        value={groupDetails.description}
      />
      <div>
        <h1 className="text-2xl font-bold mb-4 row-span-1">Group Category</h1>
        <Select
          onValueChange={handleGroupDetailsChange("groupCategory")}
          className="w-full"
          value={groupDetails.groupCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Group Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group Category</SelectLabel>
              {AvailableExpenseGroupTypes.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="max-w-xl row-span-2">
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
      <div className="row-span-1 flex items-end justify-end">
        <div className="relative w-[20%]">
          <Button
            className={`cursor-pointer bg-blue-600 font-bold ${
              isCreateButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isCreateButtonDisabled()}
          >
            Edit Group
          </Button>
          {isCreateButtonDisabled() && (
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-transparent"
              onClick={handleDisabledButtonClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
