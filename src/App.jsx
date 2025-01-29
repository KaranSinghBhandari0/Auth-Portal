import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Toaster } from "react-hot-toast";

import Home from './pages/Home';
import Login from './pages/Login';
import ScrollToTop from './lib/ScrollToTop'
import Signup from './pages/Signup';
import Profile from './pages/Profile'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import Spinner from './components/Spinner';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
    const { checkingAuth, user } = useContext(AuthContext);

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    if(checkingAuth) {
        return <Spinner />
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login"   element = {user ? <Profile /> :<Login />} />
                <Route path="/signup"  element = {user ? <Profile /> :<Signup />} />
                <Route path="/profile" element = {user ? <Profile /> : <Home/> } />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
            <Footer />
            <Toaster
                toastOptions={{
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
        </div>
    );
}
