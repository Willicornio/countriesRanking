import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages/loginPage";
import { PrivateRoute } from "../Router/PrivateRoute.jsx";
import { PublicRoute } from "../Router/PublicRoute.jsx";
import { CountriesRoute } from '../countries/routes/CountriesRoutes.jsx'
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <CountriesRoute />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
