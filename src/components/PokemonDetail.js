import React,{ useState, useEffect } from 'react';
import { Image, Card, List } from 'semantic-ui-react';
import { useLocation, useParams } from 'react-router-dom';
import pokeapi from '../api/pokeapi';

const PokemonDetail = props =>{
  const [detail, setDetail] = useState();
  const location = useLocation();
  let { index } = useParams();
  let pokeImageSrc = location?.state?.id ? location?.state?.id : index;
  const id = pokeImageSrc.toString()?.padStart(3, "0");
  useEffect (()=>{
    const getDetail = async() => {
      const data = await pokeapi.get(`pokemon/${pokeImageSrc}`);
      setDetail(data);
    }
    console.log(pokeapi.get(`pokemon/${pokeImageSrc}`));
    // if(!location.state) return;
    getDetail();
  },[location, pokeImageSrc])
  return (
    <Card centered>
      <Image src={id<906 ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`: detail?.data.sprites.front_default} size='medium'/>
      <Card.Content>

      <Card.Header>{detail?.data.name}</Card.Header>
      <Card.Description>
        <List>
          <List.Item>height:{detail?.data.height}</List.Item>
          <List.Item>base experience:{detail?.data.base_experience}</List.Item>
          <List.Item>types:{detail?.data.types.map((type,index)=><span key={index}>{type.type.name} </span>)}</List.Item>
        </List>
      </Card.Description> 
      </Card.Content>
    </Card>
  )
}

export default PokemonDetail;
