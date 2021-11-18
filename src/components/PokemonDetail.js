import React,{useState,useEffect} from 'react';
import {Image,Card,List} from 'semantic-ui-react';

const PokemonDetail = props =>{
  const [pokeData,setPokeData] = useState();
  console.log(props);
  
  useEffect(()=>{
    Promise.all(props.data)
      .then(poke=>poke.map(result=>result.data))
      .then(pokeData=>setPokeData(pokeData))
  },[setPokeData,props.data]);
  console.log(props.whichPoke);
  return (
    <Card>
      <Image src={props.details.sprites.front_default} size='medium'/>
      <Card.Content>

      <Card.Header>{props.details.name}</Card.Header>
      <Card.Description>
        <List>
          <List.Item>height:{props.details.height}</List.Item>
          <List.Item>base experience:{props.details.base_experience}</List.Item>
          <List.Item>types:{props.details.types.map((type,index)=><span key={index}>{type.type.name} </span>)}</List.Item>
        </List>
      </Card.Description> 
      </Card.Content>
    </Card>
  )
}

export default PokemonDetail;
