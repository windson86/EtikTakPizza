
import Navbar from '../components/Navbar'
import OnSale from '../components/OnSale'
import Slider from '../components/Slider'
import Footer from '../components/Footer'
/* import { useDispatch, useSelector } from 'react-redux'
import { getFavoritePizzas } from '../redux/ApiCalls' */


const Home = () => {
   /*  const dispatch = useDispatch();
    const pizzas = useSelector((state) => state.pizzas.pizzas);
    useEffect(() => {
        getFavoritePizzas(dispatch)
       }, [dispatch]); */
    
    return (
        <div>
        <OnSale/>
        <Navbar/>
        <Slider/>
        <Footer/>
        </div>
    )
}

export default Home
