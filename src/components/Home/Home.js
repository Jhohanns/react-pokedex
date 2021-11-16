import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import styles from "./Home.module.scss";
import {
  PokemonContext,
  PokemonContextActions,
} from "../../context/pokemonContext";
import AllPokemons from "./../AllPokemons/AllPokemons";
import CapturedPokemons from "../CapturedPokemons/CapturedPokemons";
import { getPokemonsFirstPage } from "../../api/services/Pokemon";

const Home = () => {
  const { dispatch } = useContext(PokemonContext);

  useEffect(() => {
    const pokemonsFirst = async () => {
      const pokemonsFirstPage = await getPokemonsFirstPage();
      dispatch({
        type: PokemonContextActions.setPokemons,
        data: pokemonsFirstPage,
      });
    };
    pokemonsFirst();
  }, []);

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="pokemons" element={<AllPokemons />} />
        <Route path="captured-pokemons" element={<CapturedPokemons />} />
        <Route path="/" element={<Navigate replace to="/pokemons" />} />
      </Routes>
    </div>
  );
};

export default Home;
