import React from 'react';
import pokeapi from '../api/pokeapi';
import SearchBar from './SearchBar';
import ImageCard from './ImageCard';
import FrontPage from './FrontPage';
import PokeSelect from './PokeSelect';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Navigate,Route,Routes} from 'react-router-dom';
class App extends React.Component {
  state = { 
            pokemons:[],
            submt:false,
            searchUrl:"",
            responseCount:0
            };

  onSelectChange = async (option,a) =>{
    const response = await pokeapi.get(`/gender/${option.value}`);
    const pokemonURL = response.data.pokemon_species_details.map((value)=>`${value.pokemon_species.name}`);
    const pokeSelectUrlList = this.paginate(pokemonURL,0,10);
    const getImageUrl = pokeSelectUrlList.map(async el=>await pokeapi.get(`/pokemon/${el}`));
    this.setState({pokemons:getImageUrl});
  }

  paginate = (array,offset,limit) =>{
    return array.slice(offset*limit,offset*limit+limit);
  }

  onSearchSubmit = async term => {
    try{
      const response = await pokeapi.get(`/pokemon/${term}`);
      this.setState({searchUrl:response.data.sprites.back_default});
    }
    catch(error){
      console.log(error)
    }
    this.setState({submit:true});
  };
  

  getPokeImageUrl = async (offset,limit)=>{
    const response = await pokeapi.get(`/pokemon?offset=${offset}&limit=${limit}`);
    const getPokeImageUrl = response.data.results.map(async el=>await pokeapi.get(el.url));
    this.setState({pokemons:getPokeImageUrl});
    this.setState({responseCount:response.data.count});
  }

  componentDidMount(){
    this.getPokeImageUrl(0,10); 
  }

  render() {
    return (
      <Router>
        <div className='ui container'>
          <SearchBar onSubmit={this.onSearchSubmit} />
          <PokeSelect onSelectChange={this.onSelectChange}/>
          {// {!this.state.submit ? <FrontPage poke={this.state.pokemons} responseCount={this.state.responseCount} getPokeImageUrl={this.getPokeImageUrl}/>:<ImageCard urls={this.state.searchUrl}/>}
          }</div>
        {!this.state.submit?<Navigate to="/Frontpage"/>:null}
        <Routes>
          <Route path="/FrontPage" element={<FrontPage poke={this.state.pokemons} responseCount={this.state.responseCount} getPokeImageUrl={this.getPokeImageUrl}/>}>></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
