import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import URL from '../constants/constants';

const IndexPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userId, setUserId] = useState(null); // State to store user ID

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = Cookies.get('accessToken');

                // Manually decode the JWT token
                const tokenParts = accessToken.split('.');
                if (tokenParts.length === 3) {
                    const payload = JSON.parse(atob(tokenParts[1]));
                    const userId = payload.user_id;
                    setUserId(userId); // Set user ID state

                    const response = await fetch(`${URL}/api/user/list_user/${userId}/`);
                    if (response.ok) {
                        const userData = await response.json();
                        // Determine user type based on response
                        if (userData[0].is_superuser) {
                            setUserType('admin');
                        } else if (userData[0].is_staff) {
                            setUserType('staff');
                        } else if (userData[0].is_authenticated) {
                            setUserType('authenticated_user');
                        } else {
                            setUserType('unauthenticated user');
                        }
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                } else {
                    console.error('Invalid JWT token format');
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
            }
        };

        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetchUserData();
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setIsLoggedIn(false);
        setUserType(null);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h1>You are logged in!</h1>
                    {userType && <p>Your user type is: {userType}</p>}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <h1>You are not logged in</h1>
            )}
        </div>
    );
};

export default IndexPage;
