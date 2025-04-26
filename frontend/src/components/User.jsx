import ActivityCalendar from "react-activity-calendar";
import { Form, Input, Button, Title, Label, RadialSelectInput } from "./Components";
import { Search, Plus } from "lucide-react";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
// import { redirect } from "react-router-dom";

import make from '../assets/images/resume/make.jpg';
import analyse from '../assets/images/resume/analyse.jpg';
import mlClassic from '../assets/images/courses/ml-classic.png';
import aiClassic from '../assets/images/courses/ai-classic.png';
import dSciClassic from '../assets/images/courses/data-sci-classic.jpg';
import osClassic from '../assets/images/courses/os-classic.png';

import { peronalDetails } from "../schema/personal_details";
import { ZodError } from "zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import HexagonCard from "./QuestionCard";

export function Overview({ userData }) {
    const data = [
        {
            date: '2024-06-23',
            count: 2,
            level: 1,
        },
        {
            date: '2024-08-02',
            count: 16,
            level: 4
        },
        {
            date: '2024-11-29',
            count: 11,
            level: 3
        },
    ];

    const explicitTheme = {
        light: ['#E9D5FF', '#A855F7', '#7E22CE', '#581C87', '#3B0764'],
        dark: ['#CBD5E1', '#A855F7', '#7E22CE', '#581C87', '#3B0764'],
    };

    return (
        <div className="w-full">
            <h1 className="text-black">Welcome {userData?.name || 'User'}!</h1>
            <ActivityCalendar data={data} theme={explicitTheme} hideTotalCount={true}/>
        </div>
    );
}

export function Settings({ userData }) {
    return(
        <>
            <div className="flex gap-3">
                <input type="search" name="settingSearch" placeholder="Search" />
                <button type="submit" className="rounded-full border-black"><Search /></button>
            </div>
        </>
    );
}

export function Courses({ userData }) {
    const courses = [
        { name: "Machine Learning", imgPath: mlClassic, desc: '', link: '/courses/ML' },
        { name: "Artificial Intelligence", imgPath: aiClassic, desc: '', link: '/courses/AI' },
        { name: "Data Analytics", imgPath: dSciClassic, desc: '', link: '/courses/DA' },
        { name: "Operating Systems", imgPath: osClassic, desc: '', link: '/courses/OS' }
    ]

    return (
        <>
            <div className="flex gap-3">
                <Input type="search" name="courseSearch" placeholder="Search" />
                <button type="submit" className="rounded-full border-black"><Search /></button>
            </div>
            <div className="border-top border-purple=700 border-x-1 w-full flex gap-2">
                {courses.map((course, index) => (
                    <Card title={course.name} desc={course.desc} imagePath={course.imgPath}
                        buttonMsg={'Open'} linkPath={course.link}
                    />
                ))}
            </div>
        </>
    );
}

export function Results({ userData }) {
    return (
        <>
            <div className="flex gap-3">
                <Input type="search" name="resultSearch" placeholder="Search" />
                <button type="submit" className="rounded-full border-black"><Search /></button>
            </div>
        </>
    );
}

