import URL from "@/constants/constants";

export const fetchOneUserData = async (id, token) => {
    const response = await fetch(`${URL}/api/user/edit/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch staff data');
    }
};
