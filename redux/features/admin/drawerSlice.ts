import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const drawerSlice = createSlice({
  name: 'activitiesAdmin',
  initialState,
  reducers: {
    setOpen(state, action) {
      state.open = action.payload;
    },
  },
});


export default drawerSlice.reducer;
export const { setOpen } = drawerSlice.actions;
