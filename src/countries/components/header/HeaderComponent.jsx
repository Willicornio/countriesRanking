import React, { useEffect, useState } from "react";

export const HeaderComponent = ({ numberCountries = 0, searchBy }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {searchBy(searchTerm)}, [searchTerm]);
  
  const onSearchChange = (inputValue) => {
    console.log(inputValue)
    setSearchTerm(inputValue);
  };

  return (
    <header className="flex place-content-between text-white">
      <h3>Found {numberCountries} countries</h3>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar país..."
        className="w-64 px-4 py-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
      />
    </header>
  );
};
