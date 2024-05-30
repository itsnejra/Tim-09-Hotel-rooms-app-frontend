import URL from "@/constants/constants";

export const fetchFilteredRoomData = async (startPrice, endPrice, startCapacity, endCapacity, currentPage) => {
    const start = (currentPage - 1) * 5 + 1;
    const end = currentPage * 5;
    const response = await fetch(`${URL}/api/rooms/create_list/${startPrice}/${endPrice}/${startCapacity}/${endCapacity}/${start}/${end}/`);
    
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch filtered room data');
    }
};
