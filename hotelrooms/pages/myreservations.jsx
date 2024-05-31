import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import URL from "../constants/constants";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";

const ViewReservations = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [reservations, setReservations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const tokenParts = accessToken.split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          const userId = payload.user_id;

          const response = await fetch(`${URL}/api/user/list_user/${userId}/`);
          if (response.ok) {
            const userData = await response.json();
            setUserName(userData[0].name);
            if (userData[0].is_superuser) {
              setUserType("Admin");
            } else if (userData[0].is_staff) {
              setUserType("Staff");
            } else if (userData[0].is_authenticated) {
              setUserType("User");
            } else {
              setUserType("unauthenticated user");
            }
            setIsLoggedIn(true);
            fetchReservations(userId);
          } else {
            setIsLoggedIn(false);
          }
        } else {
          console.error("Invalid JWT token format");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    const fetchReservations = async (userId) => {
      try {
        const response = await fetch(`${URL}/api/reservations/user/${userId}/`);
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          console.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      fetchUserData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    setUserType(null);
  };

  const handleLogin = () => {
    router.push("auth/login");
  };

  const handleRegister = () => {
    router.push("auth/register");
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `${URL}/api/reservations/${reservationId}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setReservations(reservations.filter((r) => r.id !== reservationId));
      } else {
        console.error("Failed to cancel reservation");
      }
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src="fourseasons.jpeg" alt="Logo" className="h-8 mr-2" />
            <span className="text-2xl font-bold text-gray-800">
              Four Seasons Hotel
            </span>
          </div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Početna
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              O nama
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Kontakt
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-600 hover:text-gray-800 font-bold">
                  {userName} ({userType})
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Prijava
                </button>
                <button
                  onClick={handleRegister}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Registracija
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto my-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-left mb-6">Moje Rezervacije</h1>
        <div className="space-y-4">
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Room Image"
              className="w-24 h-24 rounded-md object-cover mr-4"
            />
            <div className="flex flex-col justify-between w-full">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">
                    Soba broj 5 - Dvokrevetna
                  </h3>
                  <p className="text-gray-600">Jun 3 – Jun 6</p>
                  <p className="text-lg font-bold text-gray-800 mt-2">
                    BAM 110
                  </p>
                  <p className="text-green-500 font-semibold">Potvrđena</p>
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
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Room Image"
              className="w-24 h-24 rounded-md object-cover mr-4"
            />
            <div className="flex flex-col justify-between w-full">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">
                    Soba broj 12 - Dvokrevetna
                  </h3>
                  <p className="text-gray-600">Jun 10 – Jun 12</p>
                  <p className="text-lg font-bold text-gray-800 mt-2">
                    BAM 167
                  </p>
                  <p className="text-red-500 font-semibold">Otkazana</p>
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
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">O nama</h3>
            <p className="text-gray-400 text-center">
              Hotel Four Seasons predstavlja sinonim za luksuz, udobnost i
              vrhunsku uslugu. Smješten u srcu najprestižnijih destinacija širom
              sveta, naša misija je da gostima pružimo nezaboravan boravak uz
              pažljivo osmišljene sadržaje i besprekornu uslugu.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Kompanija</h3>
            <ul className="text-gray-400 text-center">
              <li>
                <a href="#" className="hover:text-white">
                  O nama
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Kontaktirajte nas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Uslovi
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Grad</h3>
            <ul className="text-gray-400 text-center">
              <li>
                <a href="#" className="hover:text-white">
                  Cairo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Giza
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Luxer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Aswan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ViewReservations;
