import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeSlots: [],
  status: 'idle'
};

const timeSlotAdminSlice = createSlice({
  name: 'timeSlotAdmin',
  initialState,
  reducers: {
    setAdminTimeSlots(state, action) {
      state.timeSlots = action.payload;
      state.status = 'success'
    },
    deleteAdminTimeSlot(state, action) {
      state.timeSlots = state.timeSlots.filter((timeSlot) => timeSlot.id != action.payload);
    },
    addAdminTimeSlot(state, action) {
      state.timeSlots = [...state.timeSlots, action.payload];
    },
    updateAdminTimeSlot(state, action) {
      state.timeSlots = state.timeSlots.filter(
        (timeSlot) => timeSlot.id !== action.payload.id
      );
      state.timeSlots.push(action.payload);
    }
  },
});

export default timeSlotAdminSlice.reducer;
export const { setAdminTimeSlots, deleteAdminTimeSlot, addAdminTimeSlot, updateAdminTimeSlot } = timeSlotAdminSlice.actions;
