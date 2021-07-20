import React from 'react';
import pokeapi from '../api/pokeapi.js';
import SearchBar from './SearchBar';
import ImageCard from './ImageCard';
import FrontPage from './FrontPage.js';
class App extends React.Component {
  state = { 
            pokemons:[],
            submit:false,
            searchUrl:""
          };
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
  

  componentDidMount = async ()=>{
    const response = await pokeapi.get('/pokemon?offset=0&limit=30');
    const getPokeImageUrl = response.data.results.map(async el=>await pokeapi.get(el.url));
    this.setState({pokemons:getPokeImageUrl});
  }
  render() {
    return (
      <div className='ui container'>
        <SearchBar onSubmit={this.onSearchSubmit} />
        {!this.state.submit ? <FrontPage poke={this.state.pokemons}/>:<ImageCard urls={this.state.searchUrl}/>}
      </div>
    );
  }
}

export default App;
