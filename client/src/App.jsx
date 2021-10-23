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
import Success from "./pages/Success";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";

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
    <Route path="/success">
          <Success />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/menu"> <Menu />
    </Route>
  </Switch>
</Router>
};

export default App;