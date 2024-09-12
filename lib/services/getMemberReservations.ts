import { Session } from "next-auth";

const getMemberReservation = async (session: Session) => {
    const response = await fetch(`/api/member/${session.user.id}`);
    const { data } = await response.json();
    return data.Reservation;
}
export default getMemberReservation;