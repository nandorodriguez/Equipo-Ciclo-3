import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import productsReducer from '../features/productSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
  },
});
