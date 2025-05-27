import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import * as api from "../../../store/api/countriesApi";
import * as hooks from "../../../hooks/useCountries";

import { Dashboard } from "../Dashboard";

describe("Dashboard", () => {
  it("sets countries when countriesData changes", () => {
    const fakeCountriesData = [
      { name: "Spain" },
      { name: "France" },
    ];

    vi.spyOn(api, "useGetCountriesQuery").mockReturnValue({
      data: fakeCountriesData,
      isLoading: false,
      isError: false,
    });

    const setCountries = vi.fn();
    const sortBy = vi.fn();
    const filterBy = vi.fn();
    const searchBy = vi.fn();

    vi.spyOn(hooks, "useCountries").mockReturnValue({
      countries: [],
      setCountries,
      sortBy,
      filterBy,
      searchBy,
    });

    render(<Dashboard />);

    expect(setCountries).toHaveBeenCalledWith(fakeCountriesData);

    expect(screen.getByText("Found 0 countries")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("grid-id")).toBeInTheDocument();
   
  });
});
