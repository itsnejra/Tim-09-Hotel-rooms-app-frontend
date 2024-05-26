import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import URL from '../constants/constants';
import Modal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'tailwindcss/tailwind.css';

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
    const [userId, setUserId] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);

    const openModal = (images) => {
        setCurrentImages(images);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = Cookies.get('accessToken');

                const tokenParts = accessToken.split('.');
                if (tokenParts.length === 3) {
                    const payload = JSON.parse(atob(tokenParts[1]));
                    const userId = payload.user_id;
                    setUserId(userId);

                    const response = await fetch(`${URL}/api/user/list_user/${userId}/`);
                    if (response.ok) {
                        const userData = await response.json();
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

    const roomImages = [
        {
            original: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/431482656.jpg?k=582cbf330fa99dec29e145174f05b01c7d7c2dd6168f76da91a0c42b3ecee43d&o=&hp=1',
            thumbnail: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/431482656.jpg?k=582cbf330fa99dec29e145174f05b01c7d7c2dd6168f76da91a0c42b3ecee43d&o=&hp=1'
        },
        {
            original: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/431488949.jpg?k=802299f59a684874b521112b8e7fd933d815c45cb63ae6ce029dff8950562d7d&o=&hp=1',
            thumbnail: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/431488949.jpg?k=802299f59a684874b521112b8e7fd933d815c45cb63ae6ce029dff8950562d7d&o=&hp=1'
        },
        {
            original: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/431489442.jpg?k=4ef016571552e6dd42b58cc0cd860ddb09561aca573bc5eead384fa904722ddb&o=&hp=1',
            thumbnail: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/431489442.jpg?k=4ef016571552e6dd42b58cc0cd860ddb09561aca573bc5eead384fa904722ddb&o=&hp=1'
        }
    ];
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
                        <a href="#" className="text-gray-600 hover:text-gray-800">Prijava</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Registracija</a>
                    </div>
                </div>
            </header>
            <section className="hero-bg h-screen flex items-center justify-center bg-gray-800 bg-cover bg-no-repeat" style={{ backgroundImage: "url('pozadina.png')" }}>
                <div className="container mx-auto flex flex-col items-center justify-center h-full text-white text-center">
                    <h1 className="text-4xl font-bold mb-4">Rezervišite svoju sobu i više od toga, dotaknite svoje snove!</h1>
                    <form id="searchForm" className="flex flex-wrap space-x-2">
                        <div className="relative flex items-center">
                            <input id="arrivalDateInput" type="date" className="px-4 py-2 focus:outline-none focus:bg-gray-700 rounded-lg" />
                            <label htmlFor="arrivalDateInput" className="text-gray-400 ml-2 absolute">Check in</label>
                        </div>
                        <div className="relative flex items-center">
                            <input id="departureDateInput" type="date" className="px-4 py-2 focus:outline-none focus:bg-gray-700 rounded-lg" />
                            <label htmlFor="departureDateInput" className="text-gray-400 ml-2 absolute">Check out</label>
                        </div>
                        <div className="relative flex items-center">
                            <input id="priceFromInput" type="number" placeholder="Cijena od" className="px-4 py-2 focus:outline-none focus:bg-gray-700 rounded-lg text-black" />
                        </div>
                        <div className="relative flex items-center">
                            <input id="priceToInput" type="number" placeholder="Cijena do" className="px-4 py-2 focus:outline-none focus:bg-gray-700 rounded-lg text-black" />
                        </div>
                        <input id="capacityInput" type="number" placeholder="Kapacitet" className="px-4 py-2 focus:outline-none focus:bg-gray-700 rounded-lg text-black" />
                        <button id="searchButton" className="bg-red-600 px-4 py-2 rounded-r-lg">Pretraži</button>
                    </form>
                </div>
            </section>
            <section className="container mx-auto py-16">
                <h2 className="text-3xl font-bold text-center mb-8">Istaknute Sobe u hotelu Four Seasons</h2>
                <div className="space-y-8">
                    <div className="bg-white rounded-lg shadow-lg p-4 flex items-center">
                        <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/431481273.jpg?k=dc27ec71039b7ab2acbbcd5dc1c353162d7cc08fd3d5789d03a41a6d7f4531d8&o=&hp=1" alt="Naziv slike" className="w-1/4 h-48 object-cover rounded-lg cursor-pointer" onClick={() => openModal(roomImages)} />
                        <div className="ml-4 w-3/4 grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xl font-semibold">Cairo Room</h3>
                                <p className="text-gray-600">Tip kreveta: King</p>
                                <p className="text-gray-600">Klima: Da</p>
                                <p className="text-gray-600">WiFi: Da</p>
                                <p className="text-gray-600">TV: Da</p>
                                <button className="bg-gray-300 text-black px-3 py-1 mb-2 rounded-lg">Recenzije</button>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold mb-4">BAM 147</p>
                            </div>
                        </div>
                    </div>
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
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Room Image Gallery"
        >
            <button onClick={closeModal} className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1">X</button>
            <ImageGallery items={currentImages} />
        </Modal>
    </div>
);}
export default IndexPage;

