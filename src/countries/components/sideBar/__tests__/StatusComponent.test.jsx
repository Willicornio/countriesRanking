import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { StatusComponent } from "../StatusComponent";

describe("StatusComponent", () => {
  it("renders checkboxes with correct initial states", () => {
    const selectedFilters = {
      check: {
        unMember: true,
        independent: false,
      },
    };
    const handleStatusChange = vi.fn();

    render(
      <StatusComponent
        selectedFilters={selectedFilters}
        handleStatusChange={handleStatusChange}
      />
    );

    const unMemberCheckbox = screen.getByLabelText("Member of the United Nations");
    const independentCheckbox = screen.getByLabelText("Independent");

    expect(unMemberCheckbox).toBeChecked();
    expect(independentCheckbox).not.toBeChecked();
  });

  it("calls handleStatusChange with correct key on checkbox change", () => {
    const selectedFilters = {
      check: {
        unMember: false,
        independent: false,
      },
    };
    const handleStatusChange = vi.fn(() => () => {});

    render(
      <StatusComponent
        selectedFilters={selectedFilters}
        handleStatusChange={handleStatusChange}
      />
    );

    const unMemberCheckbox = screen.getByLabelText("Member of the United Nations");
    fireEvent.click(unMemberCheckbox);

    expect(handleStatusChange).toHaveBeenCalledWith("unMember");

    const independentCheckbox = screen.getByLabelText("Independent");
    fireEvent.click(independentCheckbox);

    expect(handleStatusChange).toHaveBeenCalledWith("independent");
  });
});
