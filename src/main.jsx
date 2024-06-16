import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import appStore from "./redux/appStore.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
