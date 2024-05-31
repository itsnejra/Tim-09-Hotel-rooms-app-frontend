import URL from "@/constants/constants";

export const fetchRoomDataForRoom = async (roomNumber) => {
    console.log(`${URL}/api/rooms/edit/${roomNumber}/`)
    const response = await fetch(`${URL}/api/rooms/edit/${roomNumber}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch room data');
    }
};
