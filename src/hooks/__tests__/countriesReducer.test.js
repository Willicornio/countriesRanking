import { describe, it, expect, vi, beforeEach } from "vitest";
import { countriesReducer } from "../countriesReducer";
import { actionTypes } from "../types";

// Mock utilities
import * as utils from "../countriesReducer.utils";

vi.mock("../countriesReducer.utils", () => ({
  sortCountries: vi.fn(),
  filterBy: vi.fn(),
  searchBy: vi.fn(),
}));

describe("countriesReducer", () => {
  const initialState = {
    allCountries: [],
    filteredCountries: [],
  };

  const mockCountries = [{ name: "Spain" }, { name: "France" }];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle actionTypes.set", () => {
    const action = { type: actionTypes.set, payload: mockCountries };
    const result = countriesReducer(initialState, action);
    expect(result.allCountries).toEqual(mockCountries);
    expect(result.filteredCountries).toEqual(mockCountries);
  });

  it("should handle actionTypes.sort", () => {
    const sorted = [{ name: "France" }, { name: "Spain" }];
    utils.sortCountries.mockReturnValue(sorted);

    const state = {
      allCountries: mockCountries,
      filteredCountries: mockCountries,
    };

    const action = { type: actionTypes.sort, payload: "asc" };
    const result = countriesReducer(state, action);

    expect(utils.sortCountries).toHaveBeenCalledTimes(2);
    expect(result.filteredCountries).toEqual(sorted);
    expect(result.allCountries).toEqual(sorted);
  });

  it("should handle actionTypes.filter", () => {
    const filtered = [{ name: "Spain" }];
    utils.filterBy.mockReturnValue(filtered);

    const state = {
      allCountries: mockCountries,
      filteredCountries: [],
    };

    const action = { type: actionTypes.filter, payload: "Spain" };
    const result = countriesReducer(state, action);

    expect(utils.filterBy).toHaveBeenCalledWith(mockCountries, "Spain");
    expect(result.filteredCountries).toEqual(filtered);
  });

  it("should handle actionTypes.search", () => {
    const searched = [{ name: "France" }];
    utils.searchBy.mockReturnValue(searched);

    const state = {
      allCountries: mockCountries,
      filteredCountries: [],
    };

    const action = { type: actionTypes.search, payload: "fr" };
    const result = countriesReducer(state, action);

    expect(utils.searchBy).toHaveBeenCalledWith(mockCountries, "fr");
    expect(result.filteredCountries).toEqual(searched);
  });

  it("should return the current state for an unknown action type", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const result = countriesReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});