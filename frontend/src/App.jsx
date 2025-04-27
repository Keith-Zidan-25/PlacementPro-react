import { lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import('./pages/Home'));
const Authentication = lazy(() => import('./pages/Authentication'));
const Profile = lazy(() => import('./pages/Profile'));
const Course = lazy(() => import('./pages/Course'));
const ResumeHome = lazy(() => import('./pages/ResumeHome'));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const Result = lazy(() => import('./pages/Result'));
const ErrorPage = lazy(() => import('./pages/Error'));
const Quiz = lazy(() => import('./pages/Quiz'));

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
                    <Route path="/courses/:courseCode" element={<Course />} />
                    <Route path="/resume/:type" element={<ResumeHome />} />
                    <Route path="/aptitude-tests/:quizKey" element={<Quiz />} />
                    <Route path="/create-resume/:title" element={<ResumeBuilder />}/>
                    <Route path="/result/:type/:ID" element={<Result />}/>
                    <Route path="/error/:errorCode" element={<ErrorPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;