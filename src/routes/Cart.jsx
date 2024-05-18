import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Cart() {
  const [cartItems, setCartItems] = useOutletContext();
  return (
    <section className="w-full min-h-screen bg-theme-plat p-16">
      <div className="max-w-[80%] mx-auto flex flex-col justify-center items-center gap-16">
        <h1 className="uppercase font-bold text-xl md:text-3xl text-theme-dark-blue">
          Current items in Cart:
        </h1>
        <div className="w-full">
          <ul className="flex flex-col gap-8 items-center">
            {cartItems &&
              cartItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  quantityProp={item.quantity}
                  page={"cart"}
                >
                  {item.title}
                </ProductCard>
              ))}
            {cartItems.length === 0 && <p>No items in cart</p>}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Cart;
