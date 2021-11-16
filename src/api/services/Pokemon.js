
import parseDetails from '../../utils/parsePokemonDetails';
const axios = require('axios');

export async function getPokemonsFirstPage() {
    try {
        const getPokemons = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150")
            .then((data) => {
                const realResults = data.data.results;
                const calls = new Array(realResults.length)
                    .fill({})
                    .map((x, index) => {
                        return axios.get(realResults[index].url);
                    });
                return axios.all(calls).then((pokemonDetails) => {
                    const parsedPokemons = pokemonDetails.map((pokemon) =>
                        parseDetails(pokemon.data)
                    );
                    return parsedPokemons;
                });
            });

        return getPokemons;
    } catch (error) {
        return error;
    }



    // console.log("realessssss ", resultados);
    //   dispatch({
    //     type: PokemonContextActions.setPokemons,
    //     data: results,
    //   });
};