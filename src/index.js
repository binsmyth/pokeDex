import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import FrontPage from './components/FrontPage';
import ImageCard from './components/ImageCard';
import PokemonDetail from './components/PokemonDetail';
import { Route,Routes } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>loading...</div>}><App /></Suspense>} >
        <Route path="/FrontPage" element={<Suspense fallback={<div>loading...</div>}><FrontPage /></Suspense>} />
        <Route path="/PokemonDetail/:index" element={<Suspense fallback={<div>loading...</div>}><PokemonDetail /></Suspense>} />
        <Route path="/Search" element={<Suspense fallback={<div>loading...</div>}><ImageCard /></Suspense>} />
      </Route>
    </Routes>
  </BrowserRouter>, 
  document.querySelector('#root')
);
