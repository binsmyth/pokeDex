import ImageCard from './ImageCard';
import React,{useState,useEffect} from 'react';
import PokemonDetail from './PokemonDetail';

const renderPokeDetail = ()=>{
 console.log (<PokemonDetail />)
}

const FrontPage = props =>{
  const [pokeData,setPokeData] = useState();//data storage from api
  const [pokeDetail, setPokeDetail] = useState(false);//show or hide the pokemon details
  const [pokeIndex,setPokeIndex] = useState();//which pokemon was clicked
  const data = props.poke;

  const renderPokeDetail = (index,e)=>{
    e.preventDefault();
    if (pokeDetail === false) setPokeDetail(true);
    if (pokeDetail === true) setPokeDetail(false);
    setPokeIndex(index);
  }
  
  useEffect(()=> {
    Promise.all(data)
      .then(poke=>poke.map(result=>result.data))
      .then(pokeData=>setPokeData(pokeData))
  },[setPokeData,data])
  
  console.log(pokeData); 
  
  if (pokeData === undefined) return null;
  if (pokeDetail === true) return <PokemonDetail details = {pokeData[pokeIndex]}/>
  return ( 
    <div>
      {pokeData.map((src,index)=>{
        return(
          <div key={index} onClick={(e)=>renderPokeDetail(index,e)}>
            <ImageCard urls={src.sprites.front_default} />
            {src.name}
          </div>
        )
      })} 
    </div>
  )
};

export default FrontPage;
