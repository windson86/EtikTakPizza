import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {getFavoritePizzas} from "../redux/ApiCalls"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";

const Container =styled.div`
width: 100vw;
height:80%;
display: flex;
background-color: #bddbd7;
${mobile({ display: "none" })}
`
const Arrow =styled.div`
 width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`
const Wrapper =styled.div`
height: 100%;

  display: flex;
 
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`
const Slide =styled.div`
width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  background-color: #bddbd7;
`

const ImgContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  margin: 20px 20px;
  border-radius: 30px;
justify-content: center;
align-items: center;
 
`;

const Image = styled.img`
border-radius: 20%;
width: 30vh;
  height: 30vh;
  background-color: white;
 
`;
const InfoContainer = styled.div`
  align-items: center;
  display:flex;
  width: 80vw;
  margin-bottom: 20px;
  flex-direction: column;
  background-color: #97ddd4;
  border-radius: 40px;
 
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Desc = styled.p`
  margin: 20px 20px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  border-radius: 30px;
  background-color: transparent;
  cursor: pointer;
`;
const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const dispatch = useDispatch();
    
    const pizzas = useSelector((state) => state.pizzas.pizzas);
    const handleClick = (direction) => {
        if (direction === "left") {
          setSlideIndex(slideIndex > 0 ? slideIndex-1 : pizzas.length-1);
        } else {
          setSlideIndex(slideIndex < pizzas.length-1 ? slideIndex+1 : 0);
        }
      };
     
  
    useEffect(() => {
       getFavoritePizzas(dispatch)
      }, [dispatch]);

  return (
    <Container>
        
     <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
       { pizzas.map((pizza)=>( 
       <Slide >
           <ImgContainer>
              <Image src={pizza.img} />
            </ImgContainer>
            <InfoContainer>
                
              <Title>{pizza.name}</Title>
              <Desc>{pizza.desc}</Desc>
              <Button>Naruci</Button>
            </InfoContainer>
        </Slide>))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;