import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import OnSale from '../components/OnSale'
import {updateUser} from "../redux/userRedux"

const Container = styled.div`

display: flex;
justify-content: center;
align-items: center;
`
const Wraper = styled.div`

display: flex;
height: 60vh;
flex-direction: column;
justify-content: center;
align-items: center;
`
const UserInfo = styled.div`

`
const UserInput = styled.input`

`
 const UserDesc = styled.span`
 `
 const UserAddress = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
 `
const UserPage = () => {
    const user = useSelector((state) => state.user.currentUser)
    const [email,setEmail]= useState(user.email)
    const [street,setStreet]=useState(user.address?.street)
    const [city,setCity]=useState(user.address?.city)
    const [floor,setFloor]=useState(user.address?.floor)
    const dispatch = useDispatch();
    
    //{address:{street:street,city:city,floor:floor}}
    const handleClick = (e) => {
        e.preventDefault();
       const updatedUser={...user,
           address:{street,city,floor},
           email:email,
       }
        dispatch(updateUser(updatedUser))
       
      };
     /*  useEffect(()=>{
        
      },[]) */

    return (
        <div>
            <OnSale/>
            <Navbar/>
            <Container>
                <Wraper>
               <UserInfo><UserDesc>email:</UserDesc><UserInput onChange={(e) => setEmail(e.target.value)} placeholder={user.email}></UserInput></UserInfo> 
               <UserInfo><UserDesc>first name:</UserDesc><UserInput placeholder={user.firstName}></UserInput></UserInfo> 
               <UserInfo><UserDesc>last name:</UserDesc> <UserInput placeholder={user.lastName}></UserInput></UserInfo>
              
                   <UserAddress>address:
                   <UserInfo> <UserDesc>street:</UserDesc><UserInput onChange={(e) => setStreet(e.target.value)} placeholder={user.address?.street}></UserInput> </UserInfo>
                   <UserInfo> <UserDesc>city:</UserDesc><UserInput onChange={(e) => setCity(e.target.value)} placeholder={user.address?.city}></UserInput> </UserInfo>
                   <UserInfo>  <UserDesc>floor:</UserDesc><UserInput onChange={(e) => setFloor(e.target.value)} placeholder={user.address?.floor}></UserInput> </UserInfo>
                     </UserAddress>
              
                <button onClick={handleClick}>update</button>
                </Wraper>
            </Container>
            <Footer/>
        </div>
    )
}

export default UserPage
