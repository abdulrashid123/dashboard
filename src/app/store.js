import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import statementsReducer from '../features/statement/statementSlice'
import banksReducer from '../features/bank/bankSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    statements:statementsReducer,
    banks:banksReducer,
  },
});
