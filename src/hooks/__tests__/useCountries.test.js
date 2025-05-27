import { renderHook, act } from "@testing-library/react-hooks";
import { useCountries } from "../useCountries";
import { sortTypes } from "../types";
import { mockCountries } from "./mockCountries";

describe("useCountries", () => {
  it("should set countries correctly", () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.setCountries(mockCountries);
    });

    expect(result.current.countries).toEqual(mockCountries);
  });

  it("should sort countries by name", () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.setCountries(mockCountries);
    });

    act(() => {
      result.current.sortBy(sortTypes.name);
    });

    const names = result.current.countries.map((c) => c.name.common);
    expect(names).toEqual(["Brazil", "France", "Spain"]);
  });

  it("should filter countries by region", () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.setCountries(mockCountries);
    });

    act(() => {
      result.current.filterBy({ selectedRegions: ["Europe"], check: {} });
    });

    expect(result.current.countries.length).toBe(2);
    expect(result.current.countries.every(c => c.region === "Europe")).toBe(true);
  });

  it("should search countries by name", () => {
    const { result } = renderHook(() => useCountries());

    act(() => {
      result.current.setCountries(mockCountries);
    });

    act(() => {
      result.current.searchBy("fr");
    });

    expect(result.current.countries.length).toBe(1);
    expect(result.current.countries[0].name.common).toBe("France");
  });
});
