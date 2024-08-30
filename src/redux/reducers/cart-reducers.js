import { ActionTypes } from "../constants/action-Types"; // Ensure this path is correct

const initialState = {
  numberCart: 0,
  Carts: [],
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Handle the GET_NUMBER_CART action
    case ActionTypes.GET_NUMBER_CART:
      return {
        ...state,
      };

    // Handle the ADD_TO_CART action
    case ActionTypes.ADD_TO_CART:
      const existingItemIndex = state.Carts.findIndex(item => item.id === payload.id);
      
      let updatedCarts;
      if (existingItemIndex >= 0) {
        updatedCarts = state.Carts.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCarts = [...state.Carts, { ...payload, quantity: 1 }];
      }
      
      const updatedNumberCart = updatedCarts.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        ...state,
        Carts: updatedCarts,
        numberCart: updatedNumberCart,
      };

    // Handle the REMOVE_FROM_CART action
    case ActionTypes.REMOVE_FROM_CART:
      const filteredCarts = state.Carts.filter(item => item.id !== payload);
      const newNumberCart = filteredCarts.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        ...state,
        Carts: filteredCarts,
        numberCart: newNumberCart,
      };

    // Handle the INCREASE_QUANTITY action
    case ActionTypes.INCREASE_QUANTITY:
      const increasedQuantityCarts = state.Carts.map(item =>
        item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
      );

      return {
        ...state,
        Carts: increasedQuantityCarts,
        numberCart: increasedQuantityCarts.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      };

    // Handle the DECREASE_QUANTITY action
    case ActionTypes.DECREASE_QUANTITY:
      const decreasedQuantityCarts = state.Carts.map(item =>
        item.id === payload ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      );

      return {
        ...state,
        Carts: decreasedQuantityCarts,
        numberCart: decreasedQuantityCarts.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      };

    // Handle the CLEAR_CART action
    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        Carts: [],
        numberCart: 0,
      };

    // Default case to return the current state
    default:
      return state;
  }
};
