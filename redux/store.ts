import { configureStore } from "@reduxjs/toolkit";
import timeSlotReducer from './features/member/timeSlotSlice';
import timeSlotAdminReducer from './features/admin/timeSlotSlice';
import activityReducer from './features/member/activitySlice';
import activityAdminReducer from './features/admin/activitySlice';
import memberReservationsReducer from './features/member/memberReservationsSlice';
import reservationsAdminReducer from './features/admin/reservationsSlice';
import memberAdminReducer from './features/admin/memberSlice';
import drawerReducer from './features/admin/drawerSlice';
import categoryAdminReducer from './features/admin/categoriesSlice';
import instructorAdminReducer from './features/admin/instructorSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            timeSlot: timeSlotReducer,
            activity: activityReducer,
            activityAdmin: activityAdminReducer,
            timeSlotAdmin: timeSlotAdminReducer,
            reservationAdmin: reservationsAdminReducer,
            memberReservations: memberReservationsReducer,
            membersAdmin: memberAdminReducer,
            drawer: drawerReducer,
            categoryAdmin: categoryAdminReducer,
            instructorAdmin: instructorAdminReducer

        },
    })
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];