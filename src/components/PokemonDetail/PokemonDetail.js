import styles from './PokemonDetail.module.scss';
import catchIcon from './../../assets/Icons/Catch.png';
import releaseIcon from './../../assets/Icons/Release.png';
import detailsIcon from './../../assets/Icons/Details.png';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useContext } from 'react';
import { PokemonContext } from '../../context/pokemonContext';
import { useState } from 'react';
import { useEffect } from 'react';
import PokemonContextActions from './../../context/pokemonContext/actions';
import Mode from '../../utils/mode';
import DialogDetail from './../DialogDetail/DialogDetail';

const PokemonDetail = ({ mode }) => {
  const {
    state: { selectedPokemon },
    dispatch,
  } = useContext(PokemonContext);
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPokemonInfo(selectedPokemon);
    return () => {
      console.log('RETURNNNNNNNNNN');
      setPokemonInfo({});
    };
  }, [selectedPokemon]);

  const nextPokemon = () => {
    dispatch({
      type: PokemonContextActions.nextPokemon,
      data: mode,
    });
  };

  const previousPokemon = () => {
    dispatch({
      type: PokemonContextActions.previousPokemon,
      data: mode,
    });
  };

  const capturePokemon = () => {
    dispatch({
      type: PokemonContextActions.capturePokemon,
      data: pokemonInfo,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      {!pokemonInfo.name ? (
        <div className={styles.container}>
          <span className={styles.empty}>SELECT A POKEMON</span>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <IconButton
              aria-label="back"
              size="large"
              onClick={() => {
                previousPokemon();
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <span className={styles.title}>
              {pokemonInfo.name} - {pokemonInfo.id}
            </span>
            <IconButton
              aria-label="next"
              size="large"
              onClick={() => {
                nextPokemon();
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>

          <img
            src={pokemonInfo.image}
            className={styles.pokemonImage}
            alt="pokemon"
          ></img>

          <div className={styles.actionsContainer}>
            <div className={styles.btnContainer}>
              {pokemonInfo?.captured || mode === Mode.capturedPokemons ? (
                <>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      capturePokemon();
                    }}
                  >
                    <img src={releaseIcon} alt="pokemon"></img>
                  </IconButton>
                  <span>RELEASE</span>
                </>
              ) : (
                <>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      capturePokemon();
                    }}
                  >
                    <img src={catchIcon} alt="pokemon"></img>
                  </IconButton>
                  <span>CAPTURE</span>
                </>
              )}
            </div>
            <div className={styles.btnContainer} onClick={handleClickOpen}>
              <IconButton aria-label="delete" size="small">
                <img src={detailsIcon} alt="pokemon"></img>
              </IconButton>
              <span>DETAILS</span>
            </div>
          </div>
          <DialogDetail open={open} onClose={handleClose} mode />
        </div>
      )}
    </>
  );
};

export default PokemonDetail;
