import React from "react";

export const StatusComponent = ({ selectedFilters, handleStatusChange }) => {
  return (
    <>
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
    </>
  );
};
