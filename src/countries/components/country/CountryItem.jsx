import { useNavigate, useParams } from "react-router-dom";

export const CountryItem = ({ countryDetails }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

    const handleDashboard = () => {
    navigate("/");
  };


  return (
    <>
      <button
        onClick={handleBack}
        className="mb-8 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        ← Volver
      </button>

      <button
        onClick={handleDashboard}
        className="ml-4 mb-8 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Dashboard
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
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
                <p className="font-semibold">
                  {countryDetails.region || "N/A"}
                </p>
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

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Información Adicional
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Área</p>
                <p className="font-semibold">
                  {countryDetails.area?.toLocaleString() || "N/A"} km²
                </p>
              </div>
              <div>
                <p className="text-gray-400">Monedas</p>
                <div className="font-semibold">
                  {countryDetails.currencies
                    ? Object.values(countryDetails.currencies).map(
                        (currency) => (
                          <div key={currency.name}>
                            {currency.name} ({currency.symbol})
                          </div>
                        )
                      )
                    : "N/A"}
                </div>
              </div>
              <div>
                <p className="text-gray-400">Idiomas</p>
                <div className="font-semibold">
                  {countryDetails.languages
                    ? Object.values(countryDetails.languages).join(", ")
                    : "N/A"}
                </div>
              </div>
              <div>
                <p className="text-gray-400">Estado</p>
                <div className="my-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        countryDetails.unMember ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span>Miembro de la ONU</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        countryDetails.independent
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span>País Independiente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {countryDetails.maps?.googleMaps && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
              <a
                href={countryDetails.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                Ver en Google Maps
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
