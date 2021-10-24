import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import OnSale from '../components/OnSale'
import OrdersRow from '../components/OrdersRow'
import { userRequest } from '../requestMetods'
import {clearProductFromCart,clearCart} from "../redux/cartRedux"

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

const RemoveItemButton = styled.button`
  width:15vw;
  height:35%;
  padding-right: 1vw;
`



const Orders = () => {
    const cart = useSelector((state)=>state.cart)
    const user = useSelector((state)=>state.user.currentUser)
    const orders = useSelector((state)=>state.orders.orders)
    
    
    const dispatch = useDispatch();
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
        }catch(err){console.log(err)}
        
    }
  

    let heading
    let noOrdersMessage
    let ordersSorted
    const isAdmin = false
    if (isAdmin) {
      ordersSorted = orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((o, i) => (<OrdersRow key={o._id} order={o} index={i}  />))
      heading = 'Pending Orders'
      noOrdersMessage = 'There are currently no pending orders!'
    } else {
      ordersSorted = orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((o, i) => (<OrdersRow key={o._id} order={o} index={i} />))
      heading = 'My Orders'
      noOrdersMessage = 'You have not made any orders!'
    }

    const CreateOrder = async () =>{
          try {
            const res = await userRequest.post("/orders/create",{
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
          } catch (error) {
            
          }

    }


    return (
        <div>
        <OnSale/>
        <Navbar/>
            <Container>
               <TopCreateOrder>
               <Info>
            {cart.products.map((product,prodIndex) => (
              <Product>
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
               <button onClick={()=>dispatch(clearCart())}>clear cart</button> 
               <button onClick={()=>CreateOrder()}>order</button>
               <button onClick={()=>testDelivery()}>check delivery</button>  
          </Info>   
               </TopCreateOrder>
               <div className='container' style={{'paddingTop': 25}}>
        <h1 className='text-center'>{heading}</h1>
        <div className='row' style={{'paddingTop': 25}}>
          <div className='col-md-12' id='customer-orders'>
            <div className='box'>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>View</th>
                      {isAdmin && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {ordersSorted}
                  </tbody>
                </table>
                {ordersSorted.length === 0 && <h3 className='text-warning'>{noOrdersMessage}</h3>}
              </div>
            </div>
          </div>
        </div>
      </div>

            </Container>
            <Footer/>
        </div>
    )
}

export default Orders
