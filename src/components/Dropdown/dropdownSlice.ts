import { createSlice } from "@reduxjs/toolkit";

export const dropdownSlice = createSlice({
  name: "dropdownSelectedValue",
  initialState: "",
  reducers: {
    addDropdownSelectedValue: (state: string, action) => {
      return action.payload;
    },
  },
});

export const { addDropdownSelectedValue } = dropdownSlice.actions;
export default dropdownSlice.reducer;
