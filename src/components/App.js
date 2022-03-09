import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokeapi from '../api/pokeapi';
import SearchBar from './SearchBar';
import PokeSelect from './PokeSelect';
import ImageCard from './ImageCard';
import { Outlet, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import ReactPaginate from 'react-paginate';
const App=() => {
  const [searchUrl, setSearchUrl] = useState("");
  const [submit, setSubmit] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [pokeData,setPokeData] = useState();//data storage from api
  const limit = 10;
  const pagecount = Math.ceil(responseCount/limit);
  let navigate = useNavigate();

  const handlePageClick = (d)=>{
    getPokeImageUrl(d.selected*10,limit);
  } 

  const getPokeImageUrl = async (offset,limit)=>{ // too many api request need redux
    const response = await pokeapi.get(`/pokemon?offset=${offset}&limit=${limit}`);
    const PokeImageUrl = response.data.results.map(async el=>await pokeapi.get(el.url));
    Promise.all(PokeImageUrl)
      .then(poke=>poke.map(result=>result.data))
      .then(pokeData=>setPokeData(pokeData))
    setResponseCount(response.data.count);
  }

  useEffect(()=>{
    if(submit) {
      navigate('/Search', { replace: true });
    }
    getPokeImageUrl(0,10);
  },[submit,navigate])
  return (
    <div className='ui container'>
      <SearchBar setSubmit={setSubmit} setSearchUrl={setSearchUrl} />
      <PokeSelect setPokeData={setPokeData} />
      <Link to={`/Frontpage`} state={{ pokeData: pokeData }}>
        View all Pokemons
      </Link>
      {
        submit &&
          <ImageCard urls={searchUrl}/>
      }
      <Outlet />
      <ReactPaginate 
        onPageChange={handlePageClick}
        pageCount={pagecount}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}
export default App;