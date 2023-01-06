import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import PokeSelect from './PokeSelect';
import { useOutlet } from 'react-router-dom';
import { Grid, Container, Stack, Pagination, Space } from '@mantine/core';
import 'semantic-ui-css/semantic.min.css';
import FrontPage from './FrontPage';
import pokeapi from '../api/pokeapi';
const App=() => {
  const [responseCount, setResponseCount] = useState(0);
  const [pokeData,setPokeData] = useState();//data storage from api
  const limit = 6;
  const pagecount = Math.ceil(responseCount/limit);
  const [page, setPage] = useState(1);
  const child = useOutlet();
  const [loading, setLoading] = useState(false); //loader spinner need to make it better later on

  
  const getPokeImageUrl = async (offset,limit)=>{ // too many api request need redux
    setLoading(true);
    const response = await pokeapi.get(`/pokemon?offset=${offset}&limit=${limit}`);
    const PokeImageUrl = response.data.results.map(async el=>await pokeapi.get(el.url));
    Promise.all(PokeImageUrl)
      .then(poke=>poke.map(result=>result.data))
      .then(pokeData=>setPokeData(pokeData));
    setResponseCount(response.data.count);
    setLoading(false);
  }
  const renderFrontPage = () =>{
    return(
      <>
        <FrontPage pokeData={pokeData} />
        <Space h="md"/>
        <Pagination total={pagecount} size="xs" onChange={setPage} page={page} />
        {loading ? <span>loading...</span>: null}
      </>
    )
  }
  useEffect(()=>{
    getPokeImageUrl((page - 1) * 6,limit);
  },[page])
  return (
    <Container size="2000px" p="xl">
      <Stack align="center">
        <SearchBar />
        <PokeSelect setPokeData={setPokeData} />
      </Stack>
      <Grid grow columns={12} justify="center" mt="5vh" style={{'height':'500px', 'width':'1000px', 'backgroundColor': '#ffff', 'padding': '40px'}}>
          <Grid.Col span={5}>
            {child || ''}
          </Grid.Col>
          <Grid.Col span={7}>
            {renderFrontPage()}
          </Grid.Col >
      </Grid>
    </Container>
  );
}
export default App;