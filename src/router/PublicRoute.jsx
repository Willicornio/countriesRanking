import React, { useContext, useEffect } from "react";
import { AuthContext } from "../auth/pages/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export const PublicRoute = ({ children }) => {

  const { authState } = useContext(AuthContext);

  return authState.logged ? <Navigate to="/" /> : children;
};
