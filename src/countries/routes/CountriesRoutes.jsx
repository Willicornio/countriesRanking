import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { CountryDetails } from "../pages/CountryDetails";
export const CountriesRoute = () => {
  return (
    <>
      <div className="p-8 h-full">
        <Routes>
          <Route path="dashboard" element={<Dashboard></Dashboard>} />
          <Route
            path="details/:code"
            element={<CountryDetails></CountryDetails>}
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
};