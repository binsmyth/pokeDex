import React from 'react';
import unsplash from '../api/unsplash.js';
import SearchBar from './SearchBar';
//import ImageList from './ImageList.js';
import FrontPage from './FrontPage.js';
class App extends React.Component {
  state = { 
            pokemons:[]
          };
  onSearchSubmit = async term => {
    const response = await unsplash.get(`/pokemon/${term}`);
    console.log(response.data)
  };
  

  componentDidMount = async ()=>{
    const response = await unsplash.get('/pokemon');
    const getPokeImageUrl = response.data.results.map(async el=>await unsplash.get(el.url));
    this.setState({pokemons:getPokeImageUrl});
  }
  render() {
    return (
      <div className='ui container'>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <FrontPage poke={this.state.pokemons}/>
      </div>
    );
  }
}

export default App;
