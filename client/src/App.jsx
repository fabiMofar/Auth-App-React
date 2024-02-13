import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signin from "./pages/Signin.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import Header from "./components/Header.jsx";

export default function App() {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={Home} />
                <Route path="/about" element={About} />
                <Route path="/signin" element={Signin} />
                <Route path="/signup" element={SignUp} />
                <Route path="/profile" element={Profile} />
            </Routes>
        </BrowserRouter>
    )
}
