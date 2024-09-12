const getCategory = async () => {
    const response = await fetch(`/api/category/`);
    const { data } = await response.json();
    return data;
}
export default getCategory;