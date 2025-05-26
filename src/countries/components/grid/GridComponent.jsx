import { useCountries } from "../../../hooks/useCountries";
import { GridItem } from "./GridItem";

export const GridComponent = ({ countriesList = [] }) => {
  const tableHeaders = ["Flag", "Name", "Population", "Area km²", "Region"];

  return (
    <div className="w-full pl-8">
      <div className="grid grid-cols-5 items-center border-b border-gray-500 py-2 px-4 rounded-t-md text-sm font-semibold text-gray-500">
        {tableHeaders.map((header) => (
          <div key={header}>{header}</div>
        ))}
      </div>

      {countriesList.map((country) => (
        <GridItem key={country.name.common} country={country}></GridItem>
      ))}
    </div>
  );
};
