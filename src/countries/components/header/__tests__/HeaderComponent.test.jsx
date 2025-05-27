import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { HeaderComponent } from "../HeaderComponent";

describe("HeaderComponent", () => {
  it("displays the correct number of countries", () => {
    render(<HeaderComponent numberCountries={5} searchBy={() => {}} />);
    expect(screen.getByText("Found 5 countries")).toBeInTheDocument();
  });

  it("calls searchBy when the input changes", () => {
    const mockSearchBy = vi.fn();
    render(<HeaderComponent searchBy={mockSearchBy} />);

    const input = screen.getByPlaceholderText("Buscar país...");

    fireEvent.change(input, { target: { value: "France" } });

    expect(mockSearchBy).toHaveBeenCalledWith("France");
  });

  it("shows the input value as user types", () => {
    render(<HeaderComponent searchBy={() => {}} />);

    const input = screen.getByPlaceholderText("Buscar país...");
    fireEvent.change(input, { target: { value: "Spain" } });

    expect(input.value).toBe("Spain");
  });
});
