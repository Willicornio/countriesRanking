import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import * as api from '../../../store/api/countriesApi'
import { CountryDetails } from "../CountryDetails";

const mockNavigate = vi.fn();

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ code: "USA" }),
  };
});

vi.mock("../components/country/CountryItem", () => ({
  CountryItem: ({ countryDetails }) => (
    <div>Country: {countryDetails?.name?.common || "No country"}</div>
  ),
}));

vi.mock("../components/country/NeighBornComponent", () => ({
  NeighBornComponent: ({ borders }) => (
    <div>Borders: {borders?.join(", ") || "No tiene vecinos"}</div>
  ),
}));

describe("CountryDetails", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading state", () => {
    vi.spyOn(api, "useGetCountryQuery").mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={["/country/USA"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("shows error state and allows going back", () => {
    vi.spyOn(api, "useGetCountryQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <MemoryRouter initialEntries={["/country/USA"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Error al cargar los datos del país")).toBeInTheDocument();

    fireEvent.click(screen.getByText("← Volver"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("shows country details and neighbors if data present", () => {
    vi.spyOn(api, "useGetCountryQuery").mockReturnValue({
      data: [
        {
          name: { common: "United States" },
          borders: ["CAN", "MEX"],
        },
      ],
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={["/country/USA"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Country: United States")).toBeInTheDocument();
    expect(screen.getByText("Borders: CAN, MEX")).toBeInTheDocument();
  });

  it("shows 'No tiene vecinos' when no borders", () => {
    vi.spyOn(api, "useGetCountryQuery").mockReturnValue({
      data: [
        {
          name: { common: "Iceland" },
          borders: null,
        },
      ],
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={["/country/IS"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Country: Iceland")).toBeInTheDocument();
    expect(screen.getByText("No tiene vecinos")).toBeInTheDocument();
  });
});
