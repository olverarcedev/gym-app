import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservations: [],
  status: 'idle'
};

const reservationsAdminSlice = createSlice({
  name: 'reservationAdmin',
  initialState,
  reducers: {
    setAdminReservations(state, action) {
      state.reservations = action.payload;
      state.status = 'success'
    },
    deleteAdminReservations(state, action) {
      state.reservations = state.reservations.filter((reservation) => reservation.id != action.payload);
    },
    addAdminReservation(state, action) {
      state.reservations = [...state.reservations, action.payload];
    },
    updateAdminReservation(state, action) {
      state.reservations = state.reservations.filter(
        (reservation) => reservation.id !== action.payload.id
      );
      state.reservations.push(action.payload);
    }

  },
});

export default reservationsAdminSlice.reducer;
export const { setAdminReservations, deleteAdminReservations, addAdminReservation, updateAdminReservation } = reservationsAdminSlice.actions;
