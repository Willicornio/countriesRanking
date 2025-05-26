import React from "react";

export const SortComponent = ({ sortOptions = [], onSortChange }) => {
  return (
    <>
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
    </>
  );
};
