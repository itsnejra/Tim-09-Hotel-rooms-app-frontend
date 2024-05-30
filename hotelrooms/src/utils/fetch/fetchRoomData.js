import URL from "@/constants/constants";

export const fetchRoomData = async (currentPage) => {
    const start = (currentPage - 1) * 5 + 1;
    const end = currentPage * 5;
    const response = await fetch(`${URL}/api/rooms/create_list/${start}/${end}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch room data');
    }
};
