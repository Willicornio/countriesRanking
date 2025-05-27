import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CountryItem } from "../CountryItem";
import { countryDetailsMock } from "./mockCountryDetail";


// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({}),
}));


describe("CountryItem", () => {

  it("renders main and additional info components with countryDetails", () => {
    render(<CountryItem countryDetails={countryDetailsMock} />);

    expect(screen.getByTestId("main-info")).toBeTruthy()
    expect(screen.getByTestId("additional-info")).toBeTruthy()
  });

  it("calls navigate(-1) when 'Volver' button is clicked", () => {
    render(<CountryItem countryDetails={countryDetailsMock} />);
    const backBtn = screen.getByText("← Volver");

    fireEvent.click(backBtn);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("calls navigate('/') when 'Dashboard' button is clicked", () => {
    render(<CountryItem countryDetails={countryDetailsMock} />);
    const dashboardBtn = screen.getByText("Dashboard");

    fireEvent.click(dashboardBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
