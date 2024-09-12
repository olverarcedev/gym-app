import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  instructors: [],
  status: 'idle'
};

const instructorAdminSlice = createSlice({
  name: 'instructorsAdmin',
  initialState,
  reducers: {
    setAdminInstructors(state, action) {
      state.instructors = action.payload;
      state.status = 'success'
    },
  },
});


export default instructorAdminSlice.reducer;
export const { setAdminInstructors } = instructorAdminSlice.actions;
