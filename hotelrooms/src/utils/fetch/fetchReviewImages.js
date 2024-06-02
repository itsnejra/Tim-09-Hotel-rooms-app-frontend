import URL from "@/constants/constants";

export const fetchReviewImages = async () => {
    try {
        const response = await fetch(`${URL}/api/rooms/list_review_images/`);
        if (response.ok) {
            const imagesUrls = await response.json();
            return imagesUrls.map((imageUrl) => {
                if (!imageUrl.image.includes('/api/')) {
                    // If the URL contains '/api/', leave it unchanged
                    return {
                        original: imageUrl.image,
                        thumbnail: imageUrl.image,
                        review_id: imageUrl.review,
                    };
                } else {
                    // Modify the URL as before if possible
                    const parts = imageUrl.image.split('/api/');
                    if (parts.length > 1) {
                        const newPath = parts[1].replace('rooms/list_review_images/', '');
                        const newUrl = parts[0] + '/' + newPath;
                        return {
                            original: newUrl,
                            thumbnail: newUrl,
                            review_id: imageUrl.review,
                        };
                    } else {
                        // If the split doesn't produce expected parts, return the original URL
                        return {
                            original: imageUrl.image,
                            thumbnail: imageUrl.image,
                            review_id: imageUrl.review,
                        };
                    }
                }
            });
        } else {
            throw new Error('Failed to fetch review images');
        }
    } catch (error) {
        throw new Error(`Error fetching review images: ${error.message}`);
    }
};
