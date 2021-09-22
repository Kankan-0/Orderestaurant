import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { Fragment, useState } from "react";
function App() {
  const [cartShown, setCartShown] = useState(false);

  const toggleCartShown = () => {
    setCartShown(!cartShown);
  };

  return (
    <CartProvider>
      {cartShown && <Cart onCloseCart={toggleCartShown} />}
      <Header onCartToggle={toggleCartShown} />
      <Meals />
    </CartProvider>
  );
}

export default App;
