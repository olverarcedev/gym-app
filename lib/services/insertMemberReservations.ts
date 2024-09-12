import { Session } from "next-auth";

const addManyReservations = async (session: Session, selectedSlotsOptions: string[], selectedRadioOption: string) => {
  const response = await fetch('/api/reservation/many', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      memberId: session.user.id,
      timeSlotIds: selectedSlotsOptions,
      reminderEnabled: selectedRadioOption == "true" ? true : false
    })
  });
  const { data } = await response.json();
  return data;
}





export default addManyReservations;