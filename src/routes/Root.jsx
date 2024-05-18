import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
function Root() {
  const [cartItems, setCartItems] = useState([]);
  const numOfCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar
        numOfCartItems={numOfCartItems}
        setCartItems={setCartItems}
        cartItems={cartItems}
      />
      <Outlet context={[cartItems, setCartItems]} />
      <Footer />
    </>
  );
}

export default Root;
