import { useContext, useEffect } from 'react';
import { PokemonContext } from '../../context/pokemonContext';
import styles from './PokemonList.module.scss';
import PokemonContextActions from './../../context/pokemonContext/actions';

const PokemonList = ({ pokemons }) => {
  const { dispatch } = useContext(PokemonContext);

  useEffect(() => {
    selectPokemon({});
  }, []);

  const selectPokemon = (pokemon) => {
    dispatch({
      type: PokemonContextActions.setSelectedPokemon,
      data: pokemon,
    });
  };

  return (
    <div className={styles.list}>
      {pokemons?.map((pokemon) => (
        <div
          key={pokemon.name}
          className={styles.one}
          onClick={() => {
            selectPokemon(pokemon);
          }}
        >
          <div className={styles.info}>
            <span>{pokemon.name}</span>
            <span className={styles.captured}>
              {pokemon.captured ? 'Captured' : ''}
            </span>
          </div>
          <img src={pokemon.image} alt="pokemon"></img>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
