import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const nodeAxios = axios.create({
    baseURL: import.meta.env.VITE_NODE_SERVER_URL,
    withCredentials: true,
});

const flaskAxios = axios.create({
    baseURL: import.meta.env.VITE_FLASK_SERVER_URL,
    withCredentials: true,
});

export function useSendRequest() {
    const navigate = useNavigate();

    const sendRequest = async (config, options = { server: 'node', redirectOnErrorCodes: [] }) => {
        try {
            const instance = options.server === 'flask' ? flaskAxios : nodeAxios;
            const response = await instance(config);

            console.log(response.data?.success);
            return response.data;
        } catch (error) {
            console.error('Request Error:', error);

            if (error.response) {
                const status = error.response.status;
                console.log("Received Status:",status);
                const msg = error.response.data?.error || "An error occurred";

                if (options.redirectOnErrorCodes.includes(status)) {
                    navigate(`/error/${status}`, { replace: true });
                    return null;
                }
                Swal.fire('Error', msg, 'error');
            } else if (error.request) {
                Swal.fire('Error', 'No response from server.', 'error');
            } else {
                Swal.fire('Error', error.message, 'error');
            }
            return null;
        }
    };

    return { sendRequest };
}