export function Resumes({ userData }) {
    // const [loading, setLoading] = useState(false);
    // const [resumeData, setResumeData] = useState([]);
    // const [errors, setErrors] = useState({});

    // useEffect(() => {
        // const fetchResume = async () => {
        //     try{
        //         setLoading(true);
        //         const response = await axios.get(`http://localhost:3020/api/file/resume/${userData.username}`);

        //         if (response.status === 200) {
        //             setResumeData(response.userResumes);
        //         }
        //     } catch (err) {
        //         console.log(err);
        //         setErrors({'fetch Error': `Couldn't fetch the resumes`});
        //     } finally {
        //         setLoading(false);
        //     }
        // }

        // fetchResume();
    // }, [userData]);

    // const newResume = () => {
    //     try{

    //     } catch (err) {
    //         console.log(err);
    //         setErrors({'Error': 'unable to get required resources'});
    //     }
    // }

    return (
        <>
            {/* <h1 className="text-black">Resumes</h1>
            <div className="flex gap-3">
                <Input type="search" name="resumeSearch" placeholder="Search" />
                <button type="submit" className="rounded-full border-black"><Search /></button>
                <button onClick={newResume} className="rounded-full border-black"><Plus /></button>
            </div>
            <div>
                {loading && (
                    <div
                        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-purple-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                )}

            </div> */}
            {/* <button><a href={`/resume`}>MAKE RESUME</a></button> */}
            <div className="grid grid-cols-2 gap-4">
                <Card key={'1'} linkPath={'/resume/create'} buttonMsg={'Create Resume'} imagePath={make} 
                    desc={'Use Our Free Resume generator with Live Preview to create your Resumes. Choose from our collection of Templates!!'} title={'Resume Generator'}/>
                <Card key={'2'} linkPath={'/resume/analyse'} buttonMsg={'Analyse Resume'} imagePath={analyse} 
                    desc={'Use Our Free Resume Analyser to know how good your resume is!!'} title={'Resume Analyser'}/>
            </div>
        </>
    );
}

export function Details({ userData }) {
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        console.log('User Details Received.....');
        event.preventDefault();

        const formdata = new FormData(event);
        const data = {
            "firstName": formdata.get('firstName'),
            "lastName": formdata.get('lastName'),
            "phoneNo": formdata.get('mobileNo'),
            "dateOfBirth": formdata.get('dob'),
            "cgpa": formdata.get('cgpa'),
            'gender': formdata.get('gender')
        }

        try {
            peronalDetails.parse(data);
            setErrors({});

            const response = await axios.post(`${import.meta.env.VITE_NODE_SERVER_URL}/user/user-details`, data);

            if (response.status === 201) {
                Swal.fire(response.data.msg, 'Your profile has been updated', 'success');
            } else if (response.status === 404) {
                Swal.fire(response.data.msg, 'Sorry could not find your data, please try again!', 'error');
            } else if (response.status === 500){
                Swal.fire(response.data.msg, 'Looks like our server is busy right now, please try again!', 'error');
            } else {
                navigate(`/error/${response.status}`);
            }

        } catch (err) {
            if (err instanceof ZodError) {
                const formattedErrors = {};
                err.errors.forEach((e) => {
                    formattedErrors[e.path[0]] = e.message;
                });
                setErrors(formattedErrors);
            } else {
                console.error(err);
            }
        }
    };

    return (
        <div className="w-full">
            <Form onSubmit={handleSubmit}>
                <div className="w-full flex">
                    <h1 className="text-xl">Personal Information</h1>
                </div>
                <div className="grid grid-cols-2 w-full gap-4 mt-2">
                    <Input type="text" name="firstname" defaultValue={userData?.firstName} placeholder="First Name" />
                    {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}

                    <Input type="text" name="lastname" defaultValue={userData?.lastName} placeholder="Last Name" />
                    {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                </div>
                <div className="grid grid-cols-2 w-full gap-4 mt-2">
                    <Input type="text" name="mobileNo" placeholder="Mobile No" />
                    {errors.phoneNo && <span className="text-red-500 text-sm">{errors.phoneNo}</span>}

                    <Input type="date" name="dob" placeholder="Date of Birth" />
                    {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
                </div>
                <div className="grid grid-cols-2 w-full gap-4 mt-2 mb-4">
                    <Input type="text" name="cgpa" placeholder="CGPA" />
                    {errors.cgpa && <span className="text-red-500 text-sm">{errors.cgpa}</span>}

                    <div className="flex gap-4 ml-2">
                        <RadialSelectInput value='Male' id='male' name='gender'/>
                        <RadialSelectInput value='Female' id='female' name='gender'/>
                        <RadialSelectInput value='Other' id="other" name='gender'/>
                    </div>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                </div>
                <Button type="submit">Save</Button>
            </Form>
        </div>
    );
}