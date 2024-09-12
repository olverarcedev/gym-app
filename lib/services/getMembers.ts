const getMember = async () => {
    const response = await fetch(`/api/member/`);
    const { data } = await response.json();
    return data;
}
export default getMember;