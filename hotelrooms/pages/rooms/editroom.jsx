import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import URL from "../../constants/constants";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { authenticateUser } from "@/src/utils/auth/userAuthentication";
import ImageUpload from "@/src/components/layout/imageUpload";
import { fetchRoomDataForRoom } from '@/src/utils/fetch/fetchRoomDataOneRoom';
import { fetchRoomImagesForRoomID } from "@/src/utils/fetch/fetchRoomImagesOneRoomID";
import Link from "next/link";

const EditRoom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [imageFiles, setImageFiles] = useState([]);
  const [sectorId, setSectorId] = useState();
  const [roomData, setRoomData] = useState({});
  const [currentImages, setCurrentImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState();
  const router = useRouter();
  const { roomNumber } = router.query;

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
                    const images = await fetchRoomImagesForRoomID(roomNumber);
                    setCurrentImages(images);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        getRoomImages();
    }, [roomData]);

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
      const response = await fetch(`${URL}/api/rooms/edit/${roomNumber}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(roomData)
      });

      if (response.ok) {
        const roomCreationMessage = 'Soba uspješno uređena';
        if (imageFiles.length > 0) {
          await handleImageUpload(token, roomData.roomNumber);
        }
        setMessage({ type: 'success', text: imageFiles.length > 0 ? `${roomCreationMessage} i slike uspješno postavljene` : roomCreationMessage });
      } else {
        const errorData = await response.json();
        console.error('Error editting room:', errorData);
        setMessage({ type: 'error', text: 'Greška pri uređivanju sobe' });
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

  const handleImageDelete = async (id) => {
    const token = Cookies.get('accessToken');
    try {
      const response = await fetch(`${URL}/api/rooms/delete_room_image/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        setIsDeleteModalOpen(false);
        setCurrentImages(currentImages.filter(image => image.id !== id));
      } else {
        console.error("Failed to delete room image");
      }
      } catch (error) {
      console.error("Error deleting room image:", error);
      }
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
      <div className="container mx-auto mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Uredi Sobu {roomData.roomNumber }</h2>
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
                <div>
                  <span
                    className="block text-sm font-bold text-gray-700 mb-3"
                  >
                    Postojeće slike
                  </span>
                  {currentImages.length === 0 && (
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                      Nema slika</div>)}
                  {currentImages.length > 0 && (
                    currentImages.map((image, index) => (
                      <div key={index} className="flex w-full justify-between items-center mb-5">
                        <Link href={currentImages[index].original}
                              className="block text-sm font-medium text-gray-700 inline"
                              target="_blank">
                          Slika {index+1}
                        </Link>
                        <button type="button" onClick={() => {setImageToDelete(image.id); setIsDeleteModalOpen(true);}}
                                className="text-white bg-red-500 py-0.3 px-3 rounded">
                          X
                        </button>
                      </div>
                  ))
                  )}
                </div>
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
                            checked={roomData.airCondition}
                            onChange={() => setRoomData({ ...roomData, airCondition: true })}
                          />{" "}
                          Da
                        </label>
                        <label className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input
                            type="radio"
                            name="airConditionOption"
                            value="false"
                            checked={!roomData.airCondition}
                            onChange={() => setRoomData({ ...roomData, airCondition: false })}
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
                          <input type="radio" name="wifiOption" value="true"
                          checked={roomData.wifi}
                          onChange={() => setRoomData({ ...roomData, wifi: true })}/> Da
                        </label>
                        <label className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="wifiOption" value="false"
                          checked={!roomData.wifi}
                          onChange={() => setRoomData({ ...roomData, wifi: false })}/> Ne
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
                          <input type="radio" name="tvOption" value="true"
                          checked={roomData.tv}
                          onChange={() => setRoomData({ ...roomData, tv: true })}/> Da
                        </label>
                        <label className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="tvOption" value="false"
                          checked={!roomData.tv}
                          onChange={() => setRoomData({ ...roomData, tv: false })}/> Ne
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-[25rem]">
                  <div className="relative w-full min-w-[200px]">
                  {roomData && roomData.description && (
                  <textarea
                      rows="8"
                      class="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      name="description"
                      id="description"
                      defaultValue={roomData.description}
                    ></textarea>)}
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
                  {roomData && roomData.category && (
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="category"
                    name="category"
                    defaultValue={roomData.category.toLowerCase()}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Luksuzna">Luksuzna</option>
                    <option value="Predsjednicka">Predsjednička</option>
                  </select>)}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="bedType"
                  >
                    Tip Kreveta
                  </label>
                  {roomData && roomData.bedType && (
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="bedType"
                    name="bedType"
                    defaultValue={roomData.bedType.toLowerCase()}
                  >
                    <option value="Jednokrevetna">Jednokrevetna</option>
                    <option value="Dvokrevetna">Dvokrevetna</option>
                    <option value="Trokrevetna">Trokrevetna</option>
                  </select>)}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="sector"
                  >
                    Sektor
                  </label>
                  {roomData && roomData.sector_id && (
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="sector"
                    name="sector"
                    defaultValue={roomData.sector_id}
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
                  </select>)}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="capacity"
                  >
                    Kapacitet
                  </label>
                  {roomData && roomData.capacity && (
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="capacity"
                    name="capacity"
                    defaultValue={roomData.capacity}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>)}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="roomNumber"
                  >
                    Broj Sobe
                  </label>
                  {roomData && roomData.roomNumber && (
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="roomNumber"
                    name="roomNumber"
                    type="text"
                    defaultValue={roomData.roomNumber}
                  />)}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="view"
                  >
                    Pogled
                  </label>
                  {roomData && roomData.view && (
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="view"
                    name="view"
                    type="text"
                    defaultValue={roomData.view}
                  />)}
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
                    {roomData && roomData.price && (
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                      aria-describedby="price-currency"
                      style={{ textAlign: "right", paddingRight: "3rem" }}
                      defaultValue={roomData.price}
                    />)}
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
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-6 relative z-10">
            <h2 className="text-lg font-bold mb-4">Jeste li sigurni da želite obrisati sobu?</h2>
            <div className="flex justify-end">
              <button onClick={() => setIsDeleteModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-300 rounded-lg">Otkaži</button>
              <button onClick={() => handleImageDelete(imageToDelete)} className="px-4 py-2 bg-red-600 text-white rounded-lg">Potvrdi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRoom;
