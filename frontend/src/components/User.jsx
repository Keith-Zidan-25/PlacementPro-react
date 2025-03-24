import ChartCard from "./ChartCard";
import ActivityCalendar from "react-activity-calendar";
import { Form, Input, Button, Title } from "./Components";
import { Search, Plus } from "lucide-react";
import Card from "./Card";

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
            <h1 className="text-black">Settings</h1>
            <div className="flex gap-3">
                <input type="search" name="settingSearch" placeholder="Search" />
                <button type="submit" className="rounded-full border-black">Search</button>
            </div>
        </>
    );
}

export function Courses({ userData }) {
    const courses = [
        { name: "Machine Learning", imgPath: '', desc: '', link: '' },
        { name: "Artificial Intelligence", imgPath: '', desc: '', link: '' },
        { name: "Data Analytics", imgPath: '', desc: '', link: '' }
    ]

    const newCourse = () => {
    }

    return (
        <>
            <h1 className="text-black">Courses</h1>
            <div className="flex gap-3">
                <Input type="search" name="courseSearch" placeholder="Search" />
                <button type="submit" className="rounded-full border-black"><Search /></button>
                <button onClick={newCourse} className="rounded-full border-black"><Plus /></button>
            </div>
            <div className="border-top border-purple=700 border-x-1 w-full">
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
            <h1 className="text-black">Results</h1>
            <div className="flex gap-3">
                <Input type="search" name="resultSearch" placeholder="Search" />
                <button type="submit" className="rounded-full border-black"><Search /></button>
            </div>
        </>
    );
}

export function Resumes({ userData }) {
    const newResume = () => {

    }
    return (
        <>
            <h1 className="text-black">Resumes</h1>
            <div className="flex gap-3">
                <Input type="search" name="resumeSearch" placeholder="Search" />
                <button type="submit" className="rounded-full border-black"><Search /></button>
                <button onClick={newResume} className="rounded-full border-black"><Plus /></button>
            </div>
        </>
    );
}

export function Details({ userData }) {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="w-full">
            <Form onSubmit={handleSubmit}>
                <Title className="text-xl font-bold">Personal Details</Title>
                <Input type="text" name="firstname" defaultValue={userData?.firstName} placeholder="First Name" />
                <Input type="text" name="lastname" defaultValue={userData?.lastName} placeholder="Last Name" />
                <Input type="text" name="mobileno" placeholder="Mobile No" />
                <Input type="date" name="dob" placeholder="Date of Birth" />
                <Button type="submit">Save</Button>
            </Form>
        </div>
    );
}