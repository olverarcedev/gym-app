import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activities: [],
  status: 'idle'
};

const activityAdminSlice = createSlice({
  name: 'activitiesAdmin',
  initialState,
  reducers: {
    setAdminActivities(state, action) {
      state.activities = action.payload;
      state.status = 'success'
    },
    deleteAdminActivity(state, action) {
      state.activities = state.activities.filter((activity) => activity.id != action.payload);
    },
    addAdminActivity(state, action) {
      state.activities = [...state.activities, action.payload];
    },
    updateAdminActivity(state, action) {
      state.activities = state.activities.filter(
        (activity) => activity.id !== action.payload.id
      );
      state.activities.push(action.payload);
    }


  },
});


export default activityAdminSlice.reducer;
export const { setAdminActivities, deleteAdminActivity, addAdminActivity, updateAdminActivity } = activityAdminSlice.actions;
