import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = ({ isLoggedIn, userName, userType, handleLogout, handleLogin, handleRegister }) => {
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
    const router = useRouter();

    const toggleAdminDropdown = () => {
        setAdminDropdownOpen(!adminDropdownOpen);
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4">
                <div className="flex items-center">
                    <img src="/fourseasons.jpeg" alt="Logo" className="h-8 mr-2" />
                    <span className="text-2xl font-bold text-gray-800">Four Seasons Hotel</span>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link href="/" className="text-gray-600 hover:text-gray-800">Početna</Link>
                    <span className="text-gray-600">|</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800">O nama</a>
                    <span className="text-gray-600">|</span>
                    <Link href="/info/contact" className="text-gray-600 hover:text-gray-800">Kontakt</Link>
                </div>
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            {userType === 'Admin' && (
                                <>
                                    <div className="relative">
                                        <button
                                            className="text-gray-600 hover:text-gray-800 font-bold"
                                            onClick={toggleAdminDropdown}
                                        >
                                            Admin Opcije
                                        </button>
                                        {adminDropdownOpen && (
                                            <ul className="absolute bg-white text-black shadow-lg rounded" style={{ width: '115px', zIndex: 10 }}>
                                                <Link href="/rooms/addroom" className="block px-4 py-2 hover:bg-gray-200">
                                                    <li className='pt-2'>Dodaj sobu</li>
                                                </Link>
                                                <li>
                                                    <Link href="/admin/adduser" className="block px-4 py-2 hover:bg-gray-200">
                                                        <button>Dodaj zaposlenika</button>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/listusers" className="block px-4 py-2 hover:bg-gray-200">
                                                        <button>Lista zaposlenika</button>
                                                    </Link>
                                                </li>
                                                <li>
                                                <Link href="/rooms/myreservations" className="block px-4 py-2 hover:bg-gray-200 text-center">
                                                    Pregled rezervacija
                                                </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </>
                            )}
                            {userType === 'Staff' && (
                                <>
                                    <div className="relative">
                                        <button
                                            className="text-gray-600 hover:text-gray-800 font-bold"
                                            onClick={toggleAdminDropdown}
                                        >
                                            Staff opcije
                                        </button>
                                        {adminDropdownOpen && (
                                            <ul className="absolute bg-white text-black shadow-lg rounded" style={{ width: '115px', zIndex: 10 }}>
                                                <li>
                                                    <Link href="/rooms/addroom" className="block px-4 py-2 hover:bg-gray-200">
                                                        <button>Dodaj sobu</button>
                                                    </Link>
                                                </li>
                                                <li>
                                                <Link href="/rooms/myreservations" className="block px-4 py-2 hover:bg-gray-200 text-center">
                                                    Pregled rezervacija
                                                </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </>
                            )}
                            {isLoggedIn === true && userType !== 'Admin' && userType !== 'Staff' && (
                                <div className="relative">
                                    <Link href="/rooms/myreservations" className="block px-4 py-2 hover:bg-gray-200">
                                        <button>Moje rezervacije</button>
                                    </Link>
                                </div>
                            )}
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
    );
};

export default Header;
