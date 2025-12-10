import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
interface FormData {
    companyname: string;
    password: string;
    email: string;
    phonenumber: string;
}

const Register= () => {
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        companyname: '',
        password: '',
        email: '',
        phonenumber: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); 
        setError('');
        setLoading(true);
        try{
            const res = await axiosInstance.post('/auth/register', formData);

            setMessage( res.data.message || 'Registration successful!' );
            setTimeout(() => { setMessage('')}, 3000);
            navigate('/dashboard');
            
        }catch(err){
            const error = err instanceof Error ? err : new Error('An unknown error occurred');
            console.error('Registration error:', error);
            setError( error.message || 'Registration failed. Please try again.' );
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="">
                <div>
                    <label className="text-gray-900">Company name:</label>
                    <input
                      type="text"
                      name="companyname"
                      value={formData.companyname}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label className="text-gray-900">Phone:</label>
                    <input
                       type="tel"
                       name="phonenumber"
                       value={formData.phonenumber}
                       onChange={handleChange}
                       required
                    />
                </div>
                <div>
                    <label className="text-gray-900">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label className="text-gray-900">Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                </div>
            <button 
              type="submit" 
              disabled={loading}
              className=""
            >
                Register
            </button>
        </form>
        { message && <p className="text-green-800">{message}</p> }
        { error && <p className="text-red-600">{error}</p> }
        </div>
    );
};

export default Register;