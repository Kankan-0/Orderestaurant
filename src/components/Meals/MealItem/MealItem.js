import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";
import classes from "./MealItem.module.css";
const MealItem = (props) => {
  const cartContext = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amount,
      price: props.meal.price,
    });
  };

  const price = `$${props.meal.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
