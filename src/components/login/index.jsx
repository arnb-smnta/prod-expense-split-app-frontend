import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaLock } from "react-icons/fa";
import { useAuth } from "@/context/useAuthHook";

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
    await login(data);
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
          onChange={handleDataChange("username")}
        />
        {/* Input for entering the password */}
        <Input
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={handleDataChange("password")}
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
    </div>
  );
};

export default Login;
