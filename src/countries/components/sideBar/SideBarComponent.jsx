import { useEffect, useState } from "react";
import { regions, sortOptions } from "../../../hooks/types";

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
    const updatedRegions = selectedFilters.selectedRegions.includes(region)
      ? selectedFilters.selectedRegions.filter((r) => r !== region)
      : [...selectedFilters.selectedRegions, region];

    setSelectedFilters({
      ...selectedFilters,
      selectedRegions: updatedRegions,
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
    <section className="text-white w-80 p-4 space-y-4">
      <div className="my-2">
        <h3 className="font-semibold">Ordenar por</h3>
        <select
          onChange={(e) => onSortChange(e.target.value ?? null)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="my-2">
        <h3 className="font-semibold">Región</h3>
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => toggleRegion(region)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                selectedFilters.selectedRegions.includes(region)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="my-3">
        <h3 className="font-semibold">Status</h3>
        <div className="my-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.check.unMember}
              onChange={handleStatusChange("unMember")}
              className="w-4 h-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs ml-2">Member of the United Nations</span>
          </label>
        </div>
        <div className="my-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.check.independent}
              onChange={handleStatusChange("independent")}
              className="w-4 h-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs ml-2">Independent</span>
          </label>
        </div>
      </div>
    </section>
  );
};
