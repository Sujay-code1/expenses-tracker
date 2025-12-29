import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js'
import incomeReducer from "./incomeSlice.js";
import expenseReducer from "./expenseSlice.js"
import budgetReducer from "./budgetSlice.js"


const store = configureStore({
    reducer: {
       auth:userReducer,
       income:incomeReducer,
       expense:expenseReducer,
       budget:budgetReducer,
    }
})

export default store;