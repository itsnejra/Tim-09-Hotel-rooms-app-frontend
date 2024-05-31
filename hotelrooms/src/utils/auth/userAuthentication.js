// utils/auth.js
import Cookies from 'js-cookie';
import { fetchUserData } from '../fetch/fetchUserData';

export const authenticateUser = async (router, redirectOnFail = true) => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
        if (redirectOnFail) {
            router.push('/auth/login');
        }
        return { isLoggedIn: false };
    }

    try {
        const userData = await fetchUserData();
        return {
            isLoggedIn: true,
            userType: userData.userType,
            userId: userData.userId,
            userName: userData.userName,
        };
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        if (redirectOnFail) {
            router.push('/auth/login');
        }
        return { isLoggedIn: false };
    }
};
