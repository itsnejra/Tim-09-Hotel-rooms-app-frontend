import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import Header from '@/src/components/layout/header';
import Footer from '@/src/components/layout/footer';
import { fetchRoomDataForRoom } from '@/src/utils/fetch/fetchRoomDataOneRoom';
import { fetchRoomImagesForRoom } from '@/src/utils/fetch/fetchRoomImagesOneRoom';
import { authenticateUser } from '@/src/utils/auth/userAuthentication';
import URL from '@/constants/constants';

const ReservationPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [roomData, setRoomData] = useState({});
    const [currentImages, setCurrentImages] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedPansion, setSelectedPansion] = useState('Puni');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();
    const { roomNumber } = router.query;

    useEffect(() => {
        const authenticate = async () => {
            const authData = await authenticateUser(router, true);
            setIsLoggedIn(authData.isLoggedIn);
            setUserId(authData.userId);
            setUserName(authData.userName);
            setUserType(authData.userType);

            if (!authData.isLoggedIn) {
                return;
            }

            if (roomNumber) {
                try {
                    const data = await fetchRoomDataForRoom(roomNumber);
                    setRoomData(data);
                } catch (error) {
                    console.error('Error fetching room data:', error.message);
                }
            }
        };

        authenticate();
    }, [router, roomNumber]);

    useEffect(() => {
        const getRoomImages = async () => {
            try {
                if (roomNumber) {
                    const images = await fetchRoomImagesForRoom(roomNumber);
                    setCurrentImages(images);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        getRoomImages();
    }, [roomData]);

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setIsLoggedIn(false);
        setUserType(null);
        router.push('/');
    };

    const handleLogin = () => {
        router.push('auth/login');
    };

    const handleRegister = () => {
        router.push('auth/register');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (startDate > endDate) {
            setErrorMessage('Startni datum ne može biti veći od početnog.');

            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return;
        }

        const reservationData = {
            startDate,
            endDate,
            pansion: selectedPansion,
            user_id: userId,
            status: 1,
        };

        const token = Cookies.get('accessToken');
        try {
            const response = await fetch(`${URL}/api/rooms/add_reservation/${roomNumber}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                throw new Error('Failed to add reservation');
            }

            setSuccessMessage('Rezervacija uspješna');
            setErrorMessage('');

            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (error) {
            console.error('Error adding reservation:', error.message);
            setErrorMessage('Rezervacija neuspješna');
            setSuccessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    const calculatePansionPrice = (selectedPansion) => {
        if (selectedPansion === 'Puni') {
            return 100;
        } else if (selectedPansion === 'Polu') {
            return 50;
        } else {
            return 0;
        }
    };

    const calculateTotal = () => {
        if (!startDate || !endDate) return 0;

        const roomPrice = parseFloat(roomData.price) || 0;
        const pansionPrice = calculatePansionPrice(selectedPansion);

        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end - start;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff <= 0) return 0;

        return (roomPrice + pansionPrice) * daysDiff;
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Header
                isLoggedIn={isLoggedIn}
                userName={userName}
                userType={userType}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
            />
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="flex flex-col space-y-2">
                            <h2 className="text-2xl font-light">Soba {roomNumber} - Four Seasons Apartman</h2>
                            <img src={currentImages[0]?.original} className="w-full h-auto" alt="Slika Sobe" />
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="mb-4">
                                <label htmlFor="prijava" className="block font-semibold">Dolazak - Odlazak</label>
                                <input type="date" id="prijava" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border rounded-md" />
                                <input type="date" id="odjava" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 border rounded-md mt-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="pansion" className="block font-semibold">Pansion</label>
                                <select id="pansion" value={selectedPansion} onChange={(e) => setSelectedPansion(e.target.value)} className="w-full p-2 border rounded-md">
                                    <option value="Puni">Puni pansion</option>
                                    <option value="Polu">Polupansion</option>
                                    <option value="Bez">Bez pansiona</option>
                                </select>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-bold">Cijena Sobe</p>
                                <p className="font-bold">KM {roomData.price}</p>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-bold">Cijena pansiona</p>
                                <p className="font-bold">KM {calculatePansionPrice(selectedPansion)}</p>
                            </div>
                            <div className="flex justify-between items-center mb-4 text-lg font-bold">
                                <p>Ukupno</p>
                                <p>KM {calculateTotal()}</p>
                            </div>
                            <button type="submit" className="w-full bg-black text-white py-2 rounded-md">REZERVIŠI</button>
                        </form>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            {successMessage && (
                                <p className="font-bold text-green-500">{successMessage}</p>
                            )}
                            {errorMessage && (
                                <p className="font-bold text-red-500">{errorMessage}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReservationPage;
