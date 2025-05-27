import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { NeighBornComponent } from "../NeighBornComponent";

vi.mock("../NeighborItem", () => ({
  NeighborItem: ({ border }) => <div data-testid="neighbor-item">{border}</div>,
}));

describe("NeighBornComponent", () => {
  const mockBorders = ["ESP", "FRA", "PRT"];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly the neighbors countries", () => {
    render(<NeighBornComponent borders={mockBorders} />);

    expect(screen.getByText("Neighbors countries")).toBeInTheDocument();

    const items = screen.getAllByTestId("neighbor-item");
    expect(items).toHaveLength(mockBorders.length);
    mockBorders.forEach((code, index) => {
      expect(items[index]).toHaveTextContent(code);
    });
  });
});