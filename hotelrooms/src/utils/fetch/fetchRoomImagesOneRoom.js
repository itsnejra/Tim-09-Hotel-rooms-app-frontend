import URL from "@/constants/constants";

export const fetchRoomImagesForRoom = async (roomNumber) => {
    try {
        const response = await fetch(`${URL}/api/rooms/create_list_room_image/${roomNumber}/`);
        if (response.ok) {
            const imagesUrls = await response.json();
            return imagesUrls.map((imageUrl) => {
                const parts = imageUrl.image.split('/api/');
                const newPath = parts[1].replace(`rooms/create_list_room_image/${roomNumber}/`, '');
                const newUrl = parts[0] + '/' + newPath;
                return {
                    original: newUrl,
                };
            });
        } else {
            throw new Error('Failed to fetch room images for room ' + roomNumber);
        }
    } catch (error) {
        throw new Error(`Error fetching room images for room ${roomNumber}: ${error.message}`);
    }
};
