import React from 'react';
//import Select from 'react-select';
import { Select } from '@mantine/core';
import pokeapi from '../api/pokeapi';
const options = [
  {label:'Female',text:'Female',value:1},
  {label:'Male',text:'Male',value:2},
  {label:'Genderless',text:'Genderless',value:3}
];

const PokeSelect = (props)=>{
  const change = (option)=>{
    onSelectChange(option);
  }
  const paginate = (array,offset,limit) =>{
    return array.slice(offset*limit,offset*limit+limit);
  }
  
  const onSelectChange = async (option) =>{
    const response = await pokeapi.get(`/gender/${option}`);
    const pokemonURL = response.data.pokemon_species_details.map((value)=>`${value.pokemon_species.name}`);
    const pokeSelectUrlList = paginate(pokemonURL,0,6);
    const getImageUrl = pokeSelectUrlList.map(async el=>await pokeapi.get(`/pokemon/${el}`));
    Promise.all(getImageUrl)
      .then(poke=>poke.map(result=>result.data))
      .then(pokeData=>props.setPokeData(pokeData));
  }
  return (
    <div>
      <Select
      label="Type of pokemons"
      placeholder="Pick one"
      data={options}
      onChange={(value) => change(value)}
    />
    </div>
  )
}

export default PokeSelect;
