import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaLock } from "react-icons/fa";
import { useAuth } from "@/context/useAuthHook";
import { toast } from "../ui/use-toast";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuth();
  const handleDataChange = (name) => (e) => {
    e.preventDefault();
    setData({ ...data, [name]: e.target.value });
  };
  const handleLogin = async () => {
    if (Object.values(data).some((val) => !val)) {
      toast({
        variant: "destructive",
        description: "Please enter both username and password",
      });
      return;
    }

    await login(data);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="flex justify-center items-center flex-col h-screen w-full">
      <h1 className="text-3xl font-bold">SplitBills-Site</h1>
      <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
        <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
          <FaLock className="h-8 w-8 mb-2" /> Login
        </h1>
        {/* Input for entering the username */}
        <Input
          placeholder="Enter the username..."
          value={data.username}
          onKeyDown={handleKeyDown}
          onChange={handleDataChange("username")}
        />
        {/* Input for entering the password */}
        <Input
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={handleDataChange("password")}
          onKeyDown={handleKeyDown}
        />
        {/* Button to initiate the login process */}
        <Button
          disabled={Object.values(data).some((val) => !val)}
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        {/* Link to the registration page */}
        <small className="text-zinc-300">
          Don&apos;t have an account?{" "}
          <a className="text-primary hover:underline" href="/register">
            Register
          </a>
        </small>
      </div>

      <div className="border border-black p-2 font-extrabold text-center">
        <h1>Sample Username:shubrakaru</h1>
        <h1>Sample Password: Arnab@0000</h1>
        <h2 className="text-red-700">
          This is sample login credentials you can use to login into my app
        </h2>
      </div>
    </div>
  );
};

export default Login;
