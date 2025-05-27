import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { FiltersComponent } from "../FiltersComponent";

describe("FiltersComponent", () => {
  const regions = ["Europe", "Asia", "Africa"];
  const selectedFilters = {
    selectedRegions: ["Europe"],
  };

  it("renders all regions as buttons", () => {
    render(
      <FiltersComponent
        regions={regions}
        selectedFilters={selectedFilters}
        toggleRegion={() => {}}
      />
    );

    regions.forEach((region) => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });

  it("highlights selected regions", () => {
    render(
      <FiltersComponent
        regions={regions}
        selectedFilters={selectedFilters}
        toggleRegion={() => {}}
      />
    );

    const selectedButton = screen.getByText("Europe");
    expect(selectedButton).toHaveClass("bg-blue-600");
    expect(selectedButton).toHaveClass("text-white");
  });

  it("calls toggleRegion when a button is clicked", () => {
    const mockToggleRegion = vi.fn();

    render(
      <FiltersComponent
        regions={regions}
        selectedFilters={selectedFilters}
        toggleRegion={mockToggleRegion}
      />
    );

    const asiaButton = screen.getByText("Asia");
    fireEvent.click(asiaButton);

    expect(mockToggleRegion).toHaveBeenCalledWith("Asia");
  });
});
