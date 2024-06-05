import URL from "@/constants/constants";

export const fetchRoomImagesForRoomID = async (roomNumber) => {
    try {
        const response = await fetch(`${URL}/api/rooms/create_list_room_image/${roomNumber}/`);
        if (response.ok) {
            const imagesUrls = await response.json();
            return imagesUrls.map((imageUrl) => {
                if (imageUrl.image.includes('api')) {
                    const parts = imageUrl.image.split('/api/');
                    let newPath = parts[1].replace('rooms/create_list_room_image/', '');
                    console.log(newPath.length, 'bbb')
                    if(newPath.length==28)
                        newPath = newPath.slice(2);
                    else
                        newPath = newPath.slice(3);
                    const newUrl = parts[0]+'/'+newPath
                    return {
                        original: newUrl,
                        thumbnail: newUrl,
                        room_id: imageUrl.room,
                        id: imageUrl.id
                    };
                } else {
                    return {
                        original: imageUrl.image,
                        thumbnail: imageUrl.image,
                        room_id: imageUrl.room,
                        id: imageUrl.id
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
