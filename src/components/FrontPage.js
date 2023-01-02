import ImageCard from './ImageCard';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import { SimpleGrid, Card, Text } from '@mantine/core';
const FrontPage = props =>{
  return (
    <SimpleGrid cols={3}>
      {props.pokeData && props.pokeData.map((src,index)=>{
        return (
          <div key={index} >
            <Link to={`/PokemonDetail/${src.id}`} state={{id:src.id}}>
              <Card p="lg" shadow="sm">
                <Card.Section><ImageCard urls={src.sprites.front_default} /></Card.Section>
                <Card.Section><Text align="center" lineClamp={1} size="xs">{src.name}</Text></Card.Section>
              </Card>
            </Link>
          </div>
        )
      })}
    </SimpleGrid>
  )
};

export default FrontPage;
