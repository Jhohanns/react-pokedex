import { useContext, useEffect } from 'react';
import styles from './CapturedPokemons.module.scss';
import { PokemonContext } from '../../context/pokemonContext';
import { Button, TextField, IconButton, CircularProgress } from '@mui/material';
import { useState } from 'react';
import PokemonList from './../PokemonList/PokemonList';
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import Mode from './../../utils/mode';
import { Link } from 'react-router-dom';
import homeIcon from './../../assets/Icons/Home.png';

const CapturedPokemons = () => {
  const {
    state: { capturedPokemons },
  } = useContext(PokemonContext);

  const [pokemonName, setPokemonName] = useState('');
  const [filteredCapturedPokemons, setFilteredCapturedPokemons] = useState([]);

  useEffect(() => {
    console.log('effect');
    setFilteredCapturedPokemons(capturedPokemons);
  }, [capturedPokemons]);

  const filterPokemons = () => {
    console.log('filter');
    pokemonName &&
      setFilteredCapturedPokemons(
        capturedPokemons.filter((item) => item.name.includes(pokemonName)),
      );
  };

  const clearFilter = () => {
    console.log('clear');
    setFilteredCapturedPokemons(capturedPokemons);
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
        <Link to="/pokemons" replace>
          <IconButton aria-label="delete" className={styles.home} size="small">
            <img src={homeIcon} alt="pokemon"></img>
          </IconButton>
        </Link>
      </div>
      <div className={styles.content}>
        {!capturedPokemons.length ? (
          <div className={styles.spinner}>
            <CircularProgress />

            Looks empty here
          </div>
        ) : (
          <>
            <div className={styles.list}>
              <PokemonList pokemons={filteredCapturedPokemons} />
            </div>
            <div className={styles.detail}>
              <PokemonDetail mode={Mode.capturedPokemons} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CapturedPokemons;
