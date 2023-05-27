import React from "react";
import Link from "next/link";
//shop icon
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
//for cart in nav
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    //space-between
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Beatz Headphones Store</Link>
      </p>

      {/* //button bag icon */}
      <button
        type="button"
        className="cart-icon"
        //toggle show cart
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        {/* //cart quantity */}
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {/* //if showCart true, show cart component */}
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
