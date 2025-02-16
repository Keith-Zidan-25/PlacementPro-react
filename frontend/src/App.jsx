import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login_register" element={<Authentication />} />
                <Route path="/" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
