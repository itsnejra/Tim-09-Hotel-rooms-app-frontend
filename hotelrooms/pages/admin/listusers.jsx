import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import "react-image-gallery/styles/css/image-gallery.css";
import Header from "@/src/components/layout/header";
import { fetchUserData } from "@/src/utils/fetch/fetchUserData";
import Footer from "@/src/components/layout/footer";
import { authenticateUser } from "@/src/utils/auth/userAuthentication";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { fetchPaginatedStaffData } from "@/src/utils/fetch/fetchPaginatedStaffData";
import Link from "next/link";
import URL from "@/constants/constants";

const EmployeePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState();
  const [staffData, setStaffData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [StaffToDelete, setStaffToDelete] = useState(false);

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


  useEffect(() => {

      const getStaffData = async (currentPage) => {
      try {

        const data = await fetchPaginatedStaffData(currentPage);
        setStaffData(data);
        if(data.length === 0) {
          setHasMoreData(false);
        }
      } catch(error) {
          console.error(error.message);
      }
    }
    getStaffData(currentPage);
  }, [currentPage])


  if (!isLoggedIn) {
    return null;
  }

  if (userType !== 'Admin') {
    router.push('/');
    return null;
  }

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
      setHasMoreData(true);
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleStaffDelete = async (id) => {
    try {
      console.log(`${URL}/api/user/edit/${id}/`)
      const response = await fetch(`${URL}/api/user/edit/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log(response)

      if (response.ok) {
        // Update the reservations state by filtering out the deleted reservation
        setStaffData((prevStaffData) =>
          prevStaffData.filter((staff) => staff.id !== id)
        );
        setIsModalOpen(false);
      } else {
        console.error("Failed to delete staff member");
      }
    } catch (error) {
      console.error("Error deleting staff member:", error);
    }
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
            <Link href="/admin/adduser" className="bg-green-500 text-white px-4 py-2 rounded">
                Dodaj Zaposlenika
            </Link>
          </div>
          {staffData.length===0 &&
          <div className="font-bold text-gray-500 text-xl">Na ovoj stranici nema zaposlenika</div>}
          <table className="w-full bg-white shadow-md rounded">
            {staffData.length!==0 &&
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="p-4">Ime i Prezime</th>
                <th className="p-4">Email</th>
                <th className="p-4">Sektor</th>
                <th className="p-4 pl-11">Upravljaj</th>
              </tr>
            </thead>
            }
            <tbody>
              {staffData && staffData.map(staff => (
              <tr className="border-b hover:bg-gray-100">
                <td className="p-4 flex items-center">
                  <div>
                    <div className="font-semibold">{staff.name} {staff.surname}</div>
                  </div>
                </td>
                <td className="p-4">{staff.email}</td>
                <td className="p-4 pl-9">{staff.sector_id}</td>
                <td className="p-4 flex space-x-2">
                <Link href={`/admin/edituser?staffId=${staff.id}`}
                className="bg-orange-300 text-black px-3 py-1 mb-2 rounded-lg">Uredi</Link>
                  <button className="w-20 h-10 flex items-center justify-center"
                  onClick={() => {setStaffToDelete(staff.id); setIsModalOpen(true);}}>
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
              </tr>))}
            </tbody>
          </table>
          <div className="flex justify-center mt-8">
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
      </div>
      <Footer className="mt-auto" />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-6 relative z-10">
            <h2 className="text-lg font-bold mb-4">Jeste li sigurni da želite obrisati zaposlenika?</h2>
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-300 rounded-lg">Otkaži</button>
              <button onClick={() => handleStaffDelete(StaffToDelete)} className="px-4 py-2 bg-red-600 text-white rounded-lg">Potvrdi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;