import { useContext, useEffect } from 'react';
import styles from './AllPokemons.module.scss';
import { PokemonContext } from '../../context/pokemonContext';
import { Button, TextField, IconButton, CircularProgress   } from '@mui/material';
import { useState } from 'react';
import PokemonList from './../PokemonList/PokemonList';
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import { Link } from 'react-router-dom';
import Mode from './../../utils/mode';
import homeIcon from './../../assets/Icons/Home.png';

const AllPokemons = () => {
  const {
    state: { pokemons },
  } = useContext(PokemonContext);

  const [pokemonName, setPokemonName] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    console.log('effect 44');
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  const filterPokemons = () => {
    console.log('filter');
    pokemonName.trim() &&
      setFilteredPokemons(
        pokemons.filter((item) => item.name.includes(pokemonName.trim())),
      );
  };

  const clearFilter = () => {
    console.log('clear');
    setFilteredPokemons(pokemons);
  };

  const inputChanged = (e) => {
    console.log('change');
    const name = e.target.value;
    if (!name) {
      clearFilter();
    }
    setPokemonName(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TextField
          id="outlined-basic"
          label="Search by name"
          className={styles.input}
          variant="outlined"
          value={pokemonName}
          onChange={(e) => inputChanged(e)}
          size="small"
        />
        <Button
          variant="contained"
          className={styles.btn}
          onClick={filterPokemons}
        >
          SEARCH
        </Button>
        <Link to="/captured-pokemons" replace>
          <IconButton aria-label="delete" className={styles.home} size="small">
            <img src={homeIcon} alt="pokemon"></img>
          </IconButton>
        </Link>
      </div>
      <div className={styles.content}>
        {!pokemons.length ? (
          <div className={styles.spinner}>
          <CircularProgress />
          </div>
        ) : (
          <>
            <div className={styles.list}>
              <PokemonList pokemons={filteredPokemons} />
            </div>
            <div className={styles.detail}>
              <PokemonDetail mode={Mode.pokemons} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllPokemons;
