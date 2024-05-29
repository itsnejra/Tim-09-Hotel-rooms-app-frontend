import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import URL from '../constants/constants';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';

const ReservationPage = () => {
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
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl font-light">Standard Soba - Four Seasons Hotel</h2>
                        <div class="flex items-center">
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <span class="w-1 h-1 mx-1.5 bg-black-500 rounded-full dark:bg-black-400"></span>
    <a href="#" class="text-sm font-medium text-black-900 underline hover:no-underline dark:text-black">4 recenzije</a>
</div>
              <img src="https://via.placeholder.com/600x400" className="w-full h-auto" alt="Slika Sobe" />
                            <div className="grid grid-cols-5 gap-2">
                                <img src="https://via.placeholder.com/120" className="w-full h-auto" alt="Slika Sobe" />
                                <img src="https://via.placeholder.com/120" className="w-full h-auto" alt="Slika Sobe" />
                                <img src="https://via.placeholder.com/120" className="w-full h-auto" alt="Slika Sobe" />
                                <img src="https://via.placeholder.com/120" className="w-full h-auto" alt="Slika Sobe" />
                                <img src="https://via.placeholder.com/120" className="w-full h-auto" alt="Slika Sobe" />
                            </div>
                        </div>
                    </div>   
                    <div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Opis Sobe</h2>
                            <p className="mb-2">Lorem ipsum dolor sit amet.</p>
                            <div className="mb-4">
                                <label htmlFor="prijava" className="block font-semibold">Dolazak - Odlazak</label>
                                <input type="date" id="prijava" className="w-full p-2 border rounded-md" />
                                <input type="date" id="odjava" className="w-full p-2 border rounded-md mt-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="gosti" className="block font-semibold">Broj Gostiju</label>
                                <select id="gosti" className="w-full p-2 border rounded-md">
                                    <option value="1">1 gost</option>
                                    <option value="2">2 gosta</option>
                                    <option value="3">3 gosta</option>
                                    <option value="4">4 gosta</option>
                                </select>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <p className="font-bold">Cijena Sobe</p>
                                <p className="font-bold">KM 0.00</p>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-bold">Dodatne Usluge</p>
                                <p className="font-bold">KM 0.00</p>
                            </div>
                            <div className="flex justify-between items-center mb-4 text-lg font-bold">
                                <p>Ukupno</p>
                                <p>KM 0.00</p>
                            </div>
                            <button className="w-full bg-black text-white py-2 rounded-md">REZERVIŠI</button>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                            <h2 className="text-xl font-bold mb-2">Dodatni Sadržaji</h2>
                            <div className="mb-2">
                                <input type="checkbox" id="dodatni-krevet" className="mr-2" />
                                <label htmlFor="dodatni-krevet">Dodatni Kreveti</label>
                                <select className="ml-2 p-1 border rounded-md">
                                    <option value="1">1 dodatni krevet</option>
                                    <option value="2">2 dodatna kreveta</option>
                                </select>
                                <p className="inline-block ml-2">KM 0.00</p>
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="parking" className="mr-2" />
                                <label htmlFor="parking">Parking</label>
                                <p className="inline-block ml-2">KM 100.00</p>
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="dorucak" className="mr-2" />
                                <label htmlFor="dorucak">Doručak</label>
                                <select className="ml-2 p-1 border rounded-md">
                                    <option>vegetarijanski</option>
                                    <option>nevegetarijanski</option>
                                </select>
                                <p className="inline-block ml-2">KM 0.00/Noć</p>
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="vecera" className="mr-2" />
                                <label htmlFor="vecera">Večera</label>
                                <p className="inline-block ml-2">KM 0.00/Noć</p>
                            </div>
                        </div>
</div>
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

export default ReservationPage;