import ImageCard from './ImageCard';
import React,{useState,useEffect} from 'react';
import PokemonDetail from './PokemonDetail';
import ReactPaginate from 'react-paginate';
import {useNavigate} from 'react-router-dom';
import './styles/styles.css';
import {Grid,Card} from 'semantic-ui-react';
const FrontPage = props =>{
  const navigate = useNavigate();

  if (props.pokeData === undefined) return null;
  //if (pokeDetail === true) return <PokemonDetail details = {pokeData[pokeIndex]} whichPoke = {pokeIndex} data={data}/>
  return (
    <div>
      <Grid columns={5} padded>
        {props.pokeData.map((src,index)=>{
          return(
            <Grid.Column key={index} onClick={(e)=>props.renderPokeDetail(index,e)}>
              <Card>
              <ImageCard urls={src.sprites.front_default} />
                <Card.Description>{src.name}</Card.Description>
              </Card>
            </Grid.Column>
          )
        })}
      </Grid>
    </div>
  )
};

export default FrontPage;
