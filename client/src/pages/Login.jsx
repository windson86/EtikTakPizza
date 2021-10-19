import { useState } from "react";
import styled from "styled-components";
import { loginUser } from "../redux/userRedux";
import { mobile } from "../responsive";
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
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { pending, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(loginUser({email,password}))
  };
  return (<div>
    <OnSale/>
        <Navbar/>
    <Container>

      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={pending}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>NOT REMEMBER PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
    </div>
  );
};

export default Login;