import React from "react";
import avatar from '../assets/images/Avatar.png';
import * as User from '../components/User';
import { Library, ChartNoAxesCombined, ScrollText, UserRound, Settings, FileUser } from "lucide-react";

export default function Sidebar({ setComponent, userData }) {
    const services = [
        { name: "Overview", icon: <ChartNoAxesCombined className="w-5 h-5 text-purple-700" />, component: <User.Overview userData={userData.user} /> },
        { name: "Courses", icon: <Library className="w-5 h-5" />, component: <User.Courses userData={userData.user} /> },
        { name: "Results", icon: <ScrollText className="w-5 h-5" />, component: <User.Results userData={userData.user} /> },
        { name: "Resumes", icon: <FileUser className="w-5 h-5" />, component: <User.Resumes userData={userData.user} /> },
        { name: "Personal Details", icon: <UserRound className="w-5 h-5" />, component: <User.Details userData={userData.user} /> },
        { name: "Settings", icon: <Settings className="w-5 h-5" />, component: <User.Settings userData={userData.user} /> }
    ];

    return (
        <aside className="w-64 bg-white p-6 fixed border-r border-purple-700/20">
            <img src={avatar} className="rounded-full"/>
            <nav className="mt-8 space-y-2">
                {services.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setComponent(() => item.component)}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-500/20 rounded-lg transition"
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}
