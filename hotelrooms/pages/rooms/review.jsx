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
import ImageUpload from "@/src/components/layout/imageUpload";
import { use } from "react";

const ReviewPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [imageFiles, setImageFiles] = useState([]);
  const [rating, setRating] = useState(0); // Initialize rating state
  const [comment, setComment] = useState(''); // Initialize comment state
  const router = useRouter();
  const { roomNumber } = router.query;

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = Cookies.get('accessToken');

    const currentDate = new Date().toISOString().split('T')[0];
    const reviewData = {
      score: rating,
      experience: comment,
      date: currentDate,
    };

    console.log(reviewData)

    try {
      const response = await fetch(`${URL}/api/rooms/add_review/${roomNumber}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        const reviewCreationMessage = 'Recenzija uspješno dodana';
        const responseData = await response.json();
        const reviewNumber = responseData.id;
        if (imageFiles.length > 0) {
          await handleImageUpload(token, reviewNumber);
        }
        setMessage({ type: 'success', text: imageFiles.length > 0 ? `${reviewCreationMessage} i slike uspješno postavljene` : reviewCreationMessage });
      } else {
        const errorData = await response.json();
        console.error('Error creating review:', errorData);
        console.log('Error data', errorData)
        setMessage({ type: 'error', text: `${errorData['error']}` });
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage({ type: 'error', text: 'Network error' });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    } finally {
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const handleImageUpload = async (token, reviewNumber) => {
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(`${URL}/api/rooms/create_list_review_image/${reviewNumber}/`, {
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
      <div class="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
        <h1 class="flex justify-center text-3xl font-semibold mb-4">
          Four Seasons Apartman
        </h1>
        <div class="w-16 h-16 flex items-center mb-4">
          <div>
            <h2 class="text-sm font-semibold">Soba {roomNumber}</h2>
          </div>
        </div>
        <form class="mb-4" onSubmit={handleSubmit}>
        {message.text && (
              <div
                className={`mb-4 p-4 rounded ${
                  message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}
          <div class="mb-4" style={{ display: "flex", alignItems: "center" }}>
            <label class="block text-gray-700">Ocjena</label>
            <div style={{ marginLeft: "auto" }}>
            <ReactStars
            count={5}
            size={24}
            color2={"#ffd700"}
            half={false}
            edit={true}
            value={rating} // Set the initial value to 2 stars
            onChange={(newRating) => setRating(newRating)}
            />
            </div>
          </div>
          <div class="relative w-[38rem]">
            <div class="relative w-full min-w-[200px]">
              <textarea
                rows="8"
                class="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                value={comment} // Bind value of textarea to comment state
                onChange={(e) => setComment(e.target.value)}
                name="experience"
              ></textarea>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                <span className="font-semibold">Vaš Komentar</span>
              </label>
            </div>
            <div class="flex w-full justify-end py-1.5">
              <div class="flex justify-end space-x-2">
                <button type="submit" class="bg-black text-white px-3 py-1 rounded-md">
                  Potvrdi
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="mt-4">
         <ImageUpload setImageFiles={setImageFiles}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ReviewPage;