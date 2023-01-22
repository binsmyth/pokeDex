import React from "react";
import ImageCard from "../ImageCard";
import { Avatar } from "@mantine/core";

const AvatarImage = ({urls, id}) =>{
    return(
        <Avatar radius="xl" size="xl">
            <ImageCard urls={urls} id={id}/>
        </Avatar>
    )
}
export default AvatarImage;