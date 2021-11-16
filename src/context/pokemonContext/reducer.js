import PokemonContextActions from "./actions";

const userReducer = (state, action) => {
  switch (action.type) {
    case PokemonContextActions.setPokemons:
      console.log(action);
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.data],
      };
    case PokemonContextActions.setSelectedPokemon:
      console.log(action);
      return {
        ...state,
        selectedPokemon: action.data,
      };
    case PokemonContextActions.nextPokemon: {
      console.log(action);
      const currentPokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === state.selectedPokemon.id
      );
      const nextPokemon = state.pokemons[currentPokemonIndex + 1];
      return {
        ...state,
        selectedPokemon: nextPokemon || state.selectedPokemon,
      };
    }

    case PokemonContextActions.previousPokemon: {
      console.log(action);
      const currentPokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === state.selectedPokemon.id
      );
      const previousPokemon = state.pokemons[currentPokemonIndex - 1];
      return {
        ...state,
        selectedPokemon: previousPokemon || state.selectedPokemon,
      };
    }

    case PokemonContextActions.previousCapturedPokemon:{
      console.log(action);
      const currentPokemonIndex = state.capturedPokemons.findIndex(
        (pokemon) => pokemon.id === state.selectedPokemon.id
      );
      const previousPokemon = state.capturedPokemons[currentPokemonIndex - 1];
      return {
        ...state,
        selectedPokemon: previousPokemon || state.selectedPokemon,
      };
    }
    case PokemonContextActions.nextCapturedPokemon:{
      console.log(action);
      const currentPokemonIndex = state.capturedPokemons.findIndex(
        (pokemon) => pokemon.id === state.selectedPokemon.id
      );
      const previousPokemon = state.capturedPokemons[currentPokemonIndex + 1];
      return {
        ...state,
        selectedPokemon: previousPokemon || state.selectedPokemon,
      };
    }
    case PokemonContextActions.capturePokemon:{
      console.log(action);
      const currentPokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.data.id
      );
      const mappedPokemon = {...action.data, captured: true};

      state.pokemons.splice(currentPokemonIndex, 1, mappedPokemon);
      console.log('Pokemon to remove ', state);
      return {
        ...state,
        capturedPokemons: [...state.capturedPokemons, action.data],
        selectedPokemon: mappedPokemon
      };
    }
    case PokemonContextActions.releasePokemon:{
      console.log(action);
      const currentPokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.data.id
      );
      const newCapturedPokemons = state.capturedPokemons.filter(
        (pokemon) => pokemon.id !== action.data.id
      );
      const mappedPokemon = {...action.data, captured: false};

      state.pokemons.splice(currentPokemonIndex, 1, mappedPokemon);
      return {
        ...state,
        capturedPokemons: newCapturedPokemons,
        selectedPokemon: mappedPokemon
      };
    }
    default:
      return { ...state };
  }
};

export default userReducer;
