const getActivities = async () => {
    const response = await fetch('/api/activity');
    const { data } = await response.json();
    return data;
}
export default getActivities;