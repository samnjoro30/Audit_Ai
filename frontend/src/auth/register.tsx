import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
    companyname: string;
    password: string;
    email: string;
    phonenumber: string;
}

const Register= () => {
    
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
        const res = await axios.post('/auth/register', formData);
        console.log(res.data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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