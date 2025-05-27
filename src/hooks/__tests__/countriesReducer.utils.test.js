import { describe, it, expect } from "vitest";
import { sortCountries, filterBy, searchBy } from "../countriesReducer.utils";
import { sortTypes } from "../types";
import { mockCountries } from "./mockCountries";


describe("sortCountries", () => {
  it("should sort by name", () => {
    const result = sortCountries(mockCountries, sortTypes.name);
    expect(result.map(c => c.name.common)).toEqual(["Brazil", "France", "Spain"]);
  });

  it("should sort by region and then name", () => {
    const result = sortCountries(mockCountries, sortTypes.region);
    expect(result.map(c => c.region)).toEqual(["Americas", "Europe", "Europe"]);
  });

  it("should sort by population", () => {
    const result = sortCountries(mockCountries, sortTypes.population);
    expect(result.map(c => c.population)).toEqual([47000000, 67000000, 213000000]);
  });

  it("should sort by area", () => {
    const result = sortCountries(mockCountries, sortTypes.area);
    expect(result.map(c => c.area)).toEqual([505990, 551695, 8515767]);
  });

  it("should return empty array if state is falsy", () => {
    expect(sortCountries(null, sortTypes.name)).toEqual([]);
  });
});

describe("filterBy", () => {
  it("should filter by selected regions", () => {
    const result = filterBy(mockCountries, {
      selectedRegions: ["Europe"],
      check: {},
    });
    expect(result.length).toBe(2);
    expect(result.every(c => c.region === "Europe")).toBe(true);
  });

  it("should filter by independence", () => {
    const countries = [...mockCountries, { ...mockCountries[0], independent: false }];
    const result = filterBy(countries, {
      selectedRegions: [],
      check: { independent: true },
    });
    expect(result.every(c => c.independent)).toBe(true);
  });

  it("should filter by UN membership", () => {
    const countries = [...mockCountries, { ...mockCountries[0], unMember: false }];
    const result = filterBy(countries, {
      selectedRegions: [],
      check: { unMember: true },
    });
    expect(result.every(c => c.unMember)).toBe(true);
  });
});

describe("searchBy", () => {
  it("should return all countries if filter is empty", () => {
    const result = searchBy(mockCountries, "");
    expect(result).toEqual(mockCountries);
  });

  it("should filter countries by name", () => {
    const result = searchBy(mockCountries, "fr");
    expect(result.length).toBe(1);
    expect(result[0].name.common).toBe("France");
  });

  it("should be case insensitive", () => {
    const result = searchBy(mockCountries, "brAZIL");
    expect(result.length).toBe(1);
    expect(result[0].name.common).toBe("Brazil");
  });

  it("should return empty array if no matches", () => {
    const result = searchBy(mockCountries, "xyz");
    expect(result).toEqual([]);
  });
});
