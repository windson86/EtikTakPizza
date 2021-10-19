import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";
import {ArrowBackIosOutlined,ArrowForwardIosOutlined} from '@material-ui/icons'
const Container=styled.div`
width: 100%;
height: 80vh;
display: flex;
background-color: #f5ccbd;
${mobile({ padding: "0px", flexDirection:"column" })}
`
const Arrow=styled.div`
cursor: pointer;
width: 50px;
height: 50px; 
background-color: #e7cbcb;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
left: ${props=>props.direction === "left" && "10px"};
right: ${props=>props.direction === "right" && "10px"};
margin: auto;
opacity: 0.5;

`
const Slider = () => {
    return (
        <Container>
           <Arrow direction="left"> 
            <ArrowBackIosOutlined/>
            </Arrow>
            <Arrow direction="right">
            <ArrowForwardIosOutlined/>
            </Arrow>
        </Container>
    )
}

export default Slider
