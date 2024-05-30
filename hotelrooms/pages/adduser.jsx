import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import URL from '../constants/constants';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';

const AddUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userName, setUserName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = Cookies.get('accessToken');

                // Manually decode the JWT token
                const tokenParts = accessToken.split('.');
                if (tokenParts.length === 3) {
                    const payload = JSON.parse(atob(tokenParts[1]));
                    const userId = payload.user_id;

                    const response = await fetch(`${URL}/api/user/list_user/${userId}/`);
                    if (response.ok) {
                        const userData = await response.json();
                        setUserName(userData[0].name)
                        if (userData[0].is_superuser) {
                            setUserType('Admin');
                        } else if (userData[0].is_staff) {
                            setUserType('Staff');
                        } else if (userData[0].is_authenticated) {
                            setUserType('User');
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

    const handleLogin = () => {
        router.push('auth/login');
    };

    const handleRegister = () => {
        router.push('auth/register');
    };

    return (
        <div>
            <header className="bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <img src="fourseasons.jpeg" alt="Logo" className="h-8 mr-2" />
                        <span className="text-2xl font-bold text-gray-800">Four Seasons Hotel</span>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-800">Početna</a>
                        <span className="text-gray-600">|</span>
                        <a href="#" className="text-gray-600 hover:text-gray-800">O nama</a>
                        <span className="text-gray-600">|</span>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Kontakt</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <span className="text-gray-600 hover:text-gray-800 font-bold">{userName} ({userType})</span>
                                <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleLogin} className="text-gray-600 hover:text-gray-800">Prijava</button>
                                <button onClick={handleRegister} className="text-gray-600 hover:text-gray-800">Registracija</button>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <div class="container mx-auto mt-10">
  <div class="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
    <h2 class="text-2xl font-semibold mb-6">Dodaj Novog Zaposlenika</h2>
    <form>
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2 sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Ime
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text"/>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="surname">
            Prezime
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="surname" type="text"/>
        </div>
        <div class="col-span-2">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="jobTitle">
            Radno Mjesto
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="jobTitle" type="text"/>
        </div>
        <div class="col-span-2">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email"/>
        </div>
        <div class="col-span-2">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Lozinka
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password"/>
        </div>
        <div class="col-span-2">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="sector_id">
            Sektor
          </label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sector_id">
            <option>Izaberite sektor</option>
            <option value="1">Sektor 1</option>
            <option value="2">Sektor 2</option>
          </select>
        </div>
        <div class="col-span-2 flex justify-end">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Dodaj
          </button>
          <button class="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Otkaži
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold mb-2">O nama</h3>
                        <p className="text-gray-400 text-center">Hotel Four Seasons predstavlja sinonim za luksuz, udobnost i vrhunsku uslugu. Smješten u srcu najprestižnijih destinacija širom sveta, naša misija je da gostima pružimo nezaboravan boravak uz pažljivo osmišljene sadržaje i besprekornu uslugu.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold mb-2">Kompanija</h3>
                        <ul className="text-gray-400 text-center">
                            <li><a href="#" className="hover:text-white">O nama</a></li>
                            <li><a href="#" className="hover:text-white">Kontaktirajte nas</a></li>
                            <li><a href="#" className="hover:text-white">Uslovi</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold mb-2">Grad</h3>
                        <ul className="text-gray-400 text-center">
                            <li><a href="#" className="hover:text-white">Cairo</a></li>
                            <li><a href="#" className="hover:text-white">Giza</a></li>
                            <li><a href="#" className="hover:text-white">Luxer</a></li>
                            <li><a href="#" className="hover:text-white">Aswan</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AddUser;