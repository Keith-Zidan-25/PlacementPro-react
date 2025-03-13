import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Overview } from "../components/User";

export default function Profile() {
    const [component, setComponent] = useState(null)

    const linkList = [
        { name: "Home", url: "/" },
        { name: "Profile", url: "" },
        { name: "Contact", url: "#contact" }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="py-2 w-full top-0 z-10 bg-purple-700">
                <Navbar linkList={linkList} className={'text-white'}/>
            </header>
            <div className="flex bg-white">
                <Sidebar setComponent={setComponent}/>
                <main className="p-10 bg-white flex-1 ml-64">
                    {component || (<Overview />)}
                </main>
            </div>
        </div>
    );
}