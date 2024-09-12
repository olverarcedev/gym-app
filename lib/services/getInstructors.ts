const getInstructor = async () => {
    const response = await fetch(`/api/instructor/`);
    const { data } = await response.json();
    return data;
}
export default getInstructor;