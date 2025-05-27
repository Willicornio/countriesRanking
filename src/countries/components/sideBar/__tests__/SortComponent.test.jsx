import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { SortComponent } from "../SortComponent";

describe("SortComponent", () => {
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "population", label: "Population" },
  ];

  it("renders sort options", () => {
    const onSortChange = vi.fn();

    render(<SortComponent sortOptions={sortOptions} onSortChange={onSortChange} />);

    const select = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");

    expect(select).toBeInTheDocument();
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent("Name");
    expect(options[1]).toHaveTextContent("Population");
  });

  it("calls onSortChange when an option is selected", () => {
    const onSortChange = vi.fn();

    render(<SortComponent sortOptions={sortOptions} onSortChange={onSortChange} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "population" },
    });

    expect(onSortChange).toHaveBeenCalledWith("population");
  });
});
