import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./lib/routes.url";
import PrivateRoute from "./components/ui/PrivateRoute";
import Dashboard from "./components/dashboard";
import Groups from "./components/groups";
import CreateGroup from "./components/groups/createGroup";
import AddExpense from "./components/expense/AddExpense";
import ViewGroup from "./components/groups/viewGroup";
import EditGroup from "./components/groups/EditGroup";
import Profile from "./components/profile";
import PublicRoute from "./components/ui/PublicRoute";
import Login from "./components/login";
import Register from "./components/register";
import About from "./components/About";
import Page404 from "./components/Page404";
import { useAuth } from "./context/useAuthHook";
import Main from "./components/dashboard/Main";

function App() {
  const { token, user } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          token && user?._id ? (
            <Navigate to={`${routes.DASHBOARD_URL}`} />
          ) : (
            <Navigate to={`${routes.LOGIN_URL}`} />
          )
        }
      />
      {/* *Private Routes can be accessed only by authenticated USERS */}
      <Route
        path={`/Dashboard`}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="app" element={<Main />} />
        <Route path="createGroup" element={<CreateGroup />} />
        <Route path="groups" element={<Groups />} />
        <Route path="userProfile" element={<Profile />} />
        <Route path="groups/view/:id" element={<ViewGroup />} />
      </Route>

      <Route
        path={`${routes.ADD_EXPENSE_URL}`}
        element={
          <PrivateRoute>
            <AddExpense />
          </PrivateRoute>
        }
      />

      <Route
        path={`${routes.EDIT_GROUP_URL}`}
        element={
          <PrivateRoute>
            <EditGroup />
          </PrivateRoute>
        }
      />

      <Route
        path={`${routes.LOGIN_URL}`}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={`${routes.REGISTER_URL}`}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route path={`${routes.ABOUT_URL}`} element={<About />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
