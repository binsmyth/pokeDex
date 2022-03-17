import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokeapi from '../api/pokeapi';
import SearchBar from './SearchBar';
import PokeSelect from './PokeSelect';
import ImageCard from './ImageCard';
import { useOutlet } from 'react-router-dom';
import { Container, Grid, Segment, Divider, Search } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ReactPaginate from 'react-paginate';
import FrontPage from './FrontPage';
const App=() => {
  const [searchUrl, setSearchUrl] = useState("");
  const [submit, setSubmit] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [pokeData,setPokeData] = useState();//data storage from api
  const limit = 6;
  const pagecount = Math.ceil(responseCount/limit);
  const child = useOutlet();
  let navigate = useNavigate();
  const handlePageClick = (d)=>{
    getPokeImageUrl(d.selected*6,limit);
  } 

  const getPokeImageUrl = async (offset,limit)=>{ // too many api request need redux
    const response = await pokeapi.get(`/pokemon?offset=${offset}&limit=${limit}`);
    const PokeImageUrl = response.data.results.map(async el=>await pokeapi.get(el.url));
    Promise.all(PokeImageUrl)
      .then(poke=>poke.map(result=>result.data))
      .then(pokeData=>setPokeData(pokeData))
    setResponseCount(response.data.count);
  }
  const renderFrontPage = () =>{
    return(
      <>
        <FrontPage pokeData={pokeData} />
        <ReactPaginate 
            onPageChange={handlePageClick}
            pageCount={pagecount}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
      </>
    )
  }
  useEffect(()=>{
    getPokeImageUrl(0,limit);
  },[])
  return (
    <Container className='poke-container'>
      <Segment>
        <Search />
        <SearchBar setSubmit={setSubmit} setSearchUrl={setSearchUrl} />
        <PokeSelect setPokeData={setPokeData} />
      </Segment>
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            {child || 'Welcome to Pokedex'}
          </Grid.Column>
          <Grid.Column>
            {renderFrontPage()}
          </Grid.Column>
        </Grid>
        <Divider vertical></Divider>
      </Segment>
      {
        submit &&
          <ImageCard urls={searchUrl}/>
      }
    </Container>
  );
}
export default App;