import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCountryQuery } from "../../store/api/countriesApi";
import { CountryItem } from "../components/country/CountryItem";
import { NeighborItem } from "../components/country/NeighborItem";
import { NeighBornComponent } from "../components/country/NeighBornComponent";

export const CountryDetails = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const {
    data: countryDetailsArray,
    isLoading,
    isError,
  } = useGetCountryQuery(code);
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    if (countryDetailsArray && countryDetailsArray.length) {
      setCountryDetails(countryDetailsArray[0]);
    }
  }, [countryDetailsArray]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="text-2xl">Cargando...</div>
      </div>
    );
  }

  if (isError || !countryDetails) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-white">
        <div className="text-2xl mb-4">Error al cargar los datos del país</div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Volver
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <CountryItem countryDetails={countryDetails}></CountryItem>

      {countryDetails?.borders ? (
        <NeighBornComponent
          borders={countryDetails.borders}
        ></NeighBornComponent>
      ) : (
        <div className="flex items-center text-white">
          <div className="text-2xl">No tiene vecinos</div>
        </div>
      )}
    </div>
  );
};
