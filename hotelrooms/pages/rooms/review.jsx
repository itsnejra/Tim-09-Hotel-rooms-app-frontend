import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import URL from "../../constants/constants";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import React from "react";
import ReactStars from "react-stars";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { authenticateUser } from "@/src/utils/auth/userAuthentication";

const ReviewPage = () => {
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

  if (!isLoggedIn) {
    return null;
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
      <div class="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
        <h1 class="flex justify-center text-3xl font-semibold mb-4">
          Four Seasons Hotel
        </h1>
        <div class="w-16 h-16 flex items-center mb-4">
          <img
            class="w-12 h-12 rounded-full mr-3"
            src="https://via.placeholder.com/48"
            alt="Profile Image"
          />
          <div>
            <h2 class="text-sm font-semibold">User</h2>
          </div>
        </div>
        <div class="mb-4">
          <div class="mb-4" style={{ display: "flex", alignItems: "center" }}>
            <label class="block text-gray-700">Ocjena</label>
            <div style={{ marginLeft: "auto" }}>
              <ReactStars count={5} size={24} color2={"#ffd700"} />
            </div>
          </div>
          <div class="relative w-[38rem]">
            <div class="relative w-full min-w-[200px]">
              <textarea
                rows="8"
                class="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              ></textarea>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                <span className="font-semibold">Vaš Komentar</span>
              </label>
            </div>
            <div class="flex w-full justify-end py-1.5">
              <div class="flex justify-end space-x-2">
                <button class="bg-red-500 text-white px-3 py-1 rounded-md">
                  Otkaži
                </button>
                <button class="bg-black text-white px-3 py-1 rounded-md">
                  Potvrdi
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-gray-700">DODAJTE SLIKU</label>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="h-10 w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M512 416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24V312h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V200c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H168c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z" />
                </svg>
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </div>
              <input id="dropzone-file" type="file" class="hidden" multiple />
            </label>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button class="w-full bg-black text-white py-2 rounded-md">
            OSTAVI RECENZIJU
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ReviewPage;