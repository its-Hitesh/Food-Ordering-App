import { useState} from "react";
import Header from './components/Layout/Header'
import Meals from "./components/Meal/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/cartProvider"
function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const ShowCartHandler = () => {
    setCartIsShown(true);
  }

  const HideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose = {HideCartHandler}/>}
      <Header onShowCart = {ShowCartHandler}/>
      <main>
        <Meals /> 
      </main>
    </CartProvider>
  );
}

export default App;
