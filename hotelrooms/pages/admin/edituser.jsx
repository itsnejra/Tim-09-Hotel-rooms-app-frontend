import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import URL from "../../constants/constants";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { authenticateUser } from "@/src/utils/auth/userAuthentication";
import { fetchOneUserData } from "@/src/utils/fetch/fetchOneUserData";

const EditUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        sector_id: "1",
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [staffData, setStaffData] = useState({});

    const router = useRouter();
    const { staffId } = router.query;
    console.log(staffId)

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

    const token = Cookies.get('accessToken');

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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formDataEvent = new FormData(event.target);

        const userData = {
          name: formDataEvent.get('name'),
          surname: formDataEvent.get('surname'),
          email: formDataEvent.get('email'),
          password: formDataEvent.get('password'),
          sector_id: formDataEvent.get('sector_id'),
          is_staff: true
        };
    

        try {
          console.log(userData)

            const response = await fetch(`${URL}/api/user/edit/${staffId}/`
            ,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to edit employee');
            }

            setSuccessMessage('Zaposlenik uspješno uređen');
            setErrorMessage('');

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error edditing employee:', error.message);
            setErrorMessage('Uređivanje zaposlenika neuspješno');
            setSuccessMessage('');

            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };


    useEffect(() => {

        const getStaffData = async () => {
        try {
  
          const data = await fetchOneUserData(staffId, token);
          setStaffData(data);
        } catch(error) {
            console.error(error.message);
        }
      }
        getStaffData();

    }, [staffId])

    if (!isLoggedIn) {
        return null;
    }

    if (userType !== 'Admin') {
        router.push('/');
        return null;
    }



    console.log(staffData)

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
            <div className="container mx-auto mt-10">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">Dodaj Novog Zaposlenika</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Ime
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={staffData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                                    Prezime
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="surname"
                                    type="text"
                                    name="surname"
                                    defaultValue={staffData.surname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    name="email"
                                    defaultValue={staffData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Lozinka
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sector_id">
                                    Sektor
                                </label>
                                {staffData && staffData.sector_id && (
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="sector_id"
                                    name="sector_id"
                                    onChange={handleChange}
                                    defaultValue={`${staffData.sector_id}`}
                                >
                                    <option value="1">Sektor 1</option>
                                    <option value="2">Sektor 2</option>
                                </select>)}
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Uredi
                                </button>
                                <button
                                    className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => router.push('/admin/listusers')}
                                >
                                    Otkaži
                                </button>
                            </div>
                        </div>
                    </form>
                    {successMessage && (
                        <p className="mt-4 text-green-500 font-bold">{successMessage}</p>
                    )}
                    {errorMessage && (
                        <p className="mt-4 text-red-500 font-bold">{errorMessage}</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditUser;