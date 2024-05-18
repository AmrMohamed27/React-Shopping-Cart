import PropTypes from "prop-types";
import StarRating from "./StarRating";
import { useState } from "react";
import { IoMdArrowDropdown as DropDown } from "react-icons/io";
import { IoMdArrowDropup as DropUp } from "react-icons/io";

function ProductCard({ product, setCartItems, cartItems, quantityProp, page }) {
  const [showDesc, setShowDesc] = useState(false);
  const [quantity, setQuantity] = useState(quantityProp ? quantityProp : 0);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const toggleShowDesc = () => {
    setShowDesc(!showDesc);
  };

  return (
    <div
      className={`pb-8 relative flex flex-col gap-4 justify-center items-center  text-black border-b-2 border-theme-dark-blue text-center`}
    >
      <div>
        <img src={product.image} alt={product.title} width={150} />
      </div>
      <div className="flex flex-col relative items-center justify-center gap-4 w-full">
        <h2 className="text-2xl">{product.title}</h2>
        <div className="text-3xl absolute top-0 right-0">
          {showDesc ? (
            <DropUp className="cursor-pointer" onClick={toggleShowDesc} />
          ) : (
            <DropDown className="cursor-pointer" onClick={toggleShowDesc} />
          )}
        </div>
        {showDesc && <p>{product.description}</p>}
        <p className="text-3xl text-theme-blue">${product.price}</p>
        <StarRating rating={product.rating.rate} />
        <p className="text-lg">rated by: {product.rating.count} customers</p>
      </div>
      <div className="flex flex-row gap-8 items-center">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="quantity" className="text-lg">
            Quantity:{" "}
          </label>
          <input
            type="number"
            name="quantity"
            min={0}
            className="text-xl px-2 py-1"
            value={quantityProp ? quantityProp : quantity}
            onChange={(e) => handleQuantityChange(e)}
            disabled={page === "cart"}
          />
        </div>
        <button
          className="bg-theme-blue text-white px-4 py-2 rounded-lg"
          onClick={
            page === "shop"
              ? () => setCartItems([...cartItems, { ...product, quantity }])
              : () => removeFromCart(product)
          }
        >
          {page === "cart" ? "Checkout" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  setCartItems: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
  quantityProp: PropTypes.number,
  page: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  product: {
    category: "electronics",
    description: "",
    image: "",
    price: 0,
    title: "",
    id: 0,
    rating: { rate: 0, count: 0 },
  },
  setCartItems: () => {},
  cartItems: [],
  quantityProp: null,
  page: "shop",
};

export default ProductCard;
