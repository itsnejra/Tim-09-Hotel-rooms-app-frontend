import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import URL from '../../constants/constants';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

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
            const response = await fetch(`${URL}/api/user/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const { access, refresh } = await response.json();
                // Store tokens in cookies
                Cookies.set('accessToken', access);
                Cookies.set('refreshToken', refresh);
                // Redirect to home page
                router.push('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
