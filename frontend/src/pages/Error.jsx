import { useParams } from "react-router-dom";
import { ShieldX, ServerCrash, X, Coffee } from "lucide-react";
import { useEffect, useState } from "react";

export default function ErrorPage() {
    const { errorCode } = useParams();
    const { code, setCode } = useState(0);

    const errorCodeMap = {
        404: {icon: X, msg: 'Resource Not Found', desc: "The resource you requested could not be found!, please re-check your request & try again"},
        403: {icon: ShieldX, msg: "Unauthorised Access", desc: "You are trying to access resources that you are not authorised to access!\nIf you do have authority, Please login to your account to access"},
        418: {icon: Coffee, msg: "I'm a teapot", desc: "The Server refuses to brew coffee with a teapot"},
        500: {icon: ServerCrash, msg: "Server Error", desc: "An unknown server error occured, please wait till we try to fix this issue"}
    }

    useEffect(() => {
        setCode(errorCode);
    }, [errorCode]);

    return (
        <div className="min-h-screen w-full bg-white">
            <div className="text-left">
                <h1 className="text-bold text-lg">{errorCodeMap[code].icon} Error {code}: {errorCodeMap[code].msg}</h1>
                <p className="text-md">{errorCodeMap[code].desc}</p>
            </div>
        </div>
    );
}