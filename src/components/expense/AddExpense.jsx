import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AvailableExpenseTypes,
  AvailablePaymentMethods,
  requestHandler,
} from "@/lib/helpers";
import { addExpense, viewExpenseGroupDetails } from "@/api";
import { toast } from "../ui/use-toast";
import MultiSelect from "../groups/createGroup/Multiselect";
const AddExpense = () => {
  const navigate = useNavigate();
  const [groupDetails, setgroupDetails] = useState("");
  const [Loading, setisLoading] = useState(true);
  const [expense, setExpense] = useState({
    name: "",
    description: "",
    amount: "",
    category: "",
    expenseDate: "",
    participants: [],
    expenseMethod: "",
    owner: "",
  });
  const [date, setDate] = useState();
  const [expenseMembersList, setexpenseMembersList] = useState([]);
  const [expenseMembers, setExpenseMembers] = useState([]);
  const { id } = useParams();
  const handleOnSubmit = async () => {
    expense.participants = expenseMembers;
    expense.expenseDate = date;
    requestHandler(
      async () => await addExpense(expense, id),
      null,
      (res) => {
        navigate(`/dashboard/groups/view/${id}`);
      },
      toast
    );
  };
  const getGroupDetails = async () => {
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
    if (groupDetails) {
      const mappedParticiapants = groupDetails.participants.map((user) => ({
        value: user._id,
        label: user.email,
        icon: undefined,
      }));

      setexpenseMembersList(mappedParticiapants);
    }
  }, [groupDetails]);
  useEffect(() => {
    getGroupDetails();
  }, []);
  const handleOnchange = (name) => (e) => {
    if (name === "owner" || name === "category" || name === "expenseMethod") {
      setExpense({ ...expense, [name]: e });
    } else {
      setExpense({ ...expense, [name]: e.target.value });
    }
  };
  if (Loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white w-[50%] p-6 mt-8 rounded-2xl">
        <h1 className="font-bold text-2xl ">Add Expense</h1>
        <div className="mt-2">
          <h1 className="font-bold text-xl mb-1">Expense Name</h1>
          <Input
            className=""
            placeholder="Expense Name"
            value={expense.name}
            onChange={handleOnchange("name")}
          />
        </div>
        <div className="my-2">
          <h1 className="font-bold text-xl">Expense Description</h1>
          <Input
            className=""
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
            <Select onValueChange={handleOnchange("owner")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Expense Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Expense Owner</SelectLabel>
                  {groupDetails.participants.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.username}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
        <div className="flex justify-between my-2">
          <div>
            <h1 className="font-bold text-xl">Expense Category</h1>
          </div>{" "}
          <div>
            <Select onValueChange={handleOnchange("category")}>
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
            <Select onValueChange={handleOnchange("expenseMethod")}>
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
          </div>{" "}
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
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-between my-2">
          <div>
            <h1 className="font-bold text-xl">Expense Amount</h1>
          </div>
          <div>
            <Input
              type="number"
              placeholder="Enter Amount"
              value={expense.amount}
              onChange={handleOnchange("amount")}
            />
          </div>
        </div>
        <div className="my-2 flex justify-between">
          <Link to={`/dashboard/groups/view/${id}`}>
            {" "}
            <Button className="bg-red-700">Cancel</Button>
          </Link>
          <Button className="bg-blue-700" onClick={handleOnSubmit}>
            Add Expense
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
