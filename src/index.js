import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import FrontPage from './components/FrontPage';
import ImageCard from './components/ImageCard';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import ModalPokemonDetail from './components/ModalPokemonDetail/ModalPokemonDetail';
import { Route,Routes } from 'react-router-dom';
import { Loader, MantineProvider } from '@mantine/core';
createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Suspense fallback={<Loader />}><App /></Suspense>} >
        <Route path="/FrontPage" element={<Suspense fallback={<Loader />}><FrontPage /></Suspense>} />
        <Route path="/PokemonDetail/:index" element={<Suspense fallback={<Loader />}><PokemonDetail /></Suspense>} />
        <Route path="/ModalPokemonDetail/:index" element={<Suspense fallback={<Loader />}><ModalPokemonDetail /></Suspense>} />
        <Route path="/Search" element={<Suspense fallback={<Loader />}><ImageCard /></Suspense>} />
      </Route>
    </Routes>
  </BrowserRouter>);
