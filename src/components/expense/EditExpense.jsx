import { editexpense, viewExpense, viewExpenseGroupDetails } from "@/api";
import {
  AvailableExpenseTypes,
  AvailablePaymentMethods,
  requestHandler,
} from "@/lib/helpers";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import MultiSelect from "../groups/createGroup/Multiselect";

const EditExpense = () => {
  const { id } = useParams();
  const [expenseMembersList, setexpenseMembersList] = useState([]);
  const [date, setDate] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [participantList, setparticipantsList] = useState([]);
  const [expenseMembers, setExpenseMembers] = useState([]);
  const [expense, setExpense] = useState({
    name: "",
    description: "",
    amount: "",
    category: "",
    expenseDate: "",
    participants: [],
    expenseMethod: "",
    owner: "",
    groupId: "",
  });
  const navigate = useNavigate();
  const getExpenseDetails = () => {
    requestHandler(
      async () => await viewExpense(id),
      null,
      (res) => {
        const {
          name,
          description,
          amount,
          category,
          expenseDate,
          participants,
          expenseMethod,
          owner,
          groupId,
        } = res.data.payload;

        setExpense({
          name,
          description,
          amount,
          category,
          expenseDate,
          participants,
          expenseMethod,
          owner: owner[0],
          groupId: groupId[0],
        });
        setDate(parseISO(expenseDate)); // Set initial date
        setExpenseMembers(participants.map((participant) => participant._id)); // Set initial participants
      },
      toast
    );
  };

  const getGroupDetails = async () => {
    requestHandler(
      async () => await viewExpenseGroupDetails(expense.groupId._id),
      null,
      (res) => {
        setparticipantsList(res.data.Group[0].participants);
      },
      toast
    );
  };

  const handleOnchange = (name) => (e) => {
    if (name === "owner" || name === "category" || name === "expenseMethod") {
      setExpense({ ...expense, [name]: e });
    } else {
      setExpense({ ...expense, [name]: e.target.value });
    }
  };

  useEffect(() => {
    getExpenseDetails();
  }, []);

  useEffect(() => {
    if (expense.groupId) {
      getGroupDetails();
    }
  }, [expense]);

  useEffect(() => {
    if (participantList.length > 0) {
      const mappedParticipants = participantList.map((user) => ({
        value: user._id,
        label: user.email,
        icon: undefined,
      }));
      setexpenseMembersList(mappedParticipants);
    }
  }, [participantList]);
  console.log(expense);
  const handleOnEdit = (e) => {
    console.log(expense);
    console.log(expenseMembers);
    console.log(date);
    const dateISO = new Date(date);
    const isoString = dateISO.toISOString();
    expense.participants = expenseMembers;
    expense.expenseDate = isoString;
    console.log(expense);

    requestHandler(
      async () => await editexpense(id, expense),
      null,
      (res) => {
        navigate(`/dashboard/groups/view/${expense.groupId}`);
      }
    );
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white w-[50%] p-6 mt-8 rounded-2xl">
        <h1 className="font-bold text-2xl ">Edit Expense</h1>
        <div className="mt-2">
          <h1 className="font-bold text-xl mb-1">Expense Name</h1>
          <Input
            placeholder="Expense Name"
            value={expense.name}
            onChange={handleOnchange("name")}
          />
        </div>

        <div className="my-2">
          <h1 className="font-bold text-xl">Expense Description</h1>
          <Input
            placeholder="Expense Description"
            value={expense.description}
            onChange={handleOnchange("description")}
          />
        </div>

        <div className="flex justify-between my-2">
          <div>
            <h1 className="font-bold text-xl">Expense Owner</h1>
          </div>
          <div>
            <Select
              value={expense.owner._id}
              onValueChange={handleOnchange("owner")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Expense Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Expense Owner</SelectLabel>
                  {participantList.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.username}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between my-2">
          <div>
            <h1 className="font-bold text-xl">Expense Category</h1>
          </div>
          <div>
            <Select
              value={expense.category}
              onValueChange={handleOnchange("category")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Expense Category</SelectLabel>
                  {AvailableExpenseTypes.map((Type, index) => (
                    <SelectItem key={index} value={Type}>
                      {Type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between my-2">
          <div>
            <h1 className="font-bold text-xl">Payment Type</h1>
          </div>
          <div>
            <Select
              value={expense.expenseMethod}
              onValueChange={handleOnchange("expenseMethod")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment type</SelectLabel>
                  {AvailablePaymentMethods.map((Type, index) => (
                    <SelectItem key={index} value={Type}>
                      {Type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="date-picker flex justify-between my-2">
          <div>
            <h1 className="font-bold text-xl">Expense Date</h1>
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setExpense({ ...expense, expenseDate: newDate });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="expense-participants my-2">
          <h1 className="text-2xl font-bold mb-4">Group Participants</h1>
          <MultiSelect
            options={expenseMembersList}
            onValueChange={setExpenseMembers}
            defaultValue={expenseMembers}
            placeholder="Select ExpenseMembers"
            variant="inverted"
            animation={2}
            maxCount={3}
          />
        </div>

        <div className="flex justify-between">
          <Link to={`/dashboard/groups/view/${expense.groupId._id}`}>
            <Button variant="destructive">Cancel</Button>
          </Link>

          <Button className="bg-blue-700 text-white" onClick={handleOnEdit}>
            Edit Expense
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
