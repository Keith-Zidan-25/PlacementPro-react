import { Input } from "../components/Components";
import LoadingScreen from "../components/LoadingScreen";
import { Search } from "lucide-react";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function ResumeHome() {
    const [ loading, setLoading ] = useState(true);
    const [ resumes, setResumes ] = useState([]);
    const [ errors, setErrors ] = useState({})
    
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get('http://localhost:3020/api/file/resumes');

                if (response.status !== 200) {
                    setErrors({code: response.status, errMsg: response.data.errorMsg});
                } else {
                    setResumes(response.data.resumes);
                }
            } catch (error) {
                console.log(error);
                setErrors({ code: 0, errMsg: 'An unknown error occured'})
            } finally {
                setLoading(false);
            }
        }

        fetchResumes();
    })

    return (
        <>
            {loading && (
                <div className="min-h-screen w-screen absolute inset-0 flex items-center justify-center bg-purple-700 z-20">
                    <LoadingScreen />
                </div>
            )}
            <div className="flex gap-3 bg-purple-500">
                <Input type="search" name="resultSearch" placeholder="Search" />
                <button type="submit" className="rounded-full border-black"><Search /></button>
            </div>
            <div>
                { resumes.map((resume, index) => (
                    <Card key={index} imagePath={resume.IMAGE_Path} desc={resume.TEMPLATE_DESC} buttonMsg={'create'} title={resume.TITLE}
                        linkPath={`/create-resume/${resume.TITLE}`}/>
                ))}
            </div>
        </>
    );
}