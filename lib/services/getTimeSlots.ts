const getTimeSlots = async () => {
    const response = await fetch('/api/timeSlot');
    const { data } = await response.json();
    return data;
}
export default getTimeSlots;