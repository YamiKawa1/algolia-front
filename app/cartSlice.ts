import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const initialState = {
  id: '',
  items: [{
    id: 1,
    name: 'hola',
    price: 90.45,
    quantity: 90,
    imageSrc: 'sds'
  }], 
};

const findIndex = (product_id:number, list:Array<any>) => {
  const index = list.findIndex(product => product.id == product_id)
  return index
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state:any, action) => {
      const { id, imgURL, name, quantity, price } = action.payload;

      if (state.items.length === 0 && id === '') {
        state.id = uuid();
      }
      const index = findIndex(id, state.items)
      
      if (index != -1) {
        state.items[index] = { id, imgURL, name, quantity, price };
      } else{
        state.items.push({ id,imgURL, name, quantity, price })
      }
      
      localStorage.setItem("cart_id", state.id);
      localStorage.setItem("cart_items", state.items);
    },
    removeItem: (state:any, action) => {
      const { id } = action.payload;
      const index = findIndex(id, state.items)
      if (index != -1) {
        delete state.items[index];
        localStorage.setItem("cart_items", state.items);
      }
    },
    updateQuantity: (state:any, action) => {
      const { id, quantity } = action.payload;
      const index = findIndex(id, state.items)
      if (index != -1) {
        state.items[index].quantity = quantity
        localStorage.setItem("cart_items", state.items);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;