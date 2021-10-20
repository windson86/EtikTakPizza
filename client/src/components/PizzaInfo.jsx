import React from "react"
import {
    FavoriteBorderOutlined,
   
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import styled from "styled-components";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
`;

/* const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`; */

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Span = styled.span`
text-align :center;
`
const SpanBig = styled.span`
font-size: 24px;
`



const PizzaInfo=({pizza})=>{
  const dispatch = useDispatch();
  const handleAddPizza=()=>{
    dispatch(
      addProduct({ pizza})
    );

  }
    return( 
  
        <Container>
       
      
        <Info>
          <Icon>
            <ShoppingCartOutlined onClick={()=>handleAddPizza()} />
          </Icon>
          
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>
        
       {pizza && <SpanBig>{pizza.name}</SpanBig>}
       {pizza &&<Span>{pizza.desc}</Span>}
       {pizza && <Span>Cijena{" "}{pizza.price.toFixed(2)}€</Span>}
       {pizza &&<Span>Sastojci:{" "}{pizza.ingredients.join(", ")}</Span>}
       {pizza && <Span>Lajkova:{" "}{pizza.likes.length}</Span>}
        

      </Container>
     
    )
   
}

export default PizzaInfo