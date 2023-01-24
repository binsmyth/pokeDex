import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import PokeSelect from './PokeSelect';
import { useOutlet, Outlet } from 'react-router-dom';
import { Grid, Container, Stack, Pagination, Space, SimpleGrid, Input, Flex, Loader, createStyles, Modal } from '@mantine/core';
import FrontPage from './FrontPage';
import pokeapi from '../api/pokeapi';
import { usePagination, useMediaQuery } from '@mantine/hooks';
import { MantineProvider } from '@mantine/core';
import themes from './themes/themes';
// import { ExampleContext } from './ModalContext';
const App=() => {
  const [responseCount, setResponseCount] = useState(0);
  const [pokeData,setPokeData] = useState();//data storage from api
  const limit = 6;
  const pagecount = Math.ceil(responseCount/limit);
  const [page, setPage] = useState(1);
  const child = useOutlet();
  const [loading, setLoading] = useState(false); //loader spinner need to make it better later on
  const pagination = usePagination({total:pagecount});
  const [openModal, setOpenModal] = useState(false);

  const useStyles = createStyles((theme) => ({
    grid:{
      width:'1000px',
      borderRadius:'10px',
      [`@media (max-width: ${theme.breakpoints.sm}px)`]:{
        width:'500px',
      },
    },
    childgrid:{
      [`@media (max-width:${theme.breakpoints.sm}px)`]:{
        display: 'none'
      },
      [`@media (max-width:${theme.breakpoints.md}px)`]:{
        display: 'none'
      },
    }
  }))

  const {classes} = useStyles();

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
    if(loading){
      return(
        <Loader />
      )
    }
    return(
      <>
        <FrontPage pokeData={pokeData} setOpenModal={setOpenModal}/>
        <Space h="md" />
        <Pagination total={pagecount} boundaries={1} size="xs" onChange={setPage} page={page} />
        <Space h="md" />
        <Flex>
          Jump To Page : 
          <Space w="md" />
          <Input
            size="xs"
            sx={{width:'70px', fontSize: '5px'}} 
            onKeyDown={event => {
              if(event.key === 'Enter'){
                setPage(parseInt(event.target.value));
              }
            }}
          />
        </Flex>
      </>
    )
  }
  useEffect(()=>{
    getPokeImageUrl((page - 1) * 6,limit);
  },[page])

  return (
    <MantineProvider theme={themes}>
      <Container size="lg" pb="10vh" pt="5vh" >
        <Stack align="center">
          <SearchBar />
          <PokeSelect setPokeData={setPokeData} />
        </Stack>
        <Grid columns={12} mt="5vh" p={40} className={classes.grid} bg="#ffff" >
            <Grid.Col md={6} lg={7} sm={0} span={6} className={classes.childgrid}>
              {<Outlet context={[openModal,setOpenModal]}/>}
            </Grid.Col>
            
            <Grid.Col md={6} lg={5} sm={1} span={12}>
              {renderFrontPage()}
            </Grid.Col >
        </Grid>
      </Container>
    </MantineProvider>
  );
}
export default App;