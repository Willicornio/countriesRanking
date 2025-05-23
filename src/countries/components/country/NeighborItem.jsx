import { useGetCountryQuery } from "../../../store/api/countriesApi";
import { Link } from "react-router-dom";

export const NeighborItem = ({ border }) => {

  const {
    data: neighborItem,
    isLoading,
    isError,
  } = useGetCountryQuery(border);

    if (isError || !neighborItem || !neighborItem[0]) {
        return (
            <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-center text-gray-400">Error loading country</p>
            </div>
        );
    }

if (isLoading) {
        return (
            <div className="bg-gray-800 rounded-lg p-4">
                <div className="w-full h-24 bg-gray-700 rounded-md mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
        );
    }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {neighborItem.map((neighbor) => (
        <Link key={neighbor.cca2} to={`/details/${neighbor.cca2}`} className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors">
       
          <img
            src={neighbor?.flags.png}
            alt={`Bandera de ${neighbor?.name?.common}`}
            className="w-full h-24 object-cover rounded-md mb-3"
          />
            <p className="text-center font-medium">{neighbor.name.common}</p>
        </Link>
      ))}
    </div>
  );
};
