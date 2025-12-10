
import { useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Overview from '../components/overView';
import Audit from '../components/audit';

const Dashboard = () => {
    const [activePage, setActivePage] = useState<string>('Overview');

    const renderPage = () => {
        switch (activePage) {
            case 'Overview':
                return < Overview/>;
            case 'Audit':
                return < Audit/>;
            case 'History':
                return <div>History Logs</div>;
            case 'Reports':
                return <div>Reports</div>;
            case 'Settings':
                return <div>Settings</div>;
            default:
                return <div>Welcome</div>;
        }
    };
    return (
        <div className="h-screen w-full flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden p-2">
                <Sidebar setActivePage={setActivePage} />
                <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">{renderPage()}</main>
            </div>
        </div>
    )
}

export default Dashboard
