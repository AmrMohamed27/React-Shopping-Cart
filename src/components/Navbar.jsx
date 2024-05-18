import { NavLink } from "react-router-dom";
import { FaShoppingCart as CartIcon } from "react-icons/fa";
import { PropTypes } from "prop-types";
import { IoMdMenu as Menu } from "react-icons/io";
import { useState } from "react";
import { IoCloseSharp as Close } from "react-icons/io5";

function Navbar({ numOfCartItems, setCartItems }) {
  const removeAllFromCart = () => {
    setCartItems([]);
  };
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  return (
    <nav className="top-0 w-full border-b-2 border-theme-dark-blue">
      <div className="flex flex-row justify-between px-12 py-4">
        <div className="text-lg uppercase font-bold text-theme-dark-blue flex items-center">
          React Shopping Cart
        </div>
        {/* Desktop Menu */}
        <div
          className={`hidden md:flex gap-8 flex-row items-center  *:px-4 *:py-2 *:rounded`}
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
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Menu
            onClick={toggleMobileMenu}
            className="text-3xl text-theme-dark-blue cursor-pointer"
          />
        </div>

        <div
          className={`transform ${
            showMobileMenu ? "translate-x-0" : "translate-x-full"
          } flex md:hidden flex-col gap-16 fixed transition-transform  duration-300 right-0 ease-in-out min-h-screen w-[60%] top-0 z-50 px-8 py-4 bg-theme-plat`}
        >
          <div className="border-b-2 border-b-black w-full flex flex-row justify-between">
            <p className="text-xl uppercase font-bold text-theme-dark-blue ">
              React Shopping Cart
            </p>
            <Close
              onClick={toggleMobileMenu}
              className="text-3xl text-theme-dark-blue cursor-pointer"
            />
          </div>
          <div className="flex flex-col w-full flex-1 justify-between">
            <div className={`flex gap-4 flex-col *:px-4 *:py-2 text-xl w-full`}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-theme-gray text-white w-full rounded-lg"
                    : "text-black hover:text-theme-blue w-full border-b-2 border-black"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-theme-gray text-white w-full rounded-lg"
                    : "text-black hover:text-theme-blue w-full border-b-2 border-black"
                }
                to="/shop"
              >
                Shop
              </NavLink>
            </div>
            <NavLink
              to={"/cart"}
              className={
                "rounded-lg bg-theme-blue text-white hover:bg-theme-gray w-full text-xl px-4 py-2"
              }
            >
              Go to Cart
            </NavLink>
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
