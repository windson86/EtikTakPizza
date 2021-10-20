import {getFavoritePizzas} from "../redux/ApiCalls"
import { useSelector,useDispatch } from "react-redux";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState,useEffect } from "react";
import styled from "styled-components";

import { mobile } from "../responsive";
import { addProduct } from "../redux/cartRedux";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #a7dfd7;
  
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
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
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #a7dfd7;
`;

const ImgContainer = styled.div`
  height: 50%;
  width: 50%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
  width: 100%;
  background-color: #a7dfd7;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {

  const dispatch = useDispatch();
  const pizzas = useSelector((state) => state.pizzas.pizzas);

   

  useEffect(() => {
     getFavoritePizzas(dispatch)
    }, [dispatch]);

  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {pizzas.map((pizza) => (
          <Slide  key={pizza._id}>
            <ImgContainer>
              <Image src={pizza.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{pizza.name}</Title>
              <Desc>{pizza.ingredients.join(", ")}</Desc>
              <Desc>{pizza.desc}</Desc>
              <Button onClick={()=>dispatch(addProduct({pizza}))}>Naruči</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
