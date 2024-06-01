import URL from "@/constants/constants";

export const fetchReviewData = async () => {
    const response = await fetch(`${URL}/api/rooms/list_reviews/`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch review data');
    }
};
