import ImageCard from './ImageCard';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/styles.css';
import {Grid,Card} from 'semantic-ui-react';
const FrontPage = props =>{
  const location = useLocation();
  const { pokeData } = location.state;
  return (
    <div>
      <Grid columns={5} padded>
        {pokeData && pokeData.map((src,index)=>{
          return(
            <Grid.Column key={index} >
              <Link to={`/PokemonDetail/${src.id}`}>
              <Card>
                <ImageCard urls={src.sprites.front_default} />
                  <Card.Description>{src.name}</Card.Description>
                </Card>
              </Link>
            </Grid.Column>
          )
        })}
      </Grid>
    </div>
  )
};

export default FrontPage;
