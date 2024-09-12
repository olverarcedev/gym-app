const getReservation = async () => {
    const response = await fetch(`/api/reservation/`);
    const { data } = await response.json();
    return data;
}
export default getReservation;