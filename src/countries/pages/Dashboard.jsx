import React, { useEffect } from "react";
import { useGetCountriesQuery } from "../../store/api/countriesApi";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { SideBarComponent } from "../components/sideBar/SideBarComponent";
import { GridComponent } from "../components/grid/GridComponent";
import { useCountries } from "../../hooks/useCountries";

export const Dashboard = () => {
  const { data: countriesData } = useGetCountriesQuery();

  const { countries, setCountries, sortBy, filterBy, searchBy } =
    useCountries();

  useEffect(() => {
    if (!countriesData) return;
    setCountries(countriesData);
  }, [countriesData]);

  return (
      <div className="container mx-auto max-w-7xl">
        <HeaderComponent
          searchBy={searchBy}
          numberCountries={countries.length}
        ></HeaderComponent>
        <div className="flex pt-8">
          <SideBarComponent
            sortBy={sortBy}
            filterBy={filterBy}
          ></SideBarComponent>
          <GridComponent countriesList={countries}></GridComponent>
        </div>
      </div>
  );
};
