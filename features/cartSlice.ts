import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}, // Contendrá un objeto con name como clave y { quantity, price } como valor
  active: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, quantity, price } = action.payload;
      state.items[name] = { quantity, price };
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      delete state.items[name];
    },
    updateItem: (state, action) => {
      const { name, quantity, price } = action.payload;
      if (state.items[name]) {
        state.items[name] = { quantity, price };
      }
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addItem, removeItem, updateItem, setActive } = cartSlice.actions;

export default cartSlice.reducer;