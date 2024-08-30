// src/redux/reducers/index.js
import { combineReducers } from "redux";
import { cartReducer } from "./cart-reducers";
import { wishlistReducer } from "./wishlistReducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  wishList: wishlistReducer,
});
