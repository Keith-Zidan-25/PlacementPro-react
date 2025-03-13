import { lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import('./pages/Home'))
const Authentication = lazy(() => import('./pages/Authentication'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen w-screen absolute inset-0 flex items-center justify-center bg-purple-700 z-20">
                                <LoadingScreen />
                            </div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login-register" element={<Authentication />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
