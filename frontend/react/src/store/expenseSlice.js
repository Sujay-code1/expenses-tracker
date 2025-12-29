// store/expenseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    list: [], // Changed from 'expenses' to 'list' for consistency
    totalSpent: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setExpensesData(state, action) {
      // Handle both cases: if payload is an array or if it's an object with .expenses
      const data = Array.isArray(action.payload) ? action.payload : (action.payload.expenses || []);
      state.list = data;
      state.totalSpent = data.reduce((sum, item) => sum + Number(item.amount), 0);
    },
    addExpenseToState(state, action) {
      state.list.unshift(action.payload);
      state.totalSpent += Number(action.payload.amount);
    },
   removeExpense: (state, action) => {
  const id = action.payload;
  const item = state.list.find(i => i._id === id);
  if (item) {
    state.totalSpent -= Number(item.amount);
    state.list = state.list.filter(i => i._id !== id);
  }
},
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const { setExpensesData, addExpenseToState, setLoading, removeExpense, setError } = expenseSlice.actions;
export default expenseSlice.reducer;