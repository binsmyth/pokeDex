import React from 'react';
import { Image } from '@mantine/core';
// import {Image} from 'semantic-ui-react';

const ImageCard = props=>{
  return (
    <div>
      <Image src={props.urls}/>
    </div>
  )
}

export default ImageCard;
