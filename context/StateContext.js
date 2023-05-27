//manage entire state of application in one file
import React, { createContext, useContext, useState, useEffect } from "react";
//popups
import { toast } from "react-hot-toast";

const Context = createContext();

//wherever we put inside <state> will be considred children
//wrap application via Pages/ _app.js
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //for updating cart
  let cartProduct;
  let index;

  const incQty = () => {
    //uses cur qty
    setQty((curQty) => curQty + 1);
  };

  //decrease, but check if lower than 1
  const decQty = () => {
    setQty((curQty) => {
      if (curQty - 1 < 1) return 1;

      return curQty - 1;
    });
  };

  //for updating cart qty
  const toggleCartItemQuanitity = (id, value) => {
    //search array for matching id
    cartProduct = cartItems.find((item) => item._id === id);
    //& get the index
    index = cartItems.findIndex((product) => product._id === id);
    //filter products that are not ID
    const newCartItems = cartItems.filter((item) => item._id !== id);

    //pass in value "inc" to increase
    if (value === "inc") {
      //create new cart item obj (minus ID) +  product/update quantity of specific project
      setCartItems([
        ...newCartItems,
        { ...cartProduct, quantity: cartProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + cartProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      //check if greater than 1, otherwise can't make 0
      if (cartProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...cartProduct, quantity: cartProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - cartProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const onAdd = (product, quantity) => {
    //check if already in cart, is the ID in cart same?
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    //update Price and Qnty
    setTotalPrice((curTotalPrice) => curTotalPrice + product.price * quantity);
    setTotalQuantities((curTotalQuantities) => curTotalQuantities + quantity);

    //if true already in cart
    if (checkProductInCart) {
      //map over cart items & when matches, update quantity
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            //spread operator .... makes a copy of obj, new obj
            ...cartProduct,
            //update quantity of product //
            quantity: cartProduct.quantity + quantity,
          };
      });

      //update array with new obj
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      //take existing cart items in array ...cartItems + ...product (copy product properties)
      setCartItems([...cartItems, { ...product }]);

      //notification
      toast.success(`${qty} ${product.name} added to the cart.`);
    }
  };

  //REMOVE PRODUCT FROM CART
  const onRemove = (product) => {
    //match
    cartProduct = cartItems.find((item) => item._id === product._id);
    //filter out product
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    // total - price * how many you had
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - cartProduct.price * cartProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - cartProduct.quantity
    );
    //updated cart without product
    setCartItems(newCartItems);

    //notification
    toast.success(`${product.name} removed from cart.`);
  };

  return (
    <Context.Provider
      //pass values across each page/children
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//pass in our own ^Context to export
export const useStateContext = () => useContext(Context);
