import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {}, 
  active: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state:any, action) => {
      const { id, img, name, quantity, price } = action.payload;
      state.items[id] = { img, name, quantity, price };
    },
    removeItem: (state:any, action) => {
      const { id } = action.payload;
      delete state.items[id];
    },
    updateQuantity: (state:any, action) => {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity = quantity;
      }
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, setActive } = cartSlice.actions;

export default cartSlice.reducer;