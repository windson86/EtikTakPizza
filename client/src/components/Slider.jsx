import React,{ useEffect, useState} from 'react'
import { useSelector,useDispatch } from "react-redux";
import styled from 'styled-components'
import { mobile } from "../responsive";
import {getFavoritePizzas} from "../redux/ApiCalls"
import {ArrowBackIosOutlined,ArrowForwardIosOutlined} from '@material-ui/icons'
import PizzaInfo from "../components/PizzaInfo"
const Container=styled.div`
width: 100%;
height: 65vh;
display: flex;
align-items: center;
justify-content: center;

background-color: #d9f1db;
${mobile({ padding: "0px",  })}
`
const Arrow=styled.div`
flex: 1;
cursor: pointer;
width: 50px;
height: 50px; 
background-color: #cbe7da;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: flex;
top: 0;
bottom: 0;
left: ${props=>props.direction === "left" && "10px"};
right: ${props=>props.direction === "right" && "10px"};
margin: auto;
opacity: 0.5;

`
const Wrapper = styled.div`
flex:6;
  height: 100%;
  display: flex;
  align-items: center;
justify-content: center;
${mobile({ width: "75%" })}

 
`
/* const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`; */




const Slider = () => {
    const dispatch = useDispatch();

   const [index,setIndex]=useState(1)
   const incIndex = () => setIndex(index + 1);
   let decIndex = () => setIndex(index - 1);
   if(index<0) {
    setIndex(2);
  }
  if(index>2){
    setIndex(0)
  }
    const pizzas = useSelector((state) => state.pizzas.pizzas);

   

    useEffect(() => {
       getFavoritePizzas(dispatch)
      }, [dispatch]);
 
    return (
        <Container>
           <Arrow direction="left" value="left" onClick={()=>decIndex()}> 
            <ArrowBackIosOutlined/>
            </Arrow>
            <Wrapper>
          <PizzaInfo pizza={pizzas[index]} />
            </Wrapper>
            <Arrow direction="right" value="right" onClick={()=>incIndex()}>
            <ArrowForwardIosOutlined/>
            </Arrow>
        </Container>
    )
}

export default Slider
