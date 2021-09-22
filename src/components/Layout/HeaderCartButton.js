import { useState, useContext, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/CartContext";
const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  let btnClass = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;
  const { items } = cartContext;
  useEffect(() => {
    if (items.length > 0) setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 150);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const noOfItems = cartContext.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);
  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
