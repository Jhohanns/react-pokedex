import { createContext } from "react";

const initialState = {
    pokemons: [],
    capturedPokemons: [],
    selectedPokemon: {},
};

const PokemonContext = createContext(initialState);

export {
    PokemonContext,
    initialState
};