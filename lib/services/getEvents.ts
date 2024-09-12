import { Activity, Reservation, TimeSlot } from "@prisma/client";

const getEvents = (timeSlots: TimeSlot[], memberReservations: Reservation[]) => {
    return timeSlots.map(((timeSlot: TimeSlot & { activity: Activity }) => {
        let isReserved = false;

        if (memberReservations) {
            isReserved = memberReservations.some(reservation => reservation.timeSlotId === timeSlot.id);
        }
        return {
            id: timeSlot.id,
            title: timeSlot.activity.name,
            description: timeSlot.activity.description,
            daysOfWeek: [timeSlot.dayOfWeek + 1],
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            activityId: timeSlot.activityId,
            backgroundColor: isReserved ? "lightgreen" : "black",
            allDay: false,
        };
    }))

}
export default getEvents;