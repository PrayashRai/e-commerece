import { ActionTypes } from "../constants/action-Types";

export const addToWishList = (products) => {
  return {
    type: ActionTypes.ADD_TO_WISHLIST,
    payload: products,
  }
}

export const removeFromWishList = (productId) => {
  return {
    type: ActionTypes.REMOVE_FROM_WISHLIST,
    payload: productId,
  }
}


