import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";
import Sidebar from "../components/Sidebar";
import { Overview } from "../components/User";
import { useParams } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Profile() {
    const [ userData, setUserData ] = useState({});
    const [ component, setComponent ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    let { username } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_NODE_SERVER_URL}/user/profile/${username}`);

                if (response.status === 200) {
                    setUserData(response.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    const linkList = [
        { name: "Home", url: "/" },
        { name: "Profile", url: "" },
        { name: "Contact", url: "#contact" }
    ];

    return (
        <>
            { loading && (
                <div className="min-h-screen w-screen absolute inset-0 flex items-center justify-center bg-purple-700 z-20">
                    <LoadingScreen />
                </div>
            )}
            <div className="flex flex-col min-h-screen">
                <header className="py-2 w-full top-0 z-10 bg-purple-700">
                    <Navbar linkList={linkList} className={'text-white'}/>
                </header>
                <div className="flex bg-purle-900">
                    <Sidebar setComponent={setComponent} userData={userData}/>
                    <main className="p-10 bg-white flex-1 ml-64">
                        {component || <Overview userData={userData.user} />} 
                    </main>
                </div>
            </div>
        </>
    );
};
