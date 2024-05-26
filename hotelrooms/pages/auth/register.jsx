import { useState } from 'react';
import URL from '../../constants/constants';
import 'tailwindcss/tailwind.css';

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${URL}/api/user/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Registration successful!');
                // Redirect to another page if needed
                // Router.push('/success');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/pozadina.png')" }}>
        <div className="flex flex-row justify-center items-start w-full max-w-6xl">
          <div className="w-1/2 flex flex-col justify-center items-center text-white mr-8">
            <div className="p-10 flex items-center ml-[-250px] ">
              <img src="/b&w.png" alt="Ikona" className="mr-2 w-40 h-40"/>
              <div >
                <h1 className="text-6xl font-weight:500 mb-4 text-left border-b-2 border-black py-2 text-black">Four Seasons Hotel</h1>
                <p className="text-lg italic mb-8 text-left text-black">"Four Seasons Hotel - Gdje san postaje stvarnost."</p>
              </div> 
            </div>
            <div className="w-3/4 ml-24 text-left px-6 py-12 ml-[-250px]">
              <p className="text-4xl font-bold mb-0">Za ljepše sutra...</p>
              <p className="mt-0 text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center ml-8 mr-250">
            <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
              <h4 className="text-xl text-left mb-2" style={{ letterSpacing: '0px', fontWeight: 'normal', width: 'fit-content' }}>POČETAK</h4>
              <p className="text-3xl text-left mb-6" style={{ letterSpacing: '2px', fontWeight: '500', width: 'fit-content' }}>Napravite Profil</p>
              <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Ime</label>
                <input id="name" name="name" type="name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Prezime</label>
                <input id="name" name="name" type="name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input id="email" name="email" type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} value={formData.email} />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Lozinka</label>
                  <div className="relative">
                    <input id="password" name="password" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} value={formData.password} />
                    <button type="button" className="absolute top-0 right-0 p-3.5 rounded-e-md">
                      <svg id="password-icon" className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </svg>
                    </button>
                  </div>
                </div>
                <button type="submit" className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                  REGISTRACIJA
                </button>
              </form>
              <div className="mt-20 text-center">
               <p class="text-sm text-gray-500">Već imate profil? <a href="#" class="font-medium text-black hover:text-black">PRIJAVITE SE OVDJE</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}