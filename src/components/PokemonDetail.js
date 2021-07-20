import React from 'react';

const PokemonDetail = props =>{
  console.log(props.types);
  return (
    <div>
      <div>name:{props.details.name}</div>
      <div>height:{props.details.height}</div>
      <div>base experience:{props.details.base_experience}</div>
      <div>types:{props.details.types.map(type=><span>{type.type.name} </span>)}</div>
    </div>
  )
}

export default PokemonDetail;
