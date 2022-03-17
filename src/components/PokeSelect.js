import React from 'react';
//import Select from 'react-select';
import {Dropdown} from 'semantic-ui-react'; 
import pokeapi from '../api/pokeapi';
const options = [
  {key:'Female',text:'Female',value:1},
  {key:'Male',text:'Male',value:2},
  {key:'Genderless',text:'Genderless',value:3}
];

const PokeSelect = (props)=>{
  const change = (option)=>{
    onSelectChange(option);
  }
  const paginate = (array,offset,limit) =>{
    return array.slice(offset*limit,offset*limit+limit);
  }
  
  const onSelectChange = async (option) =>{
    const response = await pokeapi.get(`/gender/${option.value}`);
    const pokemonURL = response.data.pokemon_species_details.map((value)=>`${value.pokemon_species.name}`);
    const pokeSelectUrlList = paginate(pokemonURL,0,10);
    const getImageUrl = pokeSelectUrlList.map(async el=>await pokeapi.get(`/pokemon/${el}`));
    Promise.all(getImageUrl)
      .then(poke=>poke.map(result=>result.data))
      .then(pokeData=>props.setPokeData(pokeData));
  }
  return (
    <Dropdown
      placeholder="Select Pokemon Type"
      fluid
      selection
      options={ options } 
      onChange={ (option, value) => change(value) }
    />
  )
}

export default PokeSelect;
