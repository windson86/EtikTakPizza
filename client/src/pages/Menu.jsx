import Navbar from "../components/Navbar"
import OnSale from "../components/OnSale"
import styled from 'styled-components'
import { getFavoritePizzas } from "../redux/ApiCalls"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PizzaInfo from "../components/PizzaInfo"

const Container = styled.div`
padding-top: 90px;
background-color: #ffffff;

`

const Menu=()=>{
    const dispatch = useDispatch();
    const pizzas = useSelector((state) => state.pizzas.pizzas);
    useEffect(() => {
        getFavoritePizzas(dispatch)
       }, [dispatch]);

return(
    <div>
        <OnSale/>
<Navbar/>
<Container>

    {pizzas.map((pizza)=>(
        <PizzaInfo key={pizza._id} pizza={pizza}></PizzaInfo>
    ))}
   
   </Container>
 
    </div>
)

    }
export default Menu