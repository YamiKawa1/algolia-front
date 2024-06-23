import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import tokenSlice from './tokenSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    token: tokenSlice
  },
});

export default store;