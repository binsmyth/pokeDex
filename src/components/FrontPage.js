import ImageCard from './ImageCard';
import React,{useState,useEffect} from 'react';
import PokemonDetail from './PokemonDetail';
import ReactPaginate from 'react-paginate';
import './styles/styles.css';
import {Grid,Card} from 'semantic-ui-react';
const FrontPage = props =>{
  const [pokeData,setPokeData] = useState();//data storage from api
  const [pokeDetail, setPokeDetail] = useState(false);//show or hide the pokemon details
  const [pokeIndex,setPokeIndex] = useState();//which pokemon was clicked
  const data = props.poke;
  const limit = 10;
  const pagecount = Math.ceil(props.responseCount/limit);
  
  //when pokemon div is clicked open pokemon details
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
  
  const handlePageClick = (data)=>{
    props.getPokeImageUrl(data.selected*10,limit);
  } 
  if (pokeData === undefined) return null;
  if (pokeDetail === true) return <PokemonDetail details = {pokeData[pokeIndex]} whichPoke = {pokeIndex} data={data}/>
  return (
    <div>
      <Grid columns={5} padded>
        {pokeData.map((src,index)=>{
          return(
            <Grid.Column key={index} onClick={(e)=>renderPokeDetail(index,e)}>
              <Card>
              <ImageCard urls={src.sprites.front_default} />
                <Card.Description>{src.name}</Card.Description>
              </Card>
            </Grid.Column>
          )
        })}
      </Grid>
      <ReactPaginate 
        onPageChange={handlePageClick}
        pageCount={pagecount}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  )
};

export default FrontPage;
