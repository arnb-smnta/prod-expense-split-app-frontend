import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestHandler } from "@/lib/helpers";
import { makeSettlement } from "@/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
const SettlementCard = ({ data }) => {
  //! TODO: handling of user redirect on succesfull settlement of amount leads to page reload
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [settleAmount, setsettleAmount] = useState(data.value);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSettle = (e) => {
    e.preventDefault();

    const payload = {
      settleTo: data.settleTo._id,
      settleFrom: data.settleFrom._id,
      settleAmount: settleAmount,
      settleDate: date,
    };
    requestHandler(
      async () => await makeSettlement(id, payload),
      null,
      (res) => {
        navigate(`/dashboard/groups/view/${id}`);
      },
      toast
    );
  };

  const handleAmountchange = (e) => {
    e.preventDefault();
    setsettleAmount(e.target.value);
  };
  function ProfileForm({ className }) {
    return (
      <div className={cn("grid items-start gap-4", className)}>
        <div className="flex">
          <div className="grid gap-2">
            <Label htmlFor="settleTo">Settle to</Label>
            <Input
              id="settleTo"
              defaultValue={`${data.settleTo.username}`}
              disabled="true"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="settleFrom">Settle From</Label>
            <Input
              id="settleFrom"
              defaultValue={`${data.settleFrom.username}`}
              disabled="true"
            />
          </div>
        </div>

        <div>
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
          <div className="grid gap-2">
            <Label htmlFor="settleAmount">Settlement Amount</Label>
            <Input
              id="settleAmount"
              type="number"
              defaultValue={settleAmount}
              onChange={handleAmountchange}
            />
          </div>
        </div>
        <Button type="submit" onClick={handleSettle}>
          Settle
        </Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-2 shadow-2xl mt-4 mx-8 p-4 w-[450px] rounded-xl border bg-yellow-200">
      <div className="flex justify-center items-center">
        <img
          src={`${data.settleFrom.avatar.url}`}
          alt=""
          className="rounded-full h-24 w-24"
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="flex flex-wrap ">
          <h1 className="font-bold">{data.settleFrom.username}</h1>
          {"  "} to{"  "}
          <h1 className="font-bold"> {data.settleTo.username}</h1>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="text-red-600 font-bold">
          <h1>Settlement Amount</h1> <h1> Rs {data.value}</h1>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">Settle</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Settle Balane</DrawerTitle>
              <DrawerDescription>Settle Your Balances</DrawerDescription>
            </DrawerHeader>
            <ProfileForm className="px-4" />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default SettlementCard;
