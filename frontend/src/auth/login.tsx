import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface formData{
    email: string,
    password: string,
}

const Login: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [formData, setFormData] = useState<formData>({ 
        email: '',
        password: '',
       });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            const res = await axiosInstance.post('/auth/login', formData);
            setMessage( res.data.message || 'Login successful!' );
            setTimeout(() => { navigate('/dashboard')}, 2000);
        }catch(err){
            const error = err instanceof Error ? err : new Error('An unknown error occurred');
            console.error('Login error:', error);
        }finally{
            setLoading(false);
        }
    };
    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="*******"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className=""
                > 
                   Login
                </button>
            </form>
            {message && <p className="">{message}</p>}
        </div>
    );
}

export default Login;
