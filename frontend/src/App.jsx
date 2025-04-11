import { lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import('./pages/Home'));
const Authentication = lazy(() => import('./pages/Authentication'));
const Profile = lazy(() => import('./pages/Profile'));
const Course = lazy(() => import('./pages/Course'));
const ResumeHome = lazy(() => import('./pages/ResumeHome'));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen w-screen absolute inset-0 flex items-center justify-center bg-purple-700 z-20">
                                <LoadingScreen />
                            </div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login-register" element={<Authentication />} />
                    <Route path="/user/profile/:username" element={<Profile />} />
                    <Route path="/courses" element={<Course />} />
                    <Route path="/resume" element={<ResumeHome />} />
                    <Route path="/aptitude-tests" element={<Home />} />
                    <Route path="/create-resume/:title" element={<ResumeBuilder />}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;