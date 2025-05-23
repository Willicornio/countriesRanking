import { useCountries } from "../../../hooks/useCountries";
import { GridItem } from "./GridItem";


export const GridComponent = ({ countriesList = [] }) => {


  const users = [
    { id: 1, name: "Juan", email: "juan@example.com" },
    { id: 2, name: "María", email: "maria@example.com" },
    { id: 3, name: "Carlos", email: "carlos@example.com" },
  ];
  return (
    <div className="w-full pl-8">
      <div className="grid grid-cols-5 border-b border-gray-500 font-semibold py-2 px-4 rounded-t-md text-gray-500 text-sm font-semibold rounded-t-md">
        <div>Flag</div>
        <div>Name</div>
        <div>Population</div>
        <div>Area km^2</div>
        <div>Region</div>
      </div>

      {countriesList.map((country) => (
        <GridItem key={country.name.common} country={country}></GridItem>
      ))}
    </div>
  );
};
