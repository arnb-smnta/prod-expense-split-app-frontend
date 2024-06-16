import { menuItems } from "@/lib/helpers";
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: menuItems[0].key,
  reducers: {
    activeMenu: (state, action) => {
      return action.payload;
    },
  },
});

export const { activeMenu } = menuSlice.actions;
export default menuSlice.reducer;
