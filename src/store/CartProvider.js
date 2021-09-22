import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems = state.items;
  let updatedTotalAmount = state.totalAmount;
  let existingItemIndex = -1,
    existingItem;
  switch (action.type) {
    case "add":
      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      existingItem = state.items[existingItemIndex];

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

      break;
    case "delete":
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      existingItem = state.items[existingItemIndex];

      if (existingItem) {
        if (existingItem.amount === 1) {
          updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
          const updatedItem = {
            ...existingItem,
            amount: existingItem.amount - 1,
          };
          updatedItems = [...state.items];
          updatedItems[existingItemIndex] = updatedItem;
        }
        updatedTotalAmount =
          state.totalAmount.toFixed(2) - existingItem.price.toFixed(2);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
      break;
    default:
      break;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatch({ type: "add", item: item });
  };
  const removeItemHandler = (id) => {
    dispatch({ type: "delete", id: id });
  };

  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
