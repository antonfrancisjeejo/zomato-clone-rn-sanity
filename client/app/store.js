import { configureStore, combineReducers } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import restaurantReducer from "../slices/restaurantSlice";

const reducer = combineReducers({
  basket: basketReducer,
  restaurant: restaurantReducer,
});

export const store = configureStore({
  reducer,
});
