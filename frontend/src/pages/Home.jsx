import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";
import p4 from "../assets/images/p4.png";
import p5 from "../assets/images/p5.png";
import p6 from "../assets/images/p6.png";
import p7 from "../assets/images/p7.png";
import p8 from "../assets/images/p8.png";
import p9 from "../assets/images/p9.png";
import p10 from "../assets/images/p10.jpg";
import p11 from "../assets/images/p11.jpg";
import p12 from "../assets/images/p12.jpg";

export default function Home() {
    const linkList = [
        { name: "Home", url: "#Home" },
        { name: "Login", url: "/login-register" },
        { name: "About Us", url: "#about" },
        { name: "Courses", url: "#courses" },
        { name: "Companies", url: "#companies" },
        { name: "Testimonials", url: "#testimonials" },
        { name: "Contact", url: "#contact" }
    ];

    return (
        <>
            <header className="bg-black py-5 fixed w-full top-0 z-50 shadow-md">
                <Navbar linkList={linkList} className={'text-white'}/>
            </header>

            <section id="Home" className="h-screen flex items-center justify-center text-center relative text-white bg-cover bg-center"
                style={{ backgroundImage: `url(${p1})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-20 max-w-2xl">
                    <h1 className="text-5xl mb-5 animate-fade-down">Welcome to PlacementPro</h1>
                    <p className="text-lg mb-8 animate-fade-up">
                        Elevate your career with expert guidance and industry insights.
                    </p>
                    <a href="#courses" className="px-6 py-3 bg-purple-700 text-white rounded-full text-lg transition hover:bg-purple-900 animate-zoom-in">
                        Explore Courses
                    </a>
                </div>
            </section>

            <section id="about" className="py-24 bg-white">
                <div className="container-custom flex items-center gap-12 flex-wrap">
                    <div className="flex-1 min-w-[300px] animate-fade-left">
                        <img src={p2} alt="About Us" />
                    </div>
                    <div className="flex-1 min-w-[300px] animate-fade-right">
                        <h2 className="text-3xl mb-5 text-black">About Us</h2>
                        <p className="text-lg text-gray-600 mb-5">
                            PlacementPro is dedicated to providing the best training and resources for engineering
                            students to excel in their careers. We offer comprehensive courses and practical insights to
                            help you succeed.
                            <br />
                            Our mission is to bridge the gap between education and industry, ensuring that students are
                            well-prepared for the job market.
                        </p>
                    </div>
                </div>
            </section>

            <section id="courses" className="py-24 bg-gray-200 animate-fade-up">
                <div className="container-custom text-center mb-16">
                    <h2 className="text-3xl text-black mb-3">Our Courses</h2>
                    <p className="text-lg text-gray-600">
                        Explore our diverse range of courses designed to enhance your skills and prepare you for the
                        competitive job market.
                    </p>
                </div>
                <div className="container-custom flex justify-center gap-8 flex-wrap">
                    <Card imagePath={p3} title="Core Engineering Subjects" buttonMsg="Learn More" linkPath="#"
                        desc="Deep dive into fundamental engineering concepts with our expert-led courses."
                    />
                    <Card imagePath={p4} title="Company-Specific Training" buttonMsg="Learn More" linkPath="#"
                        desc="Get insights into the specific requirements of top companies and prepare accordingly."
                    />
                    <Card imagePath={p5} title="Soft Skills Development" buttonMsg="Learn More" linkPath="#"
                        desc="Enhance your communication, leadership, and other soft skills to stand out in interviews."
                    />
                </div>
            </section>

            <section id="testimonials" className="py-24 bg-gray-200 relative animate-fade-up">
                <div className="container-custom text-center mb-16 ">
                    <h2 className="text-3xl text-black mb-3">What Our Students Say</h2>
                    <p className="text-lg text-gray-600">
                        Read testimonials from students who have benefited from our training programs.
                    </p>
                </div>
                <div className="container-custom flex justify-center gap-8 flex-wrap">
                    <Card imagePath={p10} title="John Doe" className={"animate-fade-up"}
                        desc="PlacementPro's courses were exactly what I needed to land my dream job."
                    />
                    <Card imagePath={p11} title="Jane Smith" className={"animate-fade-up"}
                        desc="The company-specific training provided by PlacementPro helped me understand what top firms are looking for."
                    />
                    <Card imagePath={p12} title="Emily Johnson" className={"animate-fade-up"}
                        desc="The soft skills workshops were fantastic. Highly recommended!"
                    />
                </div>
            </section>

            <section id="companies" className="py-24 bg-white">
                <div className="container-custom text-center mb-16 animate-fade-up">
                    <h2 className="text-3xl text-black mb-3">Our Partner Companies</h2>
                    <p className="text-lg text-gray-600">
                        We collaborate with leading companies to provide the best opportunities for our students.
                    </p>
                </div>
                <div className="container-custom flex justify-center items-center gap-12 flex-wrap animate-fade-up">
                    {[p6, p7, p8, p9].map((img, index) => (
                        <img key={index} src={img} alt={`Company ${index + 1}`} className="max-w-[150px] grayscale transition hover:grayscale-0" />
                    ))}
                </div>
            </section>

            <section id="contact" className="py-24 bg-white">
                <div className="container-custom text-center mb-16 animate-fade-up">
                    <h2 className="text-3xl text-black mb-3">Contact Us</h2>
                    <p className="text-lg text-gray-600">Get in touch with us for any queries or support.</p>
                </div>
                <div className="container-custom flex justify-center items-center gap-12 flex-wrap">
                    {[
                        { icon: "fas fa-phone-alt", title: "Phone", text: "+1 234 567 890" },
                        { icon: "fas fa-envelope", title: "Email", text: "info@placementpro.com" },
                        { icon: "fas fa-instagram", title: "Instagram", text: "@placementpro" },
                        { icon: "fas fa-twitter", title: "Twitter", text: "@placementpro" },
                    ].map((item, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg p-5 max-w-xs text-center shadow-md transition hover:bg-gray-200">
                            <i className={item.icon}></i>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
