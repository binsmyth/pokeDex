import React,{ useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import pokeapi from '../api/pokeapi';
import { Card, Text, List, Image } from '@mantine/core';

const PokemonDetail = props =>{
  const [detail, setDetail] = useState();
  const [descript, setDescription] = useState();
  const location = useLocation();
  let { index } = useParams();
  let pokeImageSrc = location?.state?.id ? location?.state?.id : index;
  const id = pokeImageSrc.toString()?.padStart(3, "0");

  useEffect (()=>{
    const getDetail = async() => {
      const data = await pokeapi.get(`pokemon/${pokeImageSrc}`);
      const description = await pokeapi.get(`pokemon-species/${pokeImageSrc}`);
      setDescription(description);
      setDetail(data);
    }
    getDetail();
  },[location, pokeImageSrc, descript])
  return (
    <div>
      <Card shadow="sm" p="10px" radius="md" withBorder sx={{width:"80%"}}>
        <Card.Section component="a">
          <Image src={id<906 ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`: detail?.data.sprites.front_default} height={200} fit="contain" />
        </Card.Section>
        <Card.Section >
          <Text weight={1000}>{detail?.data.name}</Text>
          <List center spacing="10px" listStyleType="none">
            <List.Item><Text >height:{detail?.data.height}</Text></List.Item>
            <List.Item>base experience:{detail?.data.base_experience}</List.Item>
            <List.Item>types:{detail?.data.types.map((type,index)=><span key={index}>{type.type.name}{index < detail.length ? " | " : null} </span>)}</List.Item>
            <List.Item>description:{descript?.data?.flavor_text_entries[0].flavor_text}</List.Item>
          </List>
        </Card.Section>
      </Card>
    </div>
  )
}

export default PokemonDetail;
