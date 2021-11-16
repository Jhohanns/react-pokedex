import styles from './DialogDetail.module.scss';
import catchIcon from './../../assets/Icons/Catch.png';
import releaseIcon from './../../assets/Icons/Release.png';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useContext } from 'react';
import { PokemonContext } from '../../context/pokemonContext';
import { useState } from 'react';
import { useEffect } from 'react';
import PokemonContextActions from './../../context/pokemonContext/actions';
import Mode from '../../utils/mode';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';

const DialogDetail = ({ onClose, open, mode }) => {
  const {
    state: { selectedPokemon },
    dispatch,
  } = useContext(PokemonContext);
  const [pokemonInfo, setPokemonInfo] = useState({});

  useEffect(() => {
    setPokemonInfo(selectedPokemon);
    return () => {
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

  const releasePokemon = () => {
    dispatch({
      type: PokemonContextActions.releasePokemon,
      data: pokemonInfo,
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
                    releasePokemon();
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
        </div>
      </div>
    </Dialog>
  );
};

export default DialogDetail;
