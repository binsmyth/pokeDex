import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Input, Search } from 'semantic-ui-react';
import pokeapi from '../api/pokeapi';
import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const SearchBar = ({ onSubmit }) =>{
  const [term, setTerm] = useState("");
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();

  const onFormSubmit = e => {
    e.preventDefault();
    onSearchSubmit(form.values.term);
  };
  
  const form = useForm({
    initialValues:{
      term:'',
    },
  });
  const onSearchSubmit = async term => {
    try{
      const response = await pokeapi.get(`/pokemon/${term}`);
      navigate(`/PokemonDetail/${response.data.id}`, {state : { id: response.data.id }});
    }
    catch(error){
      console.log(error)
    }
  };

  const handleChange = e =>{
    setSearch({title: e.target.value});
    form.setFieldValue('term', e.currentTarget.value);
  }
  return(
    <form onSubmit={(e) => onFormSubmit(e)}>
      <TextInput
        aria-label="Search"
        type="search"
        placeholder="Search..."
        value={form.values.term}
        onChange={handleChange}
      />
    </form>
  )
}
export default SearchBar;