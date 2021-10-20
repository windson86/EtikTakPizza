import React from 'react';
import styled from 'styled-components'
import {ShoppingCartOutlined} from '@material-ui/icons'
import { useSelector} from 'react-redux'
import { mobile } from '../responsive'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout} from "../redux/userRedux"



 
const Container = styled.div`
height: 60px;
background-color: #ffffff;
${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
padding : 10px 20px;
display: flex;
justify-content: space-between;
align-items: center;
${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: space-evenly;
`


const Logo = styled.h1`
font-weight: bold;
text-align: center;

${mobile({ fontSize: "12px" })}
`
const Center = styled.div`
flex: 1;
align-items: center;
`
const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: space-evenly;

`
const NavItem = styled.div`
cursor: pointer;
`
const Test = styled.div`
cursor: pointer;
`

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


const Navbar = () => {
    const {isLogged} = useSelector((state) => state.user);
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
         
        
           {!isLogged && 
           <StyledLink style={{ textDecoration: 'none' }} to="/register">   
           <NavItem>Register</NavItem>
           </StyledLink>} 
           {!isLogged && 
           <Link style={{ textDecoration: 'none' }} to="/login">  
            <NavItem>Login</NavItem>
            </Link>} 
         
          {  isLogged && 
          <Test 
          onClick={()=>handleLogout()} >Logout
          </Test>} 
             { isLogged && 
             <NavItem>{user.firstName}</NavItem>}
            
            </Left>
           <Center><Logo>Tik Tak Pizza</Logo></Center>
           
           <Right>
           {isLogged && 
           <Link style={{ textDecoration: 'none',textDecorationStyle:"none" }} to="/menu">  
            <NavItem>Menu</NavItem>
            </Link>} 
               { isLogged && <NavItem>Orders</NavItem>}
               { isLogged && <Link style={{ textDecoration: 'none' }} to ="/checkout"><ShoppingCartOutlined></ShoppingCartOutlined></Link>}
               
           </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
