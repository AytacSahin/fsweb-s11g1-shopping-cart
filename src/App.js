import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Context Üreticiler:
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Bileşenler:
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {

  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    const updateCart = [...cart, item];
    setCart(updateCart);
  };

  const deleteItem = (index) => {
    const copyArr = [...cart]
    copyArr.splice(index, 1);
    setCart(copyArr);
  };

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem("basket"));
    basket ? setCart(basket) : setCart([])
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(cart));
  }, [cart]);

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, deleteItem }}>

        <div className="App">
          <Navigation />

          {/* Routelar */}

          <main className="content">

            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>

          </main>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>

  );
}

export default App;