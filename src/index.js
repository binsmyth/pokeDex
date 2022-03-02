import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import FrontPage from './components/FrontPage';
import ImageCard from './components/ImageCard';
import PokemonDetail from './components/PokemonDetail';
import {Navigate,Route,Routes,Switch} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="/FrontPage" element={<FrontPage />} />
        <Route path="/PokemonDetail" element={<PokemonDetail />} />
        <Route path="/Search" element={<ImageCard />} />
      </Route>
    </Routes>
  </BrowserRouter>, 
  document.querySelector('#root')
);
