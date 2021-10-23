import styled from 'styled-components'
const Container =styled.div`
height: 8vh;
width: 100vw;
background-color:teal;
color: white;
display: flex;
align-items: center;

font-size: 5vw;
text-align: center;
font-weight: 500;
`

const OnSale = () => {
    return (
        <Container>Prva pizzerija u okolici gdje je moguće platiti Online karticama</Container>
    )
}

export default OnSale
