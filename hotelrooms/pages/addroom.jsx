import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import URL from "../constants/constants";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";

const AddRoom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        // Manually decode the JWT token
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
      <div class="container mx-auto mt-10">
        <div class="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 class="text-2xl font-semibold mb-6">Dodaj Sobu</h2>
          <form>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="mt-4">
                  <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">
                    DODAJTE SLIKU
                  </label>
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="h-10 w-10 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M512 416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24V312h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V200c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H168c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z" />
                        </svg>
                        <p class="mt-1 text-sm text-gray-500">
                          Kliknite ili prevucite za dodavanje slike
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        multiple
                      />
                    </label>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="flex items-center justify-between">
                    <label
                      class="block text-sm font-medium leading-6 text-gray-900"
                      for="airCondition"
                    >
                      Klima Uređaj
                    </label>
                    <div class="flex items-center space-x-4">
                      <input
                        class="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
                        id="airCondition"
                        type="checkbox"
                      />
                      <div class="inline-flex items-center space-x-2">
                        <label class="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input
                            type="radio"
                            name="airConditionOption"
                            value="da"
                          />{" "}
                          Da
                        </label>
                        <label class="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input
                            type="radio"
                            name="airConditionOption"
                            value="ne"
                          />{" "}
                          Ne
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="flex items-center justify-between">
                    <label
                      class="block text-sm font-medium leading-6 text-gray-900"
                      for="wifi"
                    >
                      WiFi
                    </label>
                    <div class="flex items-center space-x-4">
                      <input
                        class="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
                        id="wifi"
                        type="checkbox"
                      />
                      <div class="inline-flex items-center space-x-2">
                        <label class="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="wifiOption" value="da" /> Da
                        </label>
                        <label class="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="wifiOption" value="ne" /> Ne
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="flex items-center justify-between">
                    <label
                      class="block text-sm font-medium leading-6 text-gray-900"
                      for="tv"
                    >
                      TV
                    </label>
                    <div class="flex items-center space-x-4">
                      <input
                        class="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
                        id="tv"
                        type="checkbox"
                      />
                      <div class="inline-flex items-center space-x-2">
                        <label class="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="tvOption" value="da" /> Da
                        </label>
                        <label class="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
                          <input type="radio" name="tvOption" value="ne" /> Ne
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="relative w-[25rem]">
                  <div class="relative w-full min-w-[200px]">
                    <textarea
                      rows="8"
                      class="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                    ></textarea>
                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Opis Sobe
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    for="category"
                  >
                    Kategorija
                  </label>
                  <select
                    class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="category"
                  >
                    <option value="standard">Standard</option>
                    <option value="luksuzna">Luksuzna</option>
                    <option value="predsjednicka">Predsjednička</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    for="bedType"
                  >
                    Tip Kreveta
                  </label>
                  <select
                    class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="bedType"
                  >
                    <option value="jednokrevetna">Jednokrevetna</option>
                    <option value="dvokrevetna">Dvokrevetna</option>
                    <option value="trokrevetna">Trokrevetna</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    for="sector"
                  >
                    Sektor
                  </label>
                  <select
                    class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="sector"
                  >
                    <option value="1">Sektor 1</option>
                    <option value="2">Sektor 2</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    for="capacity"
                  >
                    Kapacitet
                  </label>
                  <select
                    class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="capacity"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    for="roomNumber"
                  >
                    Broj Sobe
                  </label>
                  <input
                    class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="roomNumber"
                    type="text"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    for="view"
                  >
                    Pogled
                  </label>
                  <input
                    class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="view"
                    type="text"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    for="price"
                  >
                    Cijena
                  </label>
                  <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span class="text-gray-500 sm:text-sm">KM</span>
                    </div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                      aria-describedby="price-currency"
                      style={{ textAlign: "right", paddingRight: "3rem" }}
                    />
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span
                        class="text-gray-500 sm:text-sm"
                        id="price-currency"
                      >
                        BAM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end mt-6">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Spremi
              </button>
              <button
                class="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Otkaži
              </button>
            </div>
          </form>
        </div>
      </div>
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

export default AddRoom;