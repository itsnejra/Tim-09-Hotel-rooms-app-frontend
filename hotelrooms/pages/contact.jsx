import "tailwindcss/tailwind.css";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src="fourseasons.jpeg" alt="Logo" className="h-8 mr-2" />
            <span className="text-2xl font-bold text-gray-800">
              Four Seasons Hotel
            </span>
          </div>
        </div>
      </header>
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
        <section className="relative -mt-20 flex-grow">
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <form action="#" method="POST">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ime
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autoComplete="given-name"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prezime
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="family-name"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vaš email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Broj telefona
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vaša poruka
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  Podnošenjem ovog obrasca slažete se s našim{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    uslovima korištenja
                  </a>{" "}
                  i našom{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    politikom privatnosti
                  </a>{" "}
                  koja objašnjava kako možemo prikupljati, koristiti i otkrivati
                  vaše lične podatke uključujući trećim stranama.
                </p>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Pošaljite poruku
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <footer className="bg-gray-800 text-white py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="text-lg font-medium text-white">
                  Pošaljite nam email:
                </h3>
                <p className="mt-2 text-base text-gray-400">
                  Pošaljite nam email za opšte upite, uključujući marketinške i
                  partnerske prilike.
                </p>
                <a
                  href="mailto:hello@flowbite.com"
                  className="text-indigo-600 hover:text-white mt-2 inline-block"
                >
                  <MdEmail className="inline-block mr-2" />
                  hotelfourseasons@support.com
                </a>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  Pozovite nas:
                </h3>
                <p className="mt-2 text-base text-gray-400">
                  Nazovite nas da razgovarate s članom našeg tima. Uvijek smo
                  sretni da pomognemo.
                </p>
                <a
                  href="tel:+16467865060"
                  className="text-indigo-600 hover:text-white mt-2 inline-block"
                >
                  <FaPhoneAlt className="inline-block mr-2" />
                  032 209 600
                </a>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  Posjetite nas na lokaciji:
                </h3>
                <p className="mt-2 text-base text-gray-400">
                  Pronađite nas na našim ekskluzivnim lokacijama, okruženi
                  predivnim pejzažima.
                </p>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-white mt-2 inline-block"
                >
                  <FaMapMarkerAlt className="inline-block mr-2" />
                  Otkrijte naše lokacije
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContactUs;
