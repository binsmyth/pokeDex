import React from 'react';
import {Image} from 'semantic-ui-react';

const ImageCard = props=>{
  return (
    <div>
      <Image src={props.urls} centered/>
    </div>
  )
}

export default ImageCard;
