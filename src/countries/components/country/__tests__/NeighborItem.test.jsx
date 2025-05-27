import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NeighborItem } from "../NeighborItem";
import { MemoryRouter } from "react-router-dom";
import * as api from '../../../../store/api/countriesApi'

vi.mock("../../../store/api/countriesApi", () => ({
  useGetCountryQuery: vi.fn(),
}));

describe("NeighborItem", () => {
  const mockCountry = {
    cca2: "FR",
    name: { common: "Francia" },
    flags: { png: "https://flagcdn.com/fr.png" },
  };

  it("muestra el loading mientras se está cargando", () => {

    vi.spyOn(api, 'useGetCountryQuery').mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

    render(
      <MemoryRouter>
        <NeighborItem border={["FR"]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Error loading country")).toBeTruthy();
  });

  it("muestra el error si no hay datos o hay error", () => {
    vi.spyOn(api, 'useGetCountryQuery').mockReturnValue({
            data: [mockCountry],
            isLoading: false,
            isError: true,
        });

    render(
      <MemoryRouter>
        <NeighborItem border={["FR"]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/error loading country/i)).toBeInTheDocument();
  });

  it("muestra correctamente el país vecino", () => {

    vi.spyOn(api, 'useGetCountryQuery').mockReturnValue({
            data: [mockCountry],
            isLoading: false,
            isError: false,
        });

    render(
      <MemoryRouter>
        <NeighborItem border={["FR"]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Francia")).toBeInTheDocument();
    expect(screen.getByAltText(/bandera de francia/i)).toHaveAttribute(
      "src",
      mockCountry.flags.png
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/details/FR");
  });
});
