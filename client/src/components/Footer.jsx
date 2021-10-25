import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { placeName } from "../constans"
//import { desktop } from "../responsive";

const Container = styled.div`
    display: flex;
    height: 15vh;
    width: 100vw;

  `;

const Left = styled.div`
    flex: 1;
    width: 50%;
    display: flex;
    flex-direction: column;
    
  `;

const Logo = styled.h1`
  height: 33%;
  font-size:3vh;
  `;

const Desc = styled.p`
    height: 33%;
  `;

const SocialContainer = styled.div`
    display: flex;
    height: 34%;
  `;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;



const Title = styled.h2`
    margin-bottom: 30px;
    width: 50vw;
  `;



const Right = styled.div`
    width: 50%;
    
    
  `;

const ContactItem = styled.div`
  width: 50vw;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;

const Payment = styled.img`
      width: 100%;
      margin-bottom: 20px;
  `;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>{placeName}</Logo>
        <Desc>
          order your pizza online
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> City
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> phone no
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />developed by: petrovic1986
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;