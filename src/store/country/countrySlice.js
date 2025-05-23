import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
    name: 'countries',
    initialState:
    {
        page: 0,
        pokemons: [],
        isloading: false,

        filters:{
            

        }
    },
    reducers: {
        startLoadingPokemons: (state) => {
            state.isloading = true
        },
        setPokemons: (state, action) => {
            state.isloading = false;
            state.page = action.payload.page;
            state.pokemons = action.payload.pokemons;
        }
    },
})

export const { startLoadingPokemons, setPokemons } = pokemonSlice.actions 