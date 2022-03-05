import React,{useState,useEffect} from 'react';
import {Image,Card,List} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import pokeapi from '../api/pokeapi';

const PokemonDetail = props =>{
  const [detail, setDetail] = useState();
  let params = useParams();
  const getDetail = async() => {
    const data = await pokeapi.get(`pokemon/${parseInt(params.index) + 1}`);
    setDetail(data);
  }
  useEffect (()=>{
    getDetail();
    console.log(parseInt(params.index) + 1);
  },[params])
  return (
    <Card>
      {console.log(detail)}
      <Image src={detail?.data.sprites.front_default} size='medium'/>
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
