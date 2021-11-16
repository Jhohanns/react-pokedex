import './App.scss';
import { PokemonProvider } from './context/pokemonContext';
import { BrowserRouter } from "react-router-dom";
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <PokemonProvider>
        <Home />
      </PokemonProvider>
    </BrowserRouter>
  );
}

export default App;
