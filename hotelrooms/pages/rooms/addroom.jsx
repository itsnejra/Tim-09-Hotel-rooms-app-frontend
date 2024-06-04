import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import URL from "../../constants/constants";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { authenticateUser } from "@/src/utils/auth/userAuthentication";
import ImageUpload from "@/src/components/layout/imageUpload";

const AddRoom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [imageFiles, setImageFiles] = useState([]);
  const [sectorId, setSectorId] = useState();
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
        const authData = await authenticateUser(router, true);
        setIsLoggedIn(authData.isLoggedIn);
        setUserId(authData.userId);
        setUserName(authData.userName);
        setUserType(authData.userType);
        setSectorId(authData.sector);

        if (!authData.isLoggedIn) {
            return;
        }
    }

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

  if (!isLoggedIn) {
    return null;
  }

  if(userType !== 'Admin' && userType!=='Staff') {
    router.push('/');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = Cookies.get('accessToken');
    const formData = new FormData(event.target);

    const roomData = {
      airCondition: formData.get('airConditionOption'),
      wifi: formData.get('wifiOption'),
      tv: formData.get('tvOption'),
      category: formData.get('category'),
      bedType: formData.get('bedType'),
      sector: formData.get('sector'),
      capacity: formData.get('capacity'),
      roomNumber: formData.get('roomNumber'),
      view: formData.get('view'),
      price: formData.get('price'),
      description: formData.get('description')
    };

    try {
      const response = await fetch(`${URL}/api/rooms/create_list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(roomData)
      });

      if (response.ok) {
        const roomCreationMessage = 'Soba uspješno dodana';
        if (imageFiles.length > 0) {
          await handleImageUpload(token, roomData.roomNumber);
        }
        setMessage({ type: 'success', text: imageFiles.length > 0 ? `${roomCreationMessage} i slike uspješno postavljene` : roomCreationMessage });
      } else {
        const errorData = await response.json();
        console.error('Error creating room:', errorData);
        setMessage({ type: 'error', text: 'Greška pri dodavanju sobe' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage({ type: 'error', text: 'Network error' });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    } finally {
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const handleImageUpload = async (token, roomNumber) => {
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('roomNumber', roomNumber);

      try {
        const response = await fetch(`${URL}/api/rooms/create_list_room_image/${roomNumber}/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error uploading image:', errorData);
          throw new Error('Error uploading image');
        }
      } catch (error) {
        console.error('Network error:', error);
        throw new Error('Network error');
      }
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
      <div className="container mx-auto mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Dodaj Sobu</h2>
          <form onSubmit={handleSubmit}>
            {message.text && (
              <div
                className={`mb-4 p-4 rounded ${
                  message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ImageUpload setImageFiles={setImageFiles}/>
                <div className="mb-4">
                  <div className="flex items-center justify-between mt-10">
                    <label
                      className="block text-sm font-medium leading-6 text-gray-900"
                      htmlFor="airCondition"
                    >
                      Klima Uređaj
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        className="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
                        id="airCondition"
                        type="checkbox"
                      />
                      <div className="inline-flex items-center space-x-2">
                        <label className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input
                            type="radio"
                            name="airConditionOption"
                            value="true"
                          />{" "}
                          Da
                        </label>
                        <label className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input
                            type="radio"
                            name="airConditionOption"
                            value="false"
                          />{" "}
                          Ne
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <label
                      className="block text-sm font-medium leading-6 text-gray-900"
                      htmlFor="wifi"
                    >
                      WiFi
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        className="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
                        id="wifi"
                        type="checkbox"
                      />
                      <div className="inline-flex items-center space-x-2">
                        <label className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="wifiOption" value="true" /> Da
                        </label>
                        <label className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="wifiOption" value="false" /> Ne
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <label
                      className="block text-sm font-medium leading-6 text-gray-900"
                      htmlFor="tv"
                    >
                      TV
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        className="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
                        id="tv"
                        type="checkbox"
                      />
                      <div className="inline-flex items-center space-x-2">
                        <label className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="tvOption" value="true" /> Da
                        </label>
                        <label className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="tvOption" value="false" /> Ne
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-[25rem]">
                  <div className="relative w-full min-w-[200px]">
                  <textarea
                      rows="8"
                      class="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      name="description"
                      id="description"
                    ></textarea>
                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Opis Sobe
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="category"
                  >
                    Kategorija
                  </label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="category"
                    name="category"
                  >
                    <option value="standard">Standard</option>
                    <option value="luksuzna">Luksuzna</option>
                    <option value="predsjednicka">Predsjednička</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="bedType"
                  >
                    Tip Kreveta
                  </label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="bedType"
                    name="bedType"
                  >
                    <option value="jednokrevetna">Jednokrevetna</option>
                    <option value="dvokrevetna">Dvokrevetna</option>
                    <option value="trokrevetna">Trokrevetna</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="sector"
                  >
                    Sektor
                  </label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="sector"
                    name="sector"
                  >
                    {userType==='Staff' && sectorId===1 &&
                    <option value="1">Sektor 1</option>
                    }
                    {userType==='Staff' && sectorId===2 &&
                    <option value="2">Sektor 2</option>
                    }
                    {userType!=='Staff' &&
                      <>
                      <option value="1">Sektor 1</option>
                      <option value="2">Sektor 2</option>
                      </>
                    }
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="capacity"
                  >
                    Kapacitet
                  </label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="capacity"
                    name="capacity"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="roomNumber"
                  >
                    Broj Sobe
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="roomNumber"
                    name="roomNumber"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="view"
                  >
                    Pogled
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="view"
                    name="view"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="price"
                  >
                    Cijena
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">KM</span>
                    </div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                      aria-describedby="price-currency"
                      style={{ textAlign: "right", paddingRight: "3rem" }}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span
                        className="text-gray-500 sm:text-sm"
                        id="price-currency"
                      >
                        BAM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Spremi
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AddRoom;
