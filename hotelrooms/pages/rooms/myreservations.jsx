import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import URL from "../../constants/constants";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { authenticateUser } from "@/src/utils/auth/userAuthentication";
import { fetchAllRoomData } from "@/src/utils/fetch/fetchAllRoomData";
import { format } from "date-fns";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const ViewReservations = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [roomData, setRoomData] = useState([])
  const [status, setStatus] = useState(true)
  const [hasMoreData, setHasMoreData] = useState(true)
  const router = useRouter();

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
    }

    authenticate();

  }, []);

  const accessToken = Cookies.get('accessToken');

  useEffect(() => {

    const getRoomData = async () => {
      try {
          const data = await fetchAllRoomData();
          setRoomData(data);
      } catch (error) {
          console.error(error.message);
      }
  };

  getRoomData();
  }, [currentPage])

  useEffect(() => {
    const fetchReservations = async () => {
      const pageSize = 5
      const start = (currentPage - 1) * pageSize;
      const end = currentPage * pageSize;
      try {
        const response = await fetch(`${URL}/api/rooms/list_reservations/${start}/${end}/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
          setHasMoreData(data.length === pageSize);
        } else {
          console.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    const fetchReservationsUser = async () => {
      const pageSize = 5
      const start = (currentPage - 1) * pageSize;
      const end = currentPage * pageSize;
      try {
        const response = await fetch(`${URL}/api/rooms/list_reservations_for_user/${userId}/${start}/${end}/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
          setHasMoreData(data.length === pageSize);
        } else {
          console.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    if(userType=='Admin' || userType=='Staff') {
      fetchReservations();
    } else {
      console.log('aaa')
      fetchReservationsUser();
    }
  },
  [currentPage, status, userType])

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    setUserType(null);
    router.push('/');
  };

  const handleLogin = () => {
    router.push("auth/login");
  };

  const handleRegister = () => {
    router.push("auth/register");
  };

  if (!isLoggedIn) {
    return null;
  }

  const handleStatusChange = async (reservationId) => {
    try {
      const response = await fetch(`${URL}/api/rooms/toggle_reservation_status/${reservationId}/`, {
        method: "PATCH",
      });
      if (response.ok) {
        // Update reservations list after successful status change
        setStatus(!status);
      } else {
        console.error("Failed to change reservation status");
      }
    } catch(error) {
      console.error("Error changing reservation status:", error);
    }
  }

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

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
      <main className="container mx-auto my-8 max-w-4xl">
      {userType === 'Admin' || userType==='Staff' ? (
        <h1 className="text-3xl font-bold text-left mb-6">Pregled rezervacija</h1>
    ) : (
        <h1 className="text-3xl font-bold text-left mb-6">Moje Rezervacije</h1>
    )}
        <div className="space-y-4">
          {reservations.length > 0 && reservations.map((reservation) =>  {
          const roomDataForReservation= roomData && roomData.filter(room => room.roomNumber === reservation.room_id)
          return (
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center" key={reservation.id}>
            <div className="flex flex-col justify-between w-full">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">
                    Soba broj {roomDataForReservation[0].roomNumber} - {roomDataForReservation[0].bedType}
                  </h3>
                  <p className="text-gray-600"> {format(new Date(reservation.startDate), 'dd.MM.yyyy')} – {format(new Date(reservation.endDate), 'dd.MM.yyyy')}</p>
                  <p className="text-lg font-bold text-gray-800 mt-2">
                    BAM {roomDataForReservation[0].price}
                  </p>
                  {reservation.status === true ?
                  <>
                    <p className="text-green-500 font-semibold">Potvrđena</p>
                  </> :
                  <>
                    <p className="text-red-500 font-semibold">Otkazana</p>
                  </>
                  }
                </div>
                <button className="w-10 h-10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {userType==='Admin'&&
                <button onClick={() => handleStatusChange(reservation.id)} className="w-20 h-10 flex items-center justify-center bg-red-300 rounded-lg mb-6 px-4 mr-10">
                  Otkaži
                </button>
                }
                  {userType==='Staff'&&
                <button onClick={() => handleStatusChange(reservation.id)} className="w-20 h-10 flex items-center justify-center bg-red-300 rounded-lg mb-6 px-4 mr-10">
                  Otkaži
                </button>
                }

                </button>
              </div>
            </div>
          </div>)})}
          <div className="flex justify-center mt-24">
            <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 px-3 py-1 text-black rounded-lg flex items-center space-x-2">
                <IoIosArrowBack size={24} />
                <span>Prethodna</span>
            </button>
            <button onClick={nextPage} disabled={!hasMoreData} className="px-3 py-1 text-black rounded-lg flex items-center space-x-2">
                <span>Sljedeća</span>
                <IoIosArrowForward size={24} />
            </button>
        </div>
        </div>
      </main>
     <Footer/>
    </div>
  );
};

export default ViewReservations;
