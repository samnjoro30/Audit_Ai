import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface FormData {
    companyname: string;
    password: string;
    email: string;
    phonenumber: string;
}

const Register= () => {
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        companyname: '',
        password: '',
        email: '',
        phonenumber: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); 
        setLoading(true);
        try{
            const res = await axiosInstance.post('/auth/register', formData);

            setMessage( res.data.message || 'Registration successful!' );
            setTimeout(() => { setMessage('')}, 3000);
            
        }catch(err){
            const error = err instanceof Error ? err : new Error('An unknown error occurred');
            console.error('Registration error:', error);

        }finally{
            setLoading(false);
        }
       
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="">
                <div>
                    <label>Company name:</label>
                    <input
                      type="text"
                      name="companyname"
                      value={formData.companyname}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="tel"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default Register;