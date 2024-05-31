import Cookies from 'js-cookie';
import URL from '@/constants/constants';

export const fetchUserData = async () => {
    try {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const tokenParts = accessToken.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid JWT token format');
        }

        const payload = JSON.parse(atob(tokenParts[1]));
        const userId = payload.user_id;

        const response = await fetch(`${URL}/api/user/list_user/${userId}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        const user = userData[0];
        return {
            userId,
            userName: user.name,
            userType: user.is_superuser ? 'Admin' : user.is_staff ? 'Staff' : user.is_authenticated ? 'User' : 'unauthenticated user',
            isLoggedIn: true,
            sector: user.sector_id,
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            userId: null,
            userName: '',
            userType: null,
            isLoggedIn: false,
        };
    }
};
