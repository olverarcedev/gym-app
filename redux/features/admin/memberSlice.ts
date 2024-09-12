import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [],
  status: 'idle'
};

const memberAdminSlice = createSlice({
  name: 'membersAdmin',
  initialState,
  reducers: {
    setAdminMembers(state, action) {
      state.members = action.payload;
      state.status = 'success'
    },
    deleteAdminMembers(state, action) {
      state.members = state.members.filter((member) => member.id != action.payload);
    },
    addAdminMember(state, action) {
      state.members = [...state.members, action.payload];
    },
    updateAdminMember(state, action) {
      state.members = state.members.filter(
        (member) => member.id !== action.payload.id
      );
      state.members.push(action.payload);
    }

  },
});

export default memberAdminSlice.reducer;
export const { setAdminMembers, deleteAdminMembers, addAdminMember, updateAdminMember } = memberAdminSlice.actions;
