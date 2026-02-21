import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budgets: [],       // This will hold the category-wise rows for the table
    totalLimit: 0,     // This will hold the total monthly budget (Card 1)
    totalSpent: 0,     // This will hold the total spent across all categories (Card 2)
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalBudgets: 0,
      hasNext: false,
      hasPrev: false
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setBudgets: (state, action) => {
      // Logic Fix: Check if payload is the new object or just an array
      if (action.payload && action.payload.budgets) {
        // Backend sent the full object { budgets, totalLimit, totalSpent, pagination }
        state.budgets = action.payload.budgets;
        state.totalLimit = action.payload.totalLimit || 0;
        state.totalSpent = action.payload.totalSpent || 0;
        state.pagination = action.payload.pagination || state.pagination;
      } else {
        // Fallback: if payload is just an array, save it to budgets
        state.budgets = Array.isArray(action.payload) ? action.payload : [];
      }
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setBudgets, setError } = budgetSlice.actions;
export default budgetSlice.reducer;