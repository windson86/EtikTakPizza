import styled from 'styled-components'
const Container =styled.div`
height: 5%;
background-color:teal;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 500;
`

const OnSale = () => {
    return (
        <Container>Prva pizzerija gdje je moguće platiti Online karticama</Container>
    )
}

export default OnSale
