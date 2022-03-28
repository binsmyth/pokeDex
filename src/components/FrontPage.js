import ImageCard from './ImageCard';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/styles.css';
import {Grid,Card} from 'semantic-ui-react';
const FrontPage = props =>{
  return (
    <Grid relaxed='very' columns={3}>
      {props.pokeData && props.pokeData.map((src,index)=>{
        return (
          <Grid.Column key={index} >
            <Link to={`/PokemonDetail/${src.id}`} state={{id:src.id}}>
            <Card>
              <ImageCard urls={src.sprites.front_default} />
                <Card.Description>{src.name}</Card.Description>
              </Card>
            </Link>
          </Grid.Column>
        )
      })}
    </Grid>
  )
};

export default FrontPage;
