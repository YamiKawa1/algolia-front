import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const initialState = {
  token: '', 
  isAdmin: false
};

const tokenSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToken: (state:any, action) => {
      const { token } = action.payload;
      state.token = token
    },
    isAdmin: (state:any) => {
        state.isAdmin = true
    },
    removeToken: (state:any) => {
        state.token = ''
    },
  },
});

export const { addToken, isAdmin, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;