import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CountriesRoute } from "../CountriesRoutes";

vi.mock("../../pages/Dashboard", () => ({
  Dashboard: () => <div>Dashboard Page</div>,
}));

vi.mock("../../pages/CountryDetails", () => ({
  CountryDetails: () => <div>Country Details Page</div>,
}));

describe("CountriesRoute", () => {
  it("renders Dashboard page on /dashboard route", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <CountriesRoute />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });

  it("renders CountryDetails page on /details/:code route", () => {
    render(
      <MemoryRouter initialEntries={["/details/ESP"]}>
        <CountriesRoute />
      </MemoryRouter>
    );

    expect(screen.getByText("Country Details Page")).toBeInTheDocument();
  });

  it("redirects from / to /dashboard", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/*" element={<CountriesRoute />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });
});
