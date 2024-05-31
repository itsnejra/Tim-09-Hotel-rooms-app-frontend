import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import URL from "../../constants/constants";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { authenticateUser } from "@/src/utils/auth/userAuthentication";

const AddRoom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header
          isLoggedIn={isLoggedIn}
          userName={userName}
          userType={userType}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
      />
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
                  <div class="flex items-center justify-between mt-10">
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
                    <option value="4">4</option>
                    <option value="5">5</option>
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
      <Footer/>
    </div>
  );
};

export default AddRoom;