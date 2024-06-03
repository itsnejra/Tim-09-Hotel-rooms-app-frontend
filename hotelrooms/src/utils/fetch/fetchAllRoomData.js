import URL from "@/constants/constants";

export const fetchAllRoomData = async () => {
    const response = await fetch(`${URL}/api/rooms/create_list/`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch room data');
    }
};
