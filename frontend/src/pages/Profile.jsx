import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";
import Sidebar from "../components/Sidebar";
import { Overview } from "../components/User";
import { useNavigate, useParams } from "react-router-dom";
import { useSendRequest } from "../utils/axiosInstance";

export default function Profile() {
    const [ userData, setUserData ] = useState({});
    const [ component, setComponent ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    let { username } = useParams();

    const navigate = useNavigate();
    const { sendRequest } = useSendRequest();

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await sendRequest(
                    {
                        method: 'GET',
                        url: `/user/profile/${username}`
                    },
                    { redirectOnErrorCodes: [403, 500] }
                )
                if (response && response.success) {
                    setUserData(response.user);
                }
            } catch (err) {
                navigate('error/500', { replace: true });
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
                        {component || <Overview userData={userData} />} 
                    </main>
                </div>
            </div>
        </>
    );
};
