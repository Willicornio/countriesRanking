import React from "react";

export const FiltersComponent = ({
  selectedFilters,
  regions,
  toggleRegion,
}) => {
  return (
    <>
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
    </>
  );
};
