import LoadingScreen from "../components/LoadingScreen";
import { Search } from "lucide-react";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as Components from "../components/Components";

import resumePic from '../assets/images/resume_analysis_page.jpg';

axios.defaults.withCredentials = true;

export default function ResumeHome() {
    const [ loading, setLoading ] = useState(true);
    const [ resumes, setResumes ] = useState([]);
    const [ analyseFlag, setAnalyseFlag ] = useState(false);
    const [ errors, setErrors ] = useState({});

    let { type } = useParams();

    const handleAnalysis = async (event) => {
        event.preventDefault();
        console.log('File Uploaded')
    };
    
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

        if (type === 'create') {
            fetchResumes();
        } else {
            setAnalyseFlag(true);
            setLoading(false);
        }
    })

    return (
        <>
            {loading && (
                <div className="min-h-screen w-screen absolute inset-0 flex items-center justify-center bg-purple-700 z-20">
                    <LoadingScreen />
                </div>
            )}
            {analyseFlag && (
                <div className="min-h-screen w-screen p-2 flex items-center justify-center">
                    <div className="w-1/2 h-64 border-r border-purple-700">
                        <Components.Form onSubmit={handleAnalysis}>
                            <Components.Title>Resume Analyser</Components.Title>
                            <Components.Input type="file" name="file" />
                            {errors.code && <span className="text-red-500 text-sm">{errors.code}</span>}

                            <Components.Button type="submit">Analyse Resume</Components.Button>
                        </Components.Form>
                    </div>
                    <div className="flex-1">
                        <img src={resumePic}/>
                    </div>
                </div>
            )}
            {!analyseFlag && (
                <>
                    <div className="flex gap-3 bg-purple-500">
                        <Components.Input type="search" name="resultSearch" placeholder="Search" />
                        <button type="submit" className="rounded-full border-black"><Search /></button>
                    </div>
                    <div>
                        { resumes.map((resume, index) => (
                            <Card key={index} imagePath={resume.IMAGE_Path} desc={resume.TEMPLATE_DESC} buttonMsg={'create'} title={resume.TITLE}
                                linkPath={`/create-resume/${resume.TITLE}`}/>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}