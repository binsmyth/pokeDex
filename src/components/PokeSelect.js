import React from 'react';
//import Select from 'react-select';
import {Dropdown} from 'semantic-ui-react'; 
import pokeapi from '../api/pokeapi';
const options = [
  {key:'Female',text:'Female',value:1},
  {key:'Male',text:'Male',value:2},
  {key:'Genderless',text:'Genderless',value:3}
];

const change = (option,props)=>{
  console.log(option);
  props.onSelectChange(option,"a");
}
const PokeSelect = (props)=>(
  <Dropdown
    placeholder="Select Pokemon Type"
    fluid
    selection
    options={options} 
    onChange={(option,value)=>change(value,props)}
  />
)

export default PokeSelect;
