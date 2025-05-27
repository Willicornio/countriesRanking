import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { SideBarComponent } from "../SideBarComponent";

vi.mock("../../../hooks/types", () => ({
  regions: ["Europe", "Asia"],
  sortOptions: [],
}));

vi.mock("../SortComponent", () => ({
  SortComponent: ({ onSortChange }) => (
    <button onClick={() => onSortChange("name")}>Sort by Name</button>
  ),
}));

vi.mock("../FiltersComponent", () => ({
  FiltersComponent: ({ toggleRegion, selectedFilters, regions }) => (
    <div>
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => toggleRegion(region)}
          data-testid={`region-${region}`}
        >
          Toggle {region}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("../StatusComponent", () => ({
  StatusComponent: ({ handleStatusChange, selectedFilters }) => (
    <>
      <label>
        Independent
        <input
          type="checkbox"
          checked={selectedFilters.check.independent}
          onChange={(e) => handleStatusChange("independent")(e)}
        />
      </label>
      <label>
        UN Member
        <input
          type="checkbox"
          checked={selectedFilters.check.unMember}
          onChange={(e) => handleStatusChange("unMember")(e)}
        />
      </label>
    </>
  ),
}));

describe("SideBarComponent", () => {
  it("calls sortBy on sort change", () => {
    const sortBy = vi.fn();
    const filterBy = vi.fn();

    render(<SideBarComponent sortBy={sortBy} filterBy={filterBy} />);

    fireEvent.click(screen.getByText("Sort by Name"));

    expect(sortBy).toHaveBeenCalledWith("name");
  });

  it("calls filterBy when a region is toggled", async () => {
    const sortBy = vi.fn();
    const filterBy = vi.fn();

    render(<SideBarComponent sortBy={sortBy} filterBy={filterBy} />);

    fireEvent.click(screen.getByText("Toggle Europe"));

    await waitFor(() => {
      expect(filterBy).toHaveBeenCalled();
    });
  });

  it("calls filterBy when a status checkbox is changed", async () => {
    const sortBy = vi.fn();
    const filterBy = vi.fn();

    render(<SideBarComponent sortBy={sortBy} filterBy={filterBy} />);

    fireEvent.click(screen.getByLabelText("Independent"));
    await waitFor(() => {
      const call = filterBy.mock.calls[0][0];
      expect(call.check.independent).toBe(false);
    });

    const unMemberCheckbox = screen.getByLabelText("UN Member");
    fireEvent.click(unMemberCheckbox);

    await waitFor(() => {
      expect(filterBy).toHaveBeenCalledTimes(3);
      const secondCall = filterBy.mock.calls[1][0];
      expect(secondCall.check.unMember).toBe(false);
    });
  });
});
