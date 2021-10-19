import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout"



const App = () => {
  const {isLogged} = useSelector((state) => state.user);
  return <Router>
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    
    
    <Route path="/login">{isLogged ? <Redirect to="/" /> : <Login />}</Route>
    <Route path="/register">
      {isLogged ? <Redirect to="/" /> : <Register />}
    </Route>
    <Route path="/checkout">
      {!isLogged ? <Redirect to="/" /> : <Checkout />}
    </Route>
  </Switch>
</Router>
};

export default App;