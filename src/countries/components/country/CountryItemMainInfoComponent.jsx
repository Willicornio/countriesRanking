import React from "react";

export const CountryItemMainInfoComponent = ({ countryDetails }) => {
  return (
    <>
      <div className="space-y-6"  data-testid="main-info">
        <img
          src={countryDetails.flags?.svg || countryDetails.flags?.png}
          alt={
            countryDetails.flags?.alt ||
            `Bandera de ${countryDetails.name?.common}`
          }
          className="w-full rounded-lg shadow-lg"
        />
        <div className="bg-gray-800 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">
            {countryDetails.name?.common}
          </h1>
          <h2 className="text-xl text-gray-300 mb-4">
            {countryDetails.name?.official}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Capital</p>
              <p className="font-semibold">
                {countryDetails.capital?.[0] || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Región</p>
              <p className="font-semibold">{countryDetails.region || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-400">Subregión</p>
              <p className="font-semibold">
                {countryDetails.subregion || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Población</p>
              <p className="font-semibold">
                {countryDetails.population?.toLocaleString() || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
