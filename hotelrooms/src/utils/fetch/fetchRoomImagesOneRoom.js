import URL from "@/constants/constants";

export const fetchRoomImagesForRoom = async (roomNumber) => {
    try {
        const response = await fetch(`${URL}/api/rooms/create_list_room_image/${roomNumber}/`);
        if (response.ok) {
            const imagesUrls = await response.json();
            return imagesUrls.map((imageUrl) => {
                if (imageUrl.image.includes('api')) {
                    const parts = imageUrl.image.split('/api/');
                    const newPath = parts[1].replace('rooms/list_room_images/', '');
                    const newUrl = parts[0] + '/' + newPath;
                    return {
                        original: newUrl,
                        thumbnail: newUrl,
                        room_id: imageUrl.room,
                    };
                } else {
                    return {
                        original: imageUrl.image,
                        thumbnail: imageUrl.image,
                        room_id: imageUrl.room,
                    };
                }
            });
        } else {
            throw new Error('Failed to fetch room images for room ' + roomNumber);
        }
    } catch (error) {
        throw new Error(`Error fetching room images for room ${roomNumber}: ${error.message}`);
    }
};
