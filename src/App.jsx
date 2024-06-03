import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./lib/routes.url";
import { useAuth } from "./context/AuthContext";
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
        path={`${routes.DASHBOARD_URL}`}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path={`${routes.CREATE_GROUP_URL}`}
        element={
          <PrivateRoute>
            <CreateGroup />
          </PrivateRoute>
        }
      />
      <Route
        path={`${routes.ADD_EXPENSE_URL}`}
        element={
          <PrivateRoute>
            <AddExpense />
          </PrivateRoute>
        }
      />
      <Route
        path={`${routes.USER_GROUPS_URL}`}
        element={
          <PrivateRoute>
            <Groups />
          </PrivateRoute>
        }
      />
      <Route
        path={`${routes.VIEW_GROUP_URL}`}
        element={
          <PrivateRoute>
            <ViewGroup />
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
        path={`${routes.USER_PROFILE_URL}`}
        element={
          <PrivateRoute>
            <Profile />
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

      <Route
        path={`${routes.ABOUT_URL}`}
        element={
          <PublicRoute>
            <About />
          </PublicRoute>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
