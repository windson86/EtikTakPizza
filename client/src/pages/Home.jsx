import Navbar from "../components/Navbar";
import OnSale from "../components/OnSale";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import styled from "styled-components";
const Container = styled.div`
  width: 98vw;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #bddbd7;
`;

const Home = () => {
  return (
    <Container>
      <OnSale />
      <Navbar />
      <Slider />
      <Footer />
    </Container>
  );
};

export default Home;
