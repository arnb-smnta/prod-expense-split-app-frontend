import { useAuth } from "@/context/useAuthHook";
import PropTypes from "prop-types";
import { Navigate, useParams } from "react-router-dom";
const PublicRoute = ({ children }) => {
  const { token, user } = useAuth();
  const params = useParams();
  console.log(params);
  if (token && user?._id) return <Navigate to="/dashboard/app" replace />;
  return children;
};

PublicRoute.propTypes = { children: PropTypes.node.isRequired };

export default PublicRoute;
