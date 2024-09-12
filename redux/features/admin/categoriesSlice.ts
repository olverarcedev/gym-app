import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  status: 'idle'
};

const categoryAdminSlice = createSlice({
  name: 'categoriesAdmin',
  initialState,
  reducers: {
    setAdminCategories(state, action) {
      state.categories = action.payload;
      state.status = 'success'
    },
  },
});


export default categoryAdminSlice.reducer;
export const { setAdminCategories } = categoryAdminSlice.actions;
