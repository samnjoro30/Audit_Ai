import React, { useState } from 'react';
import { User, Home, FileText, ClipboardList, LogOut } from 'lucide-react';

interface SidebarProps {
    setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
    const menuItems = [
        { name: 'Overview', icon: <Home className="w-5 h-5" /> },
        { name: 'Audit', icon: <ClipboardList className="w-5 h-5" /> },
        { name: 'History', icon: <FileText className="w-5 h-5" /> },
        { name: 'Reports', icon: <FileText className="w-5 h-5" /> },
        { name: 'Settings', icon: <User className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-40 bg-blue-300 text-gray-800 flex flex-col items-center px-2 py-4 space-y-4 shadow-md rounded-xl">
            {/* Menu */}
            <div className="flex flex-col items-center space-y-4 mt-6">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActivePage(item.name)}
                        className="flex flex-col items-center text-gray-400 hover:text-white transition"
                    >
                        {item.icon}
                        <span className="text-xs mt-1">{item.name}</span>
                    </button>
                ))}
            </div>

            {/* Logout */}
            <div className="mt-auto mb-4">
                <button className="flex flex-col items-center text-red-500 hover:text-red-400 transition">
                    <LogOut className="w-5 h-5" />
                    <span className="text-xs mt-1">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
