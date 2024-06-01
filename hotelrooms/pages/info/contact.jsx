import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import "react-image-gallery/styles/css/image-gallery.css";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { fetchUserData } from "@/src/utils/fetch/fetchUserData";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
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
  });

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
    <div className="overflow-x-hidden">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        userType={userType}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
      <div className="bg-gray-100 flex flex-col min-h-screen">
        <section className="relative bg-gray-900 text-white flex-grow">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover opacity-50"
              src="contact.jpeg"
              alt="Background Image"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                Kontaktirajte nas
              </h1>
              <p className="mt-6 text-lg text-gray-300">
                Naš tim se zalaže za pružanje vrhunske usluge kako bi zadovoljio
                vaše potrebe i osigurao nezaboravan boravak u našem hotelu.
                Kontaktirajte nas za sva vaša pitanja i zahtjeve.
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                Pošaljite nam email:
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Pošaljite nam email za opšte upite, uključujući marketinške i
                partnerske prilike.
              </p>
              <a
                href="mailto:hello@flowbite.com"
                className="text-indigo-600 hover:text-gray-800 mt-2 inline-block"
              >
                <MdEmail className="inline-block mr-2" />
                hotelfourseasons@support.com
              </a>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                Pozovite nas:
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Nazovite nas da razgovarate s članom našeg tima. Uvijek smo
                sretni da pomognemo.
              </p>
              <a
                href="tel:+16467865060"
                className="text-indigo-600 hover:text-gray-800 mt-2 inline-block"
              >
                <FaPhoneAlt className="inline-block mr-2" />
                032 209 600
              </a>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                Posjetite nas na lokaciji:
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Pronađite nas na našim ekskluzivnim lokacijama, okruženi
                predivnim pejzažima.
              </p>
              <a
                href="#"
                className="text-indigo-600 hover:text-gray-800 mt-2 inline-block"
              >
                <FaMapMarkerAlt className="inline-block mr-2" />
                Otkrijte naše lokacije
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;