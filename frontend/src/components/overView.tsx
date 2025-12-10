import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { User, ClipboardList, FileText, CheckCircle  } from 'lucide-react';

const Overview = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axiosInstance.get('/auth/me'); // Example endpoint
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="p-4 space-y-6">
            
            {/* Title Section */}
            <div className="bg-white shadow-md p-6 rounded-xl w-full">
                <h2 className="text-2xl text-center font-bold text-blue-300">
                    Welcome To Audit AI
                </h2>
                <p className="text-gray-600 mt-1 p-4 text-lg">
                    Your smart auditing assistant — simplifying compliance and audit workflows.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-white shadow-md p-4 rounded-xl flex items-center gap-4">
                    <User className="w-12 h-12 text-blue-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Logged in as</p>
                        <p className="font-semibold text-gray-800 text-lg">
                            {user ? user.name : "Loading..."}
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-md p-4 rounded-xl flex items-center gap-4">
                    <ClipboardList className="w-12 h-12 text-green-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Pending Audits</p>
                        <p className="font-semibold text-gray-800 text-lg">12</p>
                    </div>
                </div>

                <div className="bg-white shadow-md p-4 rounded-xl flex items-center gap-4">
                    <FileText className="w-12 h-12 text-purple-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Completed Audits</p>
                        <p className="font-semibold text-gray-800 text-lg">47</p>
                    </div>
                </div>

            </div>

            {/* Activity + How It Works (Two Column Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Recent Activity */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-700">Recent Activity</h3>
                    <p className="text-gray-500 text-sm mt-2 mb-4">
                        You haven't performed any audits yet.
                    </p>

                    <div className="text-sm text-gray-600">
                        <p className="mb-2">• System initialized successfully</p>
                        <p className="mb-2">• Ready to start your first audit</p>
                        <p className="mb-2">• All security checks passed</p>
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-700">How Audit AI Works</h3>

                    <ul className="mt-4 space-y-3">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-blue-500 w-6 h-6 shrink-0" />
                            <span className="text-gray-600">
                                Start an audit by selecting a category — the AI will guide you step-by-step.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-blue-500 w-6 h-6 shrink-0" />
                            <span className="text-gray-600">
                                Upload documents or records; the system analyzes them automatically.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-blue-500 w-6 h-6 shrink-0" />
                            <span className="text-gray-600">
                                Get instant compliance scoring and suggestions.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-blue-500 w-6 h-6 shrink-0" />
                            <span className="text-gray-600">
                                Generate reports with one click — exportable in PDF or Excel.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default Overview;
