import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function Protected({ children }) {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  if (!user.username === "Gideon Appiah") {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default Protected;
