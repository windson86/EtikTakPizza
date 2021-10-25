import { useState } from "react";
import styled from "styled-components";
//import { desktop } from "../responsive";
import { registerUser } from "../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../components/Navbar'
import OnSale from '../components/OnSale'


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://scontent.fzag1-2.fna.fbcdn.net/v/t1.18169-9/418458_183015001798758_457562624_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=NZMxfmvQyvoAX8GDznD&_nc_ht=scontent.fzag1-2.fna&oh=4c69c75d15fcc198e39307f734ce9d9b&oe=61933A7F")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 60%;
  padding: 20px;
  background-color: white;

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 80%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const { loginPending, error } = useSelector((state) => state.user);

  const handleClick = (e) => {

    e.preventDefault();
    if(password===confPassword){ dispatch(registerUser({email,password,firstName,lastName}))}
    else{alert("passwords don't match")}
   
  };


  return (
    <div>
    <OnSale/>
        <Navbar/>
    <Container>
      
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
           placeholder="first name"
           type="text"
           onChange={(e) => setFirstName(e.target.value)}/>
          <Input 
          placeholder="last name" 
          type="text"
          onChange={(e) => setLastName(e.target.value)}/>
          
         <Input 
         placeholder="email"
         type="email"
         onChange={(e) => setEmail(e.target.value)}
         />
          <Input 
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          />
          <Input 
          placeholder="confirm password"
          type="password"
          onChange={(e) => setConfPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={loginPending}>CREATE</Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
    </div>
  );
};

export default Register;