import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import URL from '../constants/constants';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Header from '@/src/components/layout/header';
import Footer from '@/src/components/layout/footer';
import { fetchRoomData } from '@/src/utils/fetch/fetchRoomData';
import { fetchRoomImages } from '@/src/utils/fetch/fetchRoomImages';
import { fetchReviewData } from '@/src/utils/fetch/fetchReviewData';
import { fetchReviewImages } from '@/src/utils/fetch/fetchReviewImages';
import { fetchUserData } from '@/src/utils/fetch/fetchUserData';
import Search from '@/src/components/homepage/search';
import { fetchFilteredRoomData } from '@/src/utils/fetch/fetchFilteredRoomData';
import Link from 'next/link';
import GenerateStar from '@/src/components/helper/generatestar';
import Date from '@/src/components/helper/dateformat';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const IndexPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userId, setUserId] = useState(null); // State to store user ID
    const [userName, setUserName] = useState('')
    const [roomData, setRoomData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [tempImages, setTempImages] = useState([]);
    const [reviewImages, setReviewImages] = useState([]);
    const [roomReviews, setRoomReviews] = useState([]);
    const [filters, setFilters] = useState({ startPrice: 0, endPrice: 0, startCapacity: 0, endCapacity: 0 });
    const [isSearchApplied, setIsSearchApplied] = useState(false);

    const openModal = (images) => {
        setTempImages(images);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    
    const router = useRouter()

    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData();
            setUserId(userData.userId);
            setUserName(userData.userName);
            setUserType(userData.userType);
            setIsLoggedIn(userData.isLoggedIn);
        };

        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            getUserData();
        } else {
            setIsLoggedIn(false);
        }

        const getRoomData = async () => {
            try {
                let data
                if (isSearchApplied) {
                    data = await fetchFilteredRoomData(filters.startPrice, filters.endPrice, filters.startCapacity, filters.endCapacity, currentPage);
                } else {
                    data = await fetchRoomData(currentPage);
                }
                setRoomData(data);

                const reviewsObj = {};
                data.forEach(room => {
                    reviewsObj[room.roomNumber] = { state: false };
                });
                setRoomReviews(reviewsObj);
            } catch (error) {
                console.error(error.message);
            }
        };

        getRoomData();
    }, [currentPage, filters, isSearchApplied]);

    useEffect(() => {
        const getReviewData = async () => {
            try {
                const data = await fetchReviewData();
                setReviewData(Array.isArray(data) ? data : []);

            } catch (error) {
                console.error(error.message);
            }
        };

        getReviewData();
    }, [])

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setIsLoggedIn(false);
        setUserType(null);
    };

    const handleLogin = () => {
        router.push('auth/login')
    }

    const handleRegister = () => {
        router.push('auth/register')
    }

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };


    useEffect( () => {
        const getRoomImages = async () => {
            try {
                const images = await fetchRoomImages();
                setCurrentImages(images);
            } catch (error) {
                console.error(error.message);
            }
        };

        getRoomImages();
    }, [roomData])

    useEffect( () => {
        const getReviewImages = async () => {
            try {
                const images = await fetchReviewImages();
                setReviewImages(images);
            } catch (error) {
                console.error(error.message);
            }
        };

        getReviewImages();
    }, [roomData])

    const toggleReviews = (roomNumber) => {
        setRoomReviews(prevState => {
            return {
                ...prevState,
                [roomNumber]: {
                    ...prevState[roomNumber],
                    state: !prevState[roomNumber].state
                }
            };
        });
    };

    const handleSearch = (startPrice, endPrice, startCapacity, endCapacity) => {
        setFilters({ startPrice, endPrice, startCapacity, endCapacity });
        setCurrentPage(1);
        setIsSearchApplied(true);
    };

    const handleClearSearch = () => {
        setFilters({ startPrice: 0, endPrice: 0, startCapacity: 0, endCapacity: 0 });
        setCurrentPage(1); // Reset to the first page
        setIsSearchApplied(false); // Mark that search is not applied
    };

    return (
        <div>
            <Header
                isLoggedIn={isLoggedIn}
                userName={userName}
                userType={userType}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
            />
            <Search onSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                    isSearchApplied={isSearchApplied}
            />

    <section className="container mx-auto py-16">
    <h2 className="text-3xl font-bold text-center mb-8">Istaknute Sobe u hotelu Four Seasons</h2>
<div className="space-y-8">
{roomData.map(room => {
    const filteredImages = currentImages.filter(image => image.room_id === room.roomNumber);
    const filteredReviewData = reviewData.filter(data => data.room_id === room.roomNumber);
    return (
        <div key={room.roomNumber} className="bg-white rounded-lg shadow-lg p-4 grid grid-rows-1">
            {filteredImages.length > 0 ? (
                <>
                    <div className="flex items-center">
                    <img
                        src={filteredImages[0].original}
                        alt="Naziv slike"
                        className="w-1/4 h-48 object-cover rounded-lg"
                        onClick={() => openModal(filteredImages)}
                    />
                    <div className="ml-4 w-3/4 grid grid-cols-2 gap-4 flex flex-wrap">
                        <div>
                            
                            <h3 className="text-xl font-semibold">Room number: {room.roomNumber}</h3>
                            <p className="text-gray-600">Tip kreveta: {room.bedType}</p>
                            <p className="text-gray-600">Klima: {room.airCondition ? 'Da' : 'Ne'}</p>
                            <p className="text-gray-600">WiFi: {room.wifi ? 'Da' : 'Ne'}</p>
                            <p className="text-gray-600">TV: {room.tv ? 'Da' : 'Ne'}</p>
                            <button className="bg-gray-300 text-black px-3 py-1 mb-2 rounded-lg" onClick={() => toggleReviews(room.roomNumber)}>Recenzije</button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold mb-4">BAM {room.price}</p>
                            {userType === 'Admin' && (
    <div className="flex flex-col items-center justify-center">
        <button className="bg-orange-300 text-black px-3 py-1 mb-2 rounded-lg">Uredi sobu</button>
        <button className="text-gray-500 hover:text-red-600" onClick={() => console.log('Izbriši sobu')}>
            <img
                src="https://img.icons8.com/?size=50&id=1942&format=png"
                alt="Izbriši sobu"
                className="h-6 w-6"
            />
        </button>
    </div>
)}
{isLoggedIn===true&& userType!='Admin'&& userType!='Staff'&&
<div className="flex flex-col items-center justify-center">
        <button className="bg-orange-300 text-black px-3 py-1 mb-2 rounded-lg">Rezervacija</button>
        <button className="text-gray-500 hover:text-red-600">Dodaj recenziju</button>
    </div>
}
{userType === 'Staff' && 
<div className="flex flex-col items-center justify-center">
        <button className="bg-orange-300 text-black px-3 py-1 mb-2 rounded-lg">Uredi sobu</button>
        <button className="text-gray-500 hover:text-red-600" onClick={() => console.log('Izbriši sobu')}>
            <img
                src="https://img.icons8.com/?size=50&id=1942&format=png"
                alt="Izbriši sobu"
                className="h-6 w-6"
            />
        </button>
    </div>}
      </div>
         </div>
                    </div>
                    {roomReviews[room.roomNumber].state  && (
                    <>
                    {filteredReviewData.map(oneReviewData => {
                        const filteredReviewImages = reviewImages.filter(image => image.review_id === oneReviewData.id);
                        return (
                        <div key={oneReviewData.id} className="mt-5">
                            <hr />
                            <div className="mt-4">
                                <div className="text-lg font-bold">{oneReviewData.experience}</div>
                                <div className="flex items-center space-x-2">
                                    <GenerateStar score={oneReviewData.score}/>
                                    <Date date={oneReviewData.date}/>
                                </div>
                            </div>
                                <img className="flex-shrink-0 w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center rounded-lg"
                                    src={filteredReviewImages[0].original}
                                    alt="Naziv slike"
                                    onClick={() => openModal(filteredReviewImages)}
                                />
                        </div>)
                        })}
                    </>
            )}
                </>
            ) : (
                <div className="ml-4 w-3/4 grid grid-cols-2 gap-4">
                    <div>
                            <h3 className="text-xl font-semibold">Room number: {room.roomNumber}</h3>
                            <p className="text-gray-600">Tip kreveta: {room.bedType}</p>
                            <p className="text-gray-600">Klima: {room.airCondition ? 'Da' : 'Ne'}</p>
                            <p className="text-gray-600">WiFi: {room.wifi ? 'Da' : 'Ne'}</p>
                            <p className="text-gray-600">TV: {room.tv ? 'Da' : 'Ne'}</p>
                            <button className="bg-gray-300 text-black px-3 py-1 mb-2 rounded-lg" onClick={() => toggleReviews(room.roomNumber)}>Recenzije</button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold mb-4">BAM {room.price}</p>
                            {userType === 'Admin' && (
    <div className="flex flex-col items-center justify-center">
        <button className="bg-orange-300 text-black px-3 py-1 mb-2 rounded-lg">Uredi sobu</button>
        <button className="text-gray-500 hover:text-red-600" onClick={() => console.log('Izbriši sobu')}>
            <img
                src="https://img.icons8.com/?size=50&id=1942&format=png"
                alt="Izbriši sobu"
                className="h-6 w-6"
            />
        </button>
    </div>
)}
{isLoggedIn===true&& userType!='Admin'&& userType!='Staff'&&
<div className="flex flex-col items-center justify-center">
        <button className="bg-orange-300 text-black px-3 py-1 mb-2 rounded-lg">Rezervacija</button>
        <button className="text-gray-500 hover:text-red-600">Dodaj recenziju</button>
    </div>
}
{userType === 'Staff' && 
<div className="flex flex-col items-center justify-center">
        <button className="bg-orange-300 text-black px-3 py-1 mb-2 rounded-lg">Uredi sobu</button>
        <button className="text-gray-500 hover:text-red-600" onClick={() => console.log('Izbriši sobu')}>
            <img
                src="https://img.icons8.com/?size=50&id=1942&format=png"
                alt="Izbriši sobu"
                className="h-6 w-6"
            />
        </button>
    </div>}
      </div>
                </div>
            )}
        </div>
    );
})}
</div>
<div className="flex justify-center mt-8">
    <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 px-3 py-1 text-black rounded-lg flex items-center space-x-2">
        <IoIosArrowBack size={24} />
        <span>Prethodna</span>
    </button>
    <button onClick={nextPage} className="px-3 py-1 text-black rounded-lg flex items-center space-x-2">
        <span>Sljedeća</span>
        <IoIosArrowForward size={24} />
    </button>
</div>


</section>
            <section className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8">Koje <span className="text-red-600">Usluge</span> Vam <span className="text-red-600">Nudimo!</span></h2>
    <div className="grid grid-cols-3 gap-8">
        <div className="p-4 bg-white rounded-lg shadow-md border-2 border-orange-500">
            <h3 className="text-xl font-semibold mb-2">Besplatan WIFI</h3>
            <p className="text-gray-600">Naš Four Seasons Hotel nudi besplatan WiFi za sve goste. Bez obzira jeste li u sobi, restoranu ili na bazenu, možete ostati povezani s vašim najdražima i poslovnim partnerima.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md border-2 border-orange-500">
            <h3 className="text-xl font-semibold mb-2">Brza rezervacija</h3>
            <p className="text-gray-600">Uživajte u jednostavnom procesu rezervacije. Naš tim za pomoć stoji vam na raspolaganju kako biste brzo i lako rezervirali svoj boravak u našem hotelu.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md border-2 border-orange-500">
            <h3 className="text-xl font-semibold mb-2">Restorani</h3>
            <p className="text-gray-600">Naši restorani nude raznovrsne mediteranske delicije pripremljene od svježih namirnica. Uz to, imamo širok izbor vina iz najboljih vinograda.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md border-2 border-orange-500">
            <h3 className="text-xl font-semibold mb-2">Bazeni za plivanje</h3>
            <p className="text-gray-600">Otvoreni i zatvoreni bazeni s grijanom morskom vodom pružaju vam mogućnost opuštanja i rekreacije. Na krovu hotela nalazi se Premium Infinity bazen s panoramskim pogledom na more</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md border-2 border-orange-500">
            <h3 className="text-xl font-semibold mb-2">Ljepota &amp; zdravlje</h3>
            <p className="text-gray-600">Naša oaza čistog luksuza prostire se na 2000 m². Ovdje možete uživati u tretmanima za njegu lica i tijela, saunama i drugim spa tretmanima.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md border-2 border-orange-500">
            <h3 className="text-xl font-semibold mb-2">Tim za pomoć</h3>
            <p className="text-gray-600">Naš stručni tim uvijek je tu da vam pomogne i osigura da vaš boravak bude što ugodniji.</p>
        </div>
    </div>
</div>
</section>
            <section className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">Uštedite Vrijeme &amp; Uštedite Novac</h2>
</div>
            </section>
            <Footer/>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Room Image Gallery"
        >
            <button onClick={closeModal} className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1">X</button>
            <ImageGallery items={tempImages} />
        </Modal>
 </div>
    );
};

export default IndexPage;