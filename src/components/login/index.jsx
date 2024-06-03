import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

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
    <div>
      <input
        placeholder="Enter the username..."
        value={data.username}
        onChange={handleDataChange("username")}
      />
      <input
        placeholder="Enter your password"
        type="password"
        value={data.password}
        onChange={handleDataChange("password")}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
