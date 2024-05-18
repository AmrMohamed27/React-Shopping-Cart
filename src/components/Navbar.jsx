import { NavLink } from "react-router-dom";
import { FaShoppingCart as CartIcon } from "react-icons/fa";
import { PropTypes } from "prop-types";

function Navbar({ numOfCartItems, setCartItems }) {
  const removeAllFromCart = () => {
    setCartItems([]);
  };
  return (
    <nav className="top-0 w-full border-b-2 border-theme-dark-blue">
      <div className="flex flex-row justify-between px-12 py-4">
        <div className="text-lg uppercase font-bold text-theme-dark-blue flex items-center">
          React Shopping Cart
        </div>
        <div
          className={`flex gap-8 flex-row items-center  *:px-4 *:py-2 *:rounded`}
        >
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-theme-gray text-white"
                : "text-black hover:text-theme-blue"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-theme-gray text-white"
                : "text-black hover:text-theme-blue"
            }
            to="/shop"
          >
            Shop
          </NavLink>
          <div className="gap-4 flex items-center flex-row">
            <NavLink to={"/cart"} className={"flex items-center"}>
              <CartIcon className=" text-2xl" />
            </NavLink>
            <p className="text-xl">{numOfCartItems}</p>
            <button
              className="px-4 py-2 rounded-lg bg-theme-blue text-white hover:bg-theme-gray "
              onClick={() => removeAllFromCart()}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  numOfCartItems: PropTypes.number.isRequired,
  setCartItems: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  numOfCartItems: 0,
  setCartItems: () => {},
};

export default Navbar;
