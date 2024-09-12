const deleteMemberReservation = async (id: string) => {
    const response = await fetch(`/api/reservation/${id}`, {
        method: 'DELETE',
    });
    const { data } = await response.json();
    return data;
}
export default deleteMemberReservation;