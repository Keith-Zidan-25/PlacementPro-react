import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ChartCard from "../components/ChartCard";

axios.defaults.withCredentials = true;

export default function Result() {
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ resultData, setResultData ] = useState({});
    const [ stateProp, setStateProp ] = useState({});

    let { type, ID } = useParams();

    useEffect(() => {
        const fetchResumeAnalysis = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/resume/analyze-resume/${ID}`);

                if (response.data.success) {
                    const data = response.data.data;
                    setResultData(data);
                } else {
                    Swal.fire('')
                }
            } catch(err) {
                console.error(err)
            }
        };
        // const fetchQuizAnalaysis = async () => {
        //     try {
        //         const fetchQuestionsRespose = await axios.get()
        //         const analysisResponse = await axios.post('http://localhost:5000/api/quiz/analyse-quiz')
        //     } catch (err) {
        //         console.error(err)
        //     }
        // }
        fetchResumeAnalysis();
    }, [type, ID]);
    useEffect(() => {
        if (!resultData.ats_score) return;
    
        setStateProp({
            options: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '60%'
                        }
                    },
                },
                labels: ['ATS Score'],
            },
            series: [resultData.ats_score],
            type: 'radialBar'
        });
    }, [resultData]);
    

    console.log(stateProp.series)

    return (
        <>
            {loading && (
                <div className="min-h-screen w-screen absolute inset-0 flex items-center justify-center bg-purple-700 z-20">
                    <LoadingScreen />
                </div>
            )}
            <div className="p-2">
                <ChartCard stateProp={stateProp}/>
            </div>
        </>
    );
}