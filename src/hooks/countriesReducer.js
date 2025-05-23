import { sortCountries, filterBy, searchBy  } from "./countriesReducer.utils";
import { actionTypes } from "./types";

export const countriesReducer = (state, action) => {

    switch (action.type) {
        case actionTypes.set:
            return {
                ...state,
                allCountries: action.payload,
                filteredCountries: action.payload,
            };

        case actionTypes.sort:
            return {
                ...state,
                filteredCountries: sortCountries(state.filteredCountries, action.payload),
                allCountries: sortCountries(state.allCountries, action.payload),
            };

        case actionTypes.filter:
            return {
                ...state,
                filteredCountries: filterBy(state.allCountries, action.payload),
            };

         case actionTypes.search:
            return {
                ...state,
                filteredCountries: searchBy(state.allCountries, action.payload),
            };

        default:
            return state;
    }
}