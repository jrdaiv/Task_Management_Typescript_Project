import { createSlice } from '@reduxjs/toolkit';

interface CartItem{
  id: number,
  name: string,
  price: number,
  quantity: number,
}
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      console.log(state.items);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
      alert("Cart has been successfully checked out and cleared, thank you! ");
      console.log(state.items);
    },
  

    calculateTotals: (state) => {
      let totalQuantity = 0;
      let totalAmount = 0;
      state.items.forEach(item => {
        totalQuantity += item.quantity;
        totalAmount += item.price * item.quantity;
      });
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      console.log(state.totalAmount);

    },

  },

});

export const { addToCart, removeFromCart, clearCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
