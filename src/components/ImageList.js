import React from 'react';
//import './ImageList.css';
import ImageCard from './ImageCard.js';

const ImageList = props => {
  const images = props.urls.map((image,index) => (
    <ImageCard key={index} urls={image} />
  ));
  return <div>{images}</div>;
};

export default ImageList;
