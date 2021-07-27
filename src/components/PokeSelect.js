import React from 'react';
import Select from 'react-select';
import pokeapi from '../api/pokeapi';
const options = [
  {value:1,label:'Female'},
  {value:2,label:'Male'},
  {value:3,label:'Genderless'}
];

const PokeSelect = (props)=>(
  <Select
    label="Select Pokemon"
    options={options} 
    className="pokeselect"
    onChange={props.onSelectChange}
  />
)

export default PokeSelect;
