import { ActionTypes } from "../constants/action-Types";

const initialState = [];

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_WISHLIST:
      return [...state, action.payload]; // Adds product to wishlist
    case ActionTypes.REMOVE_FROM_WISHLIST:
      return state.filter(product => product.id !== action.payload); // Removes product by ID
    default:
      return state;
  }
};
