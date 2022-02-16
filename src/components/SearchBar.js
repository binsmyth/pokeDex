import React, { useState } from 'react';
import {Button,Form,Input} from 'semantic-ui-react';

const SearchBar = ({onSubmit}) =>{
  const [term,setTerm] = useState("");
  const onFormSubmit = e => {
    e.preventDefault();
    console.log("term", term)
    onSubmit(term);
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