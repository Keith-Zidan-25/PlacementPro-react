import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ChartCard from "../components/ChartCard";
import Card from "../components/Card";

import LoadingScreen from "../components/LoadingScreen";

axios.defaults.withCredentials = true;

export default function Result() {
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ resultData, setResultData ] = useState({
        ats_score: null,
        improvements: [],
        suitable_roles: [],
        recommended_certs: [],
        strengths: [],
        skills_to_develop: []
    });
    const [ stateProp, setStateProp ] = useState({});

    let { type, ID } = useParams();

    useEffect(() => {
        const fetchResumeAnalysis = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/resume/analyze-resume/${ID}`);

                if (response.data.success) {
                    const data = response.data['data'];
                    setResultData(data);
                } else {
                    Swal.fire('')
                }
            } catch(err) {
                console.error(err)
            } finally {
                setLoading(false);
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
        if (resultData.ats_score) return;

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
                            size: '60%',
                            margin: 0,
                            background: '#293450'
                        },
                        dataLabels: {
                            name: {
                              offsetY: -10,
                              color: "#fff",
                              fontSize: "10px"
                            },
                            value: {
                              color: "#fff",
                              fontSize: "20px",
                              show: true
                            }
                        }
                    }
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
            <div className="flex bg-gradient-to-r from-cyan-500 from-[20%] to-purple-700 min-h-screen w-full justify-center items-center">
                {resultData && (
                    <div className="flex flex-col gap-1 bg-white shadow-xl rounded-xl p-6 w-[60rem] z-10 items-center mt-4 mb-4">
                        <h1 className="text-center text-lg">Resume Analysis Result</h1>
                        <ChartCard stateProp={stateProp} divClassStyle={'border border-purple-700 bg-white w-full rounded-lg'}/>
                        <Card title={'Improvements'} desc={resultData.improvements} className={'w-full border border-purple-500'}/>
                        <Card title={"Recommended Certifications"} desc={resultData.recommended_certs} className={'w-full border border-purple-500'}/>
                        <Card title={'Skills to Develop'} desc={resultData.skills_to_develop} className={'w-full border border-purple-500'}/>
                        <Card title={'Strengths'} desc={resultData.strengths} className={'w-full border border-purple-500'}/>
                        <Card title={'Suitable Roles'} desc={resultData.suitable_roles.slice(1)} className={'w-full border border-purple-500'}/>
                    </div>
                )}
            </div>
        </>
    );
}