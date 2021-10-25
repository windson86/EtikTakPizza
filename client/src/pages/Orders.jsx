import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import OnSale from '../components/OnSale'
import GetOrders from '../components/GetOrders'
import {fetchUserOrders} from "../redux/ordersRedux"
import { userRequest } from '../requestMetods'
import {clearProductFromCart,clearCart} from "../redux/cartRedux"
import { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";

const Container= styled.div`
width: 100vw;
height: 60vh;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`
const TopCreateOrder=styled.div`
width: 100vw;
height: 100%;
display: flex;
justify-content: space-between;
align-items: center;

`
const Info = styled.div`
 display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;

const OrderButtons=styled.div`
display: flex;

justify-content: space-between;
align-items: center;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
 
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 20vw;
  height: 9vh;
`;

const Details = styled.div`
 width: 40vw;
display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;


const PriceDetail = styled.div`
 width: 40vw;
  display: flex;
 
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`

`;
const TotalRow = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const RemoveItemButton = styled.button`
  width:15vw;
  height:35%;
  padding-right: 1vw;
`



const Orders = () => {
    const cart = useSelector((state)=>state.cart)
    const user = useSelector((state)=>state.user.currentUser)
   const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchUserOrders(user._id))
    
    },[dispatch,user]);
   
    const emptyCartByProduct=(product)=>
  {
      dispatch(clearProductFromCart(product))
      
  }  
    const testDelivery= async()=>{
    
        try{
            const res = await userRequest.post("delivery/check", 
        {
          cart:cart
        }).then();
        console.log(res)
        }catch(err){console.log(err)}}

  const CreateOrder = async () =>{
      if(!user.address)return toast("nema adrese")
      if(cart.products.length>0){try {
        const res = await userRequest.post(`/orders/create/${user._id}`,{
          userId: user._id,
          products: cart.products.map((item)=>(
           {  productId: item._id,
              size: item.size
          })),
           amount:cart.total,
           address:user.address,
           date:Date.now()
        })
        console.log(res.data)
        toast.success("order completed")
        dispatch(clearCart())
      } catch (error) {
        
      }}
            else{toast.warning("cart empty")}

    }


    return (
        <div>
          <ToastContainer/>
        <OnSale/>
        <Navbar/>
            <Container>
               <TopCreateOrder>
           {cart.products.length>0 &&  
          <Info>
            {cart.products.map((product,prodIndex) => (
              <Product key={prodIndex}>
                <ProductDetail>
                  <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Pizza:</b> {product.name}
                        </ProductName>
                         
                      </Details>        
                 </ProductDetail>      
                  <PriceDetail>
                      <ProductPrice>
                       {product.size} € {product.price}
                      </ProductPrice>
                      <RemoveItemButton onClick={()=>emptyCartByProduct(product)}>delete</RemoveItemButton>
                  </PriceDetail>
                 
              </Product> ))}
              <TotalRow>Ukupno: {cart.total} $</TotalRow>
              <OrderButtons>
               <button onClick={()=>dispatch(clearCart())}>clear cart</button> 
               <button onClick={()=>CreateOrder()}>order</button>
               <button onClick={()=>testDelivery()}>check delivery</button>  
               </OrderButtons>
          </Info> }     
               </TopCreateOrder>
              <GetOrders/>

            </Container>
            <Footer/>
        </div>
    )
}

export default Orders
