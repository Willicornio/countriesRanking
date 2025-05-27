import { useEffect, useState } from "react";
import { regions, sortOptions } from "../../../hooks/types";
import { SortComponent } from "./SortComponent";
import { FiltersComponent } from "./FiltersComponent";
import { StatusComponent } from "./StatusComponent";

export const SideBarComponent = ({ sortBy, filterBy }) => {
  const [sortValue, setSortValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    selectedRegions: [],
    check: {
      independent: false,
      unMember: false,
    },
  });

  useEffect(() => {
    sortBy(sortValue);
  }, [sortValue]);

  useEffect(() => {
    filterBy(selectedFilters);
  }, [selectedFilters]);

  const onSortChange = (value) => {
    if (!value) return;
    setSortValue(value);
  };

  const toggleRegion = (region) => {
    setSelectedFilters(prev => {
      const isRegionSelected = prev.selectedRegions.includes(region);
      const updatedRegions = isRegionSelected
        ? prev.selectedRegions.filter((r) => r !== region)
        : [...prev.selectedRegions, region];

      return {
        ...prev,
        selectedRegions: updatedRegions,
      };
    });
  };

  const handleStatusChange = (key) => {
    return (e) => {
      const isChecked = e.target.checked;

      setSelectedFilters((prev) => ({
        ...prev,
        check: {
          ...prev.check,
          [key]: isChecked,
        },
      }));
    };
  };

  return (
    <section data-testid="sidebar" className="text-white w-80 p-4 space-y-4">
      <SortComponent
        sortOptions={sortOptions}
        onSortChange={onSortChange}
      ></SortComponent>

      <FiltersComponent
        selectedFilters={selectedFilters}
        regions={regions}
        toggleRegion={toggleRegion}
      ></FiltersComponent>

      <StatusComponent
        selectedFilters={selectedFilters}
        handleStatusChange={handleStatusChange}
      ></StatusComponent>
    </section>
  );
};
