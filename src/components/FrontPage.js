//import React from 'react';
//import ImageCard from './ImageCard.js';
import React,{useState,useEffect} from 'react';
const FrontPage = props =>{
  const [images,setImage] = useState();
  useEffect(()=> {
    Promise.all(props.poke)
      .then(poke=>poke.map(poke=>poke.data.sprites.front_default))
      .then(image=>setImage(image))
  },[setImage,props.poke])
  if (images === undefined) return null;
  return (
    <div>
      {images.map((src,index)=>(<img src={src} key={index}/>))} 
    </div>
  )
};

export default FrontPage;
