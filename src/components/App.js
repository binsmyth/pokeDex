import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokeapi from '../api/pokeapi';
import SearchBar from './SearchBar';
import PokeSelect from './PokeSelect';
import { useOutlet } from 'react-router-dom';
import { Grid, Container, Stack } from '@mantine/core';
import { /*Container, Grid,*/ Segment, Divider } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ReactPaginate from 'react-paginate';
import FrontPage from './FrontPage';
const App=() => {
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
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageClick}
            pageCount={pagecount}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageRangeDisplayed={1}
          />
      </>
    )
  }
  useEffect(()=>{
    getPokeImageUrl(0,limit);
  },[])
  return (
    <Container size="xs">
      <Stack>
        <SearchBar />
        <PokeSelect setPokeData={setPokeData} />
      </Stack>
      <Segment>
        <Grid>
          <Grid.Col span={6}>
            Welcome to Pokedex
            {child || ''}
          </Grid.Col>
          <Grid.Col span={6}>
            {renderFrontPage()}
          </Grid.Col >
        </Grid>
      </Segment>
    </Container>
  );
}
export default App;