import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return <div>{user ? <Component /> : navigate("/login")}</div>;
};

export default PrivateRoute;
