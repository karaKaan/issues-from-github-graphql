import { configureStore } from "@reduxjs/toolkit";
import dropdownSelectedValueReducer from "../components/Dropdown/dropdownSlice";

export const store = configureStore({
  reducer: {
    dropdownSelectedValue: dropdownSelectedValueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
