import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import QuestionCard from "../components/QuestionCard";
import LoadingScreen from "../components/LoadingScreen";

axios.defaults.withCredentials = true;

export default function Quiz() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState('Topic_1');
    const [step, setStepCounter] = useState(0);
    const [markdownContent, setMarkDownContent] = useState("");

    let { quizKey } = useParams();
    const linkList = []

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            setLoading(true);
            const quizkey = Number(quizKey);

            try{
                const response = await axios.get(`${import.meta.env.VITE_NODE_SERVER_URL}/api/quiz/questions/${quizkey}`);

                if (response.status === 200) {
                    setQuestions(response.data['questions']);
                }
            } catch {
            }
        }

        // const fetchTimeLimit = async () => {

        // }

        fetchQuizQuestions()
    }, [quizKey]);

    const handleAnswerSubmit = (event) => {
        event.preventDefault();
    }
    

    console.log(stateProp.series)

    return (
        <div className="flex flex-col min-h-screen w-full">
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
                </aside>
                <main className="flex-1 ml-4">
                    <div className="min-h-screen max-w-6xl bg-white px-4">
                        <QuestionCard item={currentQuestion} handleAnswerSubmit={handleAnswerSubmit} buttonText="Next" />
                    </div>
                </main>
            </div>
        </div>
    );
}