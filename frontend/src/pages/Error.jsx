import { useParams } from "react-router-dom";
import { ShieldX, ServerCrash, X, Coffee } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ErrorPage() {
    const { errorCode } = useParams();
    const [ code, setCode ] = useState(0);

    const errorCodeMap = {
        404: {Icon: X, msg: 'Resource Not Found', desc: "The resource you requested could not be found!, please re-check your request & try again"},
        403: {Icon: ShieldX, msg: "Unauthorised Access", desc: "You are trying to access resources that you are not authorised to access!\nIf you do have authority, Please login to your account to access"},
        418: {Icon: Coffee, msg: "I'm a teapot", desc: "The Server refuses to brew coffee with a teapot"},
        500: {Icon: ServerCrash, msg: "Server Error", desc: "An unknown server error occured, please wait till we try to fix this issue"}
    }

    useEffect(() => {
        setCode(Number(errorCode));
    }, [errorCode]);

    const errorInfo = errorCodeMap[code] || {
        Icon: X, msg: 'Unknown Error', desc:'An unexcepted error occured'
    }

    const Icon = errorInfo.Icon;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-10 bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-4xl font-bold text-purple-700 flex items-center justify-center gap-2">
                    <Icon size={48} /> Error {code}
                </h1>
                <h2 className="text-2xl mt-4">{errorInfo.msg}</h2>
                <p className="text-gray-500 mt-2">{errorInfo.desc}</p>
            </div>
        </div>
    );
}