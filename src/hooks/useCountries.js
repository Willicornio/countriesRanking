import { countriesReducer } from "./countriesReducer";
import React, { useEffect, useReducer } from "react";
import { actionTypes } from "./types";

actionTypes
export const useCountries = () => {

    const initialState = {
        allCountries: [],
        filteredCountries: []
    };

    const [{filteredCountries}, dispatch] = useReducer(countriesReducer, initialState);

    const setCountries = (data) => {
        const action = {
            type: actionTypes.set,
            payload: data,
        };
        dispatch(action);
    }

    const sortBy = (type) => {
        const action = {
            type: actionTypes.sort,
            payload: type,
        };
        dispatch(action);
    }

    const filterBy = (filter) => {
        const action = {
            type: actionTypes.filter,
            payload: filter,
        };
        dispatch(action);
    }

     const searchBy = (filter) => {
        console.log("filter: ", filter)
        const action = {
            type: actionTypes.search,
            payload: filter,
        };
        dispatch(action);
    }

    

    return {
        countries: filteredCountries,
        setCountries,
        sortBy,
        filterBy,
        searchBy
    };
}