import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import "react-image-gallery/styles/css/image-gallery.css";
import Header from "@/src/components/layout/header";
import { fetchUserData } from "@/src/utils/fetch/fetchUserData";
import Footer from "@/src/components/layout/footer";

const EmployeePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUserData();
      setUserId(userData.userId);
      setUserName(userData.userName);
      setUserType(userData.userType);
      setIsLoggedIn(userData.isLoggedIn);
    };

    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      getUserData();
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
      <div className="flex justify-center mt-10 flex-grow">
        <div className="w-3/4 p-6 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Lista Zaposlenika</h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Dodaj Zaposlenika
            </button>
          </div>
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="p-4">Ime i Prezime</th>
                <th className="p-4">Email</th>
                <th className="p-4">Sektor</th>
                <th className="p-4">Upravljaj</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-100">
                <td className="p-4 flex items-center">
                  <div>
                    <div className="font-semibold">Afan Čečo</div>
                  </div>
                </td>
                <td className="p-4">afan.ceco@gmail.com</td>
                <td className="p-4">Sektor 1</td>
                <td className="p-4 flex space-x-2">
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
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-100">
                <td className="p-4 flex items-center">
                  <div>
                    <div className="font-semibold">Sanid Muhić</div>
                  </div>
                </td>
                <td className="p-4">sanid.muhic@gmail.com</td>
                <td className="p-4">Sektor 2</td>
                <td className="p-4 flex space-x-2">
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
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-100">
                <td className="p-4 flex items-center">
                  <div>
                    <div className="font-semibold">Esad Kadušić</div>
                  </div>
                </td>
                <td className="p-4">esad.kadusic@gmail.com</td>
                <td className="p-4">Sektor 1</td>
                <td className="p-4 flex space-x-2">
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default EmployeePage;