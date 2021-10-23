import React, { useState } from "react"
import {
    FavoriteBorderOutlined,
   
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import styled from "styled-components";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
  margin: 5vh;
  width: 80vw;
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
`; */
const ImgContainer = styled.div`
  height: 100%;
  width: 80vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const Image = styled.img`
  height: 30vh;
  width: 60vw;
  z-index: 2;
`; 
 
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
border: 2px solid;
border-radius: 20px;
margin-bottom: 1vh;
padding: 10px;
background-color: #f3caca;
flex: 4;
`
const SpanBig = styled.span`
font-size: 24px;
flex: 2;
`
const FilterSize = styled.select`
 
`;
const FilterSizeOption = styled.option``;



const PizzaInfo=({pizza})=>{
  const handleChange = (e) =>{
    console.log("test",e.target.value)
    setPizzaIndex(e.target.value)
  }
  const {isLogged} = useSelector((state) => state.user);
  const [pizzaIndex,setPizzaIndex]= useState(0)
  const dispatch = useDispatch();
  const handleAddPizza=()=>{
    if(isLogged)
    {
      toast.success('Pizza dodana u narudzbe')
      const {size,price,...others}=pizza
      dispatch(addProduct({pizza:{size:pizza.size[pizzaIndex],price:pizza.price[pizzaIndex], ...others}}));
    }

    else{
      toast.warning('please login to shop', );
    }
    
    
  }
    return( 
  
        <Container>
       
      
        <Info>
        <FilterSize  onChange={handleChange} >
           {pizza.size.map((size,i)=>(
             <FilterSizeOption  key={i} value={i} >{size}{pizza.price[i]}</FilterSizeOption>
           ))}
            </FilterSize>                                                                 
          <Icon>
            <ShoppingCartOutlined onClick={()=>handleAddPizza()} />
          </Icon>
         
          <Icon>
            <FavoriteBorderOutlined />
          </Icon> 
        </Info>
       {pizza &&<ImgContainer>
              <Image src={pizza.img} />
            </ImgContainer>}
       {pizza && <SpanBig>{pizza.name}</SpanBig>}
       {pizza &&<Span>{pizza.desc}</Span>}
       {pizza && <Span>Cijena{" "}{pizza.price.toFixed(2)}€ or ~{" "}{(pizza.price*7.43).toFixed(2)}Kn </Span>}
       {pizza &&<Span>Sastojci:{" "}{pizza.ingredients.join(", ")}</Span>}
       {pizza && <Span>Lajkova:{" "}{pizza.likes.length}</Span>}
        
       <ToastContainer />
      </Container>
     
    )
   
}

export default PizzaInfo