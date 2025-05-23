import { sortTypes } from "./types";

export const sortCountries = (state, key) => {

    if (!state) return [];
    return [...state].sort((a, b) => {
        if (key === sortTypes.name) {
            return a.name.common.localeCompare(b.name.common);
        }

        if (key === sortTypes.region) {
            const regionCompare = a.region.localeCompare(b.region);
            if (regionCompare !== 0) return regionCompare;
            return a.name.common.localeCompare(b.name.common);
        }

        if (key === sortTypes.population) {
            return a.population - b.population;
        }

        if (key === sortTypes.area) {
            return a.area - b.area;
        }

        return 0;
    });
}


export const filterBy = (countries, filter) => {
  let filtered = [...countries];

  if (filter.selectedRegions && filter.selectedRegions.length > 0) {
    filtered = filtered.filter(c => filter.selectedRegions.includes(c.region));
  }

  if (filter.check.independent) {
    filtered = filtered.filter(c => c.independent);
  }

  if (filter.check.unMember) {
    filtered = filtered.filter(c => c.unMember);
  }

  return filtered;
};



export const searchBy = (countries, filter) => {
  if (!filter || filter.length === 0) return countries;

  return countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );
};