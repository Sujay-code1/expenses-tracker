import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setIncome: (state, action) => {
      state.list = action.payload;
    },

    addIncome: (state, action) => {
      state.list.unshift(action.payload);
    },

    removeIncome: (state, action) => {
      state.list = state.list.filter(item => item._id !== action.payload);
    },

    updateIncome: (state, action) => {
      const index = state.list.findIndex(i => i._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setIncome,
  addIncome,
  removeIncome,
  updateIncome,
  setLoading,
  setError,
} = incomeSlice.actions;

export default incomeSlice.reducer;
