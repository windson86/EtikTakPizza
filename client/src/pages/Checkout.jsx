
import { useSelector,useDispatch } from "react-redux";
import styled from "styled-components";
import Navbar from '../components/Navbar'
import OnSale from '../components/OnSale'
//import { desktop } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import {userRequest} from "../requestMetods"
import { useHistory } from "react-router";
import {clearProductFromCart,clearCart} from "../redux/cartRedux"

// ${desktop({ flexDirection: "" })}

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
 
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const RemoveItemButton = styled.button`
  width:20vw;
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
 
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;


const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
 
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 80px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  
`;


 
 

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;



const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  //const [pizzaSize, setSize] = useState("");
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => 
  {
    const makeRequest = async () =>
    {
      try 
      {
        const res = await userRequest.post("checkout/payment", 
        {
          tokenId: stripeToken.id,
          amount: cart.total,
        });

        history.push("/success", 
        {
          stripeData: res.data,
          products: cart.products, 
        });
      } 
      catch {}
    };
      stripeToken && makeRequest();
  }, [stripeToken, cart, history]);

  const emptyCartByProduct=(product)=>
  {
      dispatch(clearProductFromCart(product))
  }   
    
return (
<div>
    <OnSale/>
    <Navbar />
    <Container>
     
     
      <Wrapper>
        <Title>Narudzba</Title>
        <Top>
          <TopButton>natrag na jelovnik</TopButton>
          <TopTexts>
            besplatna dostava
          </TopTexts>
          
        </Top>

       
          <Center> 
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Pizza:</b> {product.name}
                        </ProductName>
                          <ProductSize>
                            {product.size}
                          </ProductSize>
                      </Details>        
                 </ProductDetail>      
                  <PriceDetail>
                      <ProductPrice>
                        ??? {product.price}
                      </ProductPrice>
                  </PriceDetail>
                  <RemoveItemButton onClick={()=>emptyCartByProduct(product)}>delete</RemoveItemButton>
              </Product> ))}
               <TopButton onClick={()=>dispatch(clearCart())}>clear cart</TopButton>   
          </Info>            
          </Center>      
        <Bottom>       
        <Summary>
            <SummaryTitle>Za platiti karticom:</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Ukupno</SummaryItemText>
              <SummaryItemPrice>??? {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Cijena Dostave</SummaryItemText>
              <SummaryItemPrice>???0.8</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Popust na Online dostavu</SummaryItemText>
              <SummaryItemPrice>??? -0.8</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Ukupno:</SummaryItemText>
              <SummaryItemPrice>{cart.total.toFixed(2)}???</SummaryItemPrice>
            </SummaryItem>
            
            
            <StripeCheckout
              name="Tik Tak Pizza naplata"
              image=""
              billingAddress
              shippingAddress
              description={`Ukupno za platiti ???${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey="pk_live_51JmDLKLa14A3QCJeBvbyQsMTF0o3hL2LjnPi4UWLNmq4kiArf9KXnxsFziMeok05lXgU1WdbDcZ8gguklnSPQsaO000MYJLoeQ"
            >
              <Button>Plati</Button>
            </StripeCheckout>
          </Summary>      
            
           
          
         
         
        
          
          
        </Bottom>
      </Wrapper>
     
    </Container>
  </div>
  );
};

export default Checkout;
