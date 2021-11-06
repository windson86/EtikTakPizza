import React from "react";
import styled from "styled-components";
import { MenuBook } from "@material-ui/icons";
import { useSelector } from "react-redux";
//import { desktop } from "../responsive";
import { useHistory } from "react-router";

import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { placeName } from "../constans";

const Container = styled.div`
  height: 8vh;
  width: 100vw;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bddbd7;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Left = styled.div`
  height: 100%;
  width: 40%;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  font-size: 3vw;
`;
const Center = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Right = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const NavItem = styled.div`
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 4vw;
`;

const Navbar = () => {
  const history = useHistory();
  const { isLogged } = useSelector((state) => state.user);
  var extra = "";
  const cart = useSelector((state) => state.cart);
  if (isLogged) {
    extra = "(" + cart.quantity + ")";
  }
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {isLogged && (
            <NavItem onClick={() => history.push("/menu")}>
              <MenuBook /> Menu
            </NavItem>
          )}

          {isLogged && (
            <NavItem onClick={() => history.push("/orders")}>
              Orders{extra}
            </NavItem>
          )}
        </Left>
        <Center>
          <Logo onClick={() => history.push("/")}>{placeName}</Logo>
        </Center>
        <Right>
          {!isLogged && (
            <NavItem onClick={() => history.push("/register")}>
              Register
            </NavItem>
          )}

          {!isLogged && (
            <NavItem onClick={() => history.push("/login")}>Login</NavItem>
          )}

          {isLogged && (
            <NavItem onClick={() => history.push("/user")}>
              {user.firstName}
            </NavItem>
          )}
          {isLogged && <NavItem onClick={() => handleLogout()}>Logout</NavItem>}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
