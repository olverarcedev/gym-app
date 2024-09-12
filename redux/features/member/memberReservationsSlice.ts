import { Reservation } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  memberReservations: [],
};

const memberReservationsSlice = createSlice({
  name: 'memberReservations',
  initialState,
  reducers: {
    setMemberReservations(state, action){
      state.memberReservations = action.payload;
    },
    addMemberReservations(state, action){
      state.memberReservations = [...state.memberReservations, ...action.payload];
    },
    deleteOneReservation(state, action){
      state.memberReservations = state.memberReservations.filter((reservation: Reservation)=>{
        return reservation.id != action.payload.id;
      });
    }
  },
});

export default memberReservationsSlice.reducer;
export const { addMemberReservations, setMemberReservations, deleteOneReservation } = memberReservationsSlice.actions;
