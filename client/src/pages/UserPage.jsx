import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import OnSale from '../components/OnSale'

const Container = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const UserInput = styled.input`

`
const UserPage = () => {
    const user = useSelector((state) => state.user.currentUser)

    return (
        <div>
            <OnSale/>
            <Navbar/>
            <Container>
                <UserInput placeholder={user.email}></UserInput>
                <UserInput placeholder={user.firstName}></UserInput>
                <UserInput placeholder={user.lastName}></UserInput>
                <UserInput placeholder={user.address}></UserInput>
                <button>update</button>
            </Container>
            <Footer/>
        </div>
    )
}

export default UserPage
