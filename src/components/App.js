import React, { useEffect, useState } from 'react';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import pokeapi from '../api/pokeapi';
import SearchBar from './SearchBar';
import FrontPage from './FrontPage';
import PokeSelect from './PokeSelect';
import ImageCard from './ImageCard';
import 'semantic-ui-css/semantic.min.css';
const App=() => {
  const [pokemons, setPokemons] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [submit, setSubmit] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  let navigate = useNavigate();

  const onSelectChange = async (option,a) =>{
    const response = await pokeapi.get(`/gender/${option.value}`);
    const pokemonURL = response.data.pokemon_species_details.map((value)=>`${value.pokemon_species.name}`);
    const pokeSelectUrlList = paginate(pokemonURL,0,10);
    const getImageUrl = pokeSelectUrlList.map(async el=>await pokeapi.get(`/pokemon/${el}`));
    setPokemons(getImageUrl);
  }
  const paginate = (array,offset,limit) =>{
    return array.slice(offset*limit,offset*limit+limit);
  }
  const onSearchSubmit = async term => {
    try{
      const response = await pokeapi.get(`/pokemon/${term}`);
      setSearchUrl(response.data.sprites.back_default);
    }
    catch(error){
      console.log(error)
    }
    setSubmit(true);
  };
  const getPokeImageUrl = async (offset,limit)=>{
    const response = await pokeapi.get(`/pokemon?offset=${offset}&limit=${limit}`);
    const getPokeImageUrl = response.data.results.map(async el=>await pokeapi.get(el.url));
    setPokemons(getPokeImageUrl);
    setResponseCount(response.data.count);
  }
  useEffect(()=>{
    if(submit) {
      navigate('/Search', { replace: true });
    } else {
      navigate('/FrontPage',{ replace: true });
      getPokeImageUrl(0,10);
    }
  },[submit])
  return (
    <div className='ui container'>
      <SearchBar onSubmit={onSearchSubmit} />
      <PokeSelect onSelectChange={onSelectChange}/>
      {!submit ? 
        <FrontPage poke={pokemons} responseCount={responseCount} getPokeImageUrl={getPokeImageUrl}/>:
        <ImageCard urls={searchUrl}/>
      }
    </div>
  );
}
export default App;