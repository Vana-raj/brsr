import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;