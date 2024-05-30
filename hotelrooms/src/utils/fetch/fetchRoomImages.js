import URL from "@/constants/constants";

export const fetchRoomImages = async () => {
    try {
        const response = await fetch(`${URL}/api/rooms/list_room_images/`);
        if (response.ok) {
            const imagesUrls = await response.json();
            return imagesUrls.map((imageUrl) => {
                const parts = imageUrl.image.split('/api/');
                const newPath = parts[1].replace('rooms/list_room_images/', '');
                const newUrl = parts[0] + '/' + newPath;
                return {
                    original: newUrl,
                    thumbnail: newUrl,
                    room_id: imageUrl.room,
                };
            });
        } else {
            throw new Error('Failed to fetch room images');
        }
    } catch (error) {
        throw new Error(`Error fetching room images: ${error.message}`);
    }
};
