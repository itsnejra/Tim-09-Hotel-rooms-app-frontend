import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import URL from "../../constants/constants";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { authenticateUser } from "@/src/utils/auth/userAuthentication";

const ViewReservations = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [reservations, setReservations] = useState([]);
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

    authenticate();

  }, []);

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
     <Footer/>
    </div>
  );
};

export default ViewReservations;
