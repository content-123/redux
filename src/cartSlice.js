import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to store added items
  },
  reducers: {
    addItem: (state, action) => {
        const { id, title, price } = action.payload;
        const existingItem = state.items.find(item => item.id === id);
  
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ id, title, price, quantity: 1 });
        }
      
    },
    removeItem: (state, action) => {
        const itemIdToRemove = action.payload.id;
        state.items = state.items.filter(item => item.id !== itemIdToRemove);
    },
    updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) {
          item.quantity = parseInt(quantity, 10); 
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
