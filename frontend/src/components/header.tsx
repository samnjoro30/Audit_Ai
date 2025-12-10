import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Bell, User, Search, Shield, LogOut } from 'lucide-react';

const Header: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

	const Logout = async () => {
		try {
			await axiosInstance.post('/auth/logout');
		} catch (err) {
			const error = err instanceof Error ? err : new Error('An unknown error occurred');
			console.error('Logout error:', error);
		}
	};

	return (
		<header className="w-full bg-blue-300 shadow-md rounded-none py-2">
    <div className="w-full px-4 flex items-center justify-between">
        
        <div>
            <h1 className="text-gray-800 flex items-center gap-2">
                Audit Platform
            </h1>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                Secure <Shield className="w-4 h-4" /> & Intelligent Auditing
            </p>
        </div>

        <div className="flex items-center gap-4">
            <div className="relative">
                <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="pl-8 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <Bell className="w-6 h-6 text-gray-600 hover:text-blue-700 cursor-pointer" />
            <User className="w-6 h-6 text-gray-600 hover:text-blue-700 cursor-pointer" />

            <button
                onClick={Logout}
                className="flex items-center gap-1 bg-red-500 text-white px-2 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
                <LogOut className="w-4 h-6" />
            </button>
        </div>
    </div>
</header>

	);
};

export default Header;
