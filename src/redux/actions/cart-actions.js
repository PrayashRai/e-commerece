import { ActionTypes } from "../constants/action-Types";

// Action creators
export const addToCart = (products) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: products,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: productId,
  };
};

// cart-actions.js

export const increaseQuantity = (productId) => {
  return {
    type: ActionTypes.INCREASE_QUANTITY,
    payload: productId,
  };
};

export const decreaseQuantity = (productId) => {
  return {
    type: ActionTypes.DECREASE_QUANTITY,
    payload: productId,
  };
};


export const clearCart = () => {
  return {
    type: ActionTypes.CLEAR_CART,
  };
};