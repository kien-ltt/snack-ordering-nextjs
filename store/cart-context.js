import { createContext, useReducer, useCallback } from 'react';

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedCartItems;
    if (existingCartItemIndex !== -1) {
      updatedCartItems = JSON.parse(JSON.stringify(state.items));
      updatedCartItems[existingCartItemIndex].amount =
        updatedCartItems[existingCartItemIndex].amount + action.item.amount;
    } else {
      updatedCartItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    console.log(updatedTotalAmount);

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const updatedTotalAmount =
      state.totalAmount - state.items[existingCartItemIndex].price;

    let updatedCartItems;

    if (state.items[existingCartItemIndex].amount === 1) {
      updatedCartItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedCartItems = JSON.parse(JSON.stringify(state.items));
      updatedCartItems[existingCartItemIndex].amount--;
    }

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'CLEAR') {
  }
};

export function CartContextProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
