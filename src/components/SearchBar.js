import React, { useState } from 'react';
import { Form, Input } from 'semantic-ui-react';
import pokeapi from '../api/pokeapi';

const SearchBar = ({onSubmit, setSearchUrl, setSubmit}) =>{
  const [term,setTerm] = useState("");
  const onFormSubmit = e => {
    e.preventDefault();
    onSearchSubmit(term);
  };
  const onSearchSubmit = async term => {
    try{
      const response = await pokeapi.get(`/pokemon/${term}`);
      setSearchUrl(response.data.sprites.front_default);
    }
    catch(error){
      console.log(error)
    }
    setSubmit(true);
  };
  return(
    <Form onSubmit={(e) => onFormSubmit(e)}>
      <Input
        fluid
        icon="search"
        size="big"
        className="prompt"
        placeholder="Image Search..."
        onChange={e => setTerm(e.target.value)}
        type='text'
      />
    </Form>
  )
}
export default SearchBar;