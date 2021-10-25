import React from 'react';
import styled from 'styled-components'

import { useSelector} from 'react-redux'
//import { desktop } from '../responsive'
import { useHistory } from "react-router";

import { useDispatch } from "react-redux";
import {logout} from "../redux/userRedux";
import {placeName} from "../constans"



 
const Container = styled.div`
height: 15vh;
width: 100vw;
background-color: #bddbd7;
display: flex;
justify-content: center;
align-items: center;

`

const Wrapper = styled.div`

height: 70%;
width: 95%;
background-color: #f5a6a6;
display: flex;
border-radius: 20px;
justify-content: space-between;
align-items: center;

`
const Left = styled.div`
height: 70%;
width: 40%;
display: flex;

justify-content: space-evenly;
align-items: center;
 
`




const Logo = styled.h1`
font-weight: bold;
text-align: center;
font-size: 2vh;


`
const Center = styled.div`

width: 20%;
align-items: center;
`
const Right = styled.div`

width: 40%;
display: flex;
align-items: center;
justify-content: space-evenly;


`
const NavItem = styled.div`
cursor: pointer;
width: 20vw;
height: 5vh;

text-align: center;
font-size: 3vh;
`
const Test = styled.div`
cursor: pointer;
`




const Navbar = () => {
    const history = useHistory();
    const {isLogged} = useSelector((state) => state.user);
    var extra=""
    const cart = useSelector((state) => state.cart);
    if(isLogged){extra='('+cart.quantity+')'}
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
          
         {isLogged && <NavItem onClick={()=>history.push('/menu')}>Menu</NavItem>}  
           
         {isLogged && <NavItem onClick={()=>history.push('/orders')}>Orders{extra}</NavItem>}  
          
             </Left>   
          <Center><Logo onClick={()=>history.push('/')}>{placeName}</Logo></Center>  
            <Right>
        {!isLogged && 
           
           <NavItem onClick={()=>history.push('/register')}>Register</NavItem>}
           
        
         {!isLogged && 
           
            <NavItem  onClick={()=>history.push('/login')}>Login</NavItem>}
           
          
         
         
         {isLogged && 
            <NavItem onClick={()=>history.push('/user')} >{user.firstName}</NavItem>} 
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
