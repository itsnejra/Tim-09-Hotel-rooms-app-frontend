import { useState } from 'react';
import URL from '../../constants/constants';

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
        <div>
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label><br />
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />
                <label htmlFor="surname">Surname:</label><br />
                <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required /><br />
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
