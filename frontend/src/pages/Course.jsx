import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import { Button } from "../components/Components";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Navbar from "../components/Navbar";

export default function Course() {
    const {courseCode} = useParams();

    const [loading, setLoading] = useState(false);
    const [modules, setModules] = useState([]);
    const [currentModule, setCurrentModule] = useState('Topic_1');
    const [step, setStepCounter] = useState(0);
    const [mardownContent, setMarkDownContent] = useState("");

    const linkList = [];

    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3020/api/courses/modules/${courseCode}`);
                if (response.data.success) {
                    const data = response.data['data'];
                    setModules(data);
                    setCurrentModule(data[0].MODULE_FILE);
                }
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCourseDetails();
    }, [courseCode]);

    useEffect(() => {
        if (currentModule) {
            fetch(`/course-markdowns/${courseCode}/${currentModule}.md`)
                .then((response) => response.text())
                .then((text) => setMarkDownContent(text));
        }
    }, [currentModule, courseCode]);
    

    const getNextModule = () => {
        const nextStep = step + 1;
        if (nextStep < modules.length) {
            setCurrentModule(modules[nextStep].MODULE_FILE);
            setStepCounter(nextStep);
        }
    };
    

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-cyan-500 to-purple-900 py-4">
            {loading && (
                <div className="min-h-screen w-screen absolute inset-0 flex items-center justify-center bg-purple-700 z-20">
                    <LoadingScreen />
                </div>
            )}
            <div className="prose max-w-5xl mx-auto px-4 py-6 bg-white">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{mardownContent}</ReactMarkdown>
                <Button onClick={getNextModule} disabled={step + 1 >= modules.length}>
                    Next
                </Button>
            </div>
                       
        </div>
    );
}