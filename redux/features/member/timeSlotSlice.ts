import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeSlots: [],
};

const timeSlotSlice = createSlice({
  name: 'timeSlot',
  initialState,
  reducers: {
    setTimeSlots(state, action){
      state.timeSlots = action.payload;
    }
  }, 
});

export default timeSlotSlice.reducer;
export const { setTimeSlots } = timeSlotSlice.actions;
