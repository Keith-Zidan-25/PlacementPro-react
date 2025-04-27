import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { useSendRequest } from "../utils/axiosInstance";

import Navbar from "../components/Navbar";
import Mermaid from '../components/Mermaid';
import LoadingScreen from "../components/LoadingScreen";
import { Button } from "../components/Components";

export default function Course() {
    const { courseCode } = useParams();
    const { sendRequest } = useSendRequest();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [modules, setModules] = useState({
        courseModules: [],
        title: ''
    });
    const [currentModule, setCurrentModule] = useState('Topic_1');
    const [step, setStepCounter] = useState(0);
    const [markdownContent, setMarkDownContent] = useState("");

    const linkList = [];

    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoading(true);
            try {
                const response = await sendRequest(
                    {
                        method: 'GET',
                        url: `/api/courses/modules/${courseCode}`
                    },
                    { redirectOnErrorCodes: [500] }
                );

                if (response && response.success) {
                    const data = response.data;
                    setModules(data);
                    setCurrentModule(data.courseModules[0].moduleFile);
                }
                // const response = await axios.get(`${import.meta.env.VITE_NODE_SERVER_URL}/api/courses/modules/${courseCode}`);
                // if (response.data.success) {
                //     console.log(response);
                //     const data = response.data['data'];
                //     setModules(data);
                //     setCurrentModule(data.courseModules[0].moduleFile);
                // }
            } catch(err) {
                console.error(err);
                navigate('error/500', { replace: true });
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
        if (nextStep < modules?.courseModules.length) {
            setCurrentModule(modules.courseModules[nextStep].moduleFile);
            setStepCounter(nextStep);
        }
    };
    

    return (
        <div className="flex flex-col w-full min-h-screen">
            {loading && (
                <div className="min-h-screen w-screen absolute inset-0 flex items-center justify-center bg-purple-700 z-20">
                    <LoadingScreen />
                </div>
            )}
            <header className="py-2 w-full top-0 z-10 bg-purple-700">
                <Navbar linkList={linkList} className={'text-white'}/>
            </header>
            <div className="flex">
                <aside className="w-64 min-h-screen bg-white border-r border-purple-700/20 p-2">
                    <div className="text-semibold">{modules.title}:</div>
                    {modules?.courseModules.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentModule(() => item.moduleFile)}
                            className="flex items-center space-x-3 w-full px-4 py-4 text-left hover:bg-gray-500/20 rounded-lg transition"
                        >
                            <span>{item.title}</span>
                        </button>
                    ))}
                </aside>
                <main className="flex-1 ml-4">
                    <div className="prose min-h-screen max-w-6xl bg-white px-4">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const language = match?.[1];

                                if (language === 'mermaid') {
                                    return <Mermaid chart={String(children).trim()} />;
                                }

                                return (
                                    <pre className={className} {...props}>
                                        <code>{children}</code>
                                    </pre>
                                );
                                },
                            }}
                        >
                            {markdownContent}
                        </ReactMarkdown>
                        <Button onClick={getNextModule} disabled={step + 1 >= modules.length}>
                            Next
                        </Button>
                    </div>
                </main>
            </div>     
        </div>
    );
}