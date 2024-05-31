import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = ({ isLoggedIn, userName, userType, handleLogout, handleLogin,handleRegister }) => {
    const router = useRouter();

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
                    <a href="/contact" className="text-gray-600 hover:text-gray-800">Kontakt</a>
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
    );
};

export default Header;
