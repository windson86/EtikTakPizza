import React from 'react';
import styled from 'styled-components'
import {ShoppingCartOutlined} from '@material-ui/icons'
import { useSelector} from 'react-redux'
import { mobile } from '../responsive'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout} from "../redux/userRedux"



 
const Container = styled.div`
height: 8vh;
background-color: #ec9494;
${mobile({ height: "15vh" })}
`

const Wrapper = styled.div`

display: flex;
height: 100%;
justify-content: space-between;
align-items: center;
background-color: #ffffff;
${mobile({ padding: "0px 0px" })}
`
const Left = styled.div`
flex: 1;
display: flex;
width: 40%;
align-items: center;
justify-content: space-evenly;
 ${mobile({ flexDirection: "column"})}
`


const Logo = styled.h1`
font-weight: bold;
text-align: center;

${mobile({ fontSize: "12px" })}
`
const Center = styled.div`
flex: 1;
width: 20%;
align-items: center;
`
const Right = styled.div`
flex: 1;
width: 40%;
display: flex;
align-items: center;
justify-content: space-evenly;
${mobile({ flexDirection: "column"})}

`
const NavItem = styled.div`
cursor: pointer;
width: 20vw;
height: 2vh;
text-align: center;
border-radius: 10px;
background-color: aliceblue;
border: 3px solid blue;
${mobile({ padding: "10px 5px",margin:'2px' })}
`
const Test = styled.div`
cursor: pointer;
`

const StyledLink = styled(Link)`
    text-decoration: none;
flood-color: white;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


const Navbar = () => {
    const {isLogged} = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const user=useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
   const handleLogout=()=>{
  
       dispatch(
        logout()
      );
      
   }
   
    return (
        <Container>
            <Wrapper>
           <Left>
           <Link style={{ 
            textDecoration: 'none',
            textDecorationStyle:"none" }} 
            to="/menu">  
            <NavItem>Menu</NavItem>
            </Link>   

        { isLogged && cart.quantity===0 && <NavItem>Orders</NavItem>}
        { isLogged && cart.quantity>0 && <NavItem>Orders({cart.quantity})</NavItem>}
        { isLogged && <Link to ="/checkout"><ShoppingCartOutlined></ShoppingCartOutlined></Link>}
                

           
        </Left>    
            
       <Center><Logo>Tik Tak Pizza</Logo></Center>    
           
        <Right>
        {!isLogged && 
           <StyledLink style={{ textDecoration: 'none' }} to="/register">   
           <NavItem>Register</NavItem>
           </StyledLink>} 
        
         {!isLogged && 
           <Link style={{ textDecoration: 'none' }} to="/login">  
            <NavItem>Login</NavItem>
            </Link>}    
          
         
         
         {isLogged && 
            <NavItem>{user.firstName}</NavItem>} 
            {isLogged && 
          <Test 
          onClick={()=>handleLogout()} >Logout
          </Test>}  
           </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
