import { format } from "date-fns";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdCancel, MdDelete, MdOutlineDelete } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
const ExpenseCard = ({ expense }) => {
  const formatDate = (isoDate) => {
    return format(new Date(isoDate), "do MMMM yyyy");
  };
  const [open, setOpen] = useState(false);
  const handleDeleteExpense = async () => {
    //! has to delete Expense
  };
  function ProfileForm({ className }) {
    return (
      <div className={`${className}`}>
        <div className="flex justify-between">
          <Button
            className="w-[50%] mr-2 bg-transparent text-red-600 border border-red-600 hover:bg-red-100"
            type="submit"
            onClick={handleDeleteExpense}
          >
            <MdOutlineDelete />
            Delete
          </Button>
          <Button
            onClick={() => setOpen(false)}
            type="submit"
            className="w-[50%] bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-100"
          >
            <MdCancel />
            Cancel
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white shadow-2xl grid grid-cols-4 gap-2 my-2 rounded-xl p-4">
      <div className="bg-yellow-200 rounded-full col-span-1 flex justify-center items-center">
        <h1 className="text-2xl text-yellow-900 text-center">
          {formatDate(expense.expenseDate)}
        </h1>
      </div>

      <div className="col-span-2 grid-rows-4">
        <div className="text-2xl text-blue-700 row-span-1">
          <h1>{expense.name}</h1>
        </div>
        <div className="row-span-1">
          <h2 className="text-xl text-blue-700">Total ₹{expense.amount}</h2>
        </div>
        <div>
          <div className="row-span-1">
            <h1 className="">Paid by</h1>
          </div>
          <div className="row-span-1">
            <h2 className="">{expense.owner[0].username}</h2>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <IoIosMenu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16 translate-x-10">
              <Link to={`/dashboard/viewExpense/${expense._id}`}>
                <DropdownMenuLabel className="flex items-center justify-center cursor-pointer hover:bg-gray-200">
                  <FaEye color="" className="mr-4" />
                  View
                </DropdownMenuLabel>
              </Link>
              <Link to={`/dashboard/editExpense/${expense._id}`}>
                <DropdownMenuLabel className="flex items-center justify-center cursor-pointer hover:bg-gray-200">
                  <FaPencil className="mr-4" />
                  Edit
                </DropdownMenuLabel>
              </Link>

              <DropdownMenuLabel className="flex items-center justify-center text-red-600 cursor-pointer">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-transparent text-red-600  hover:bg-red-100">
                      <MdDelete color="red" className="mr-2" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Confirm User Deletion</DialogTitle>
                      <DialogDescription>
                        Are you Sure you want to delete the user Account?
                      </DialogDescription>
                    </DialogHeader>
                    <ProfileForm />
                  </DialogContent>
                </Dialog>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>{" "}
        <div>
          <h1 className="text-xl text-red-600">Per Person</h1>
        </div>
        <div className="">
          <h1 className="text-2xl text-red-600 ">
            ₹ {expense.expensePerMember.toFixed(2)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
