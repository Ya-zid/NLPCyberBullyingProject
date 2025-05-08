// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './comp/header';
import MainSection from './comp/mainsec';
import FeatureSection from './comp/last';
import AccountPage from './comp/account'; 
import AboutUs from './comp/aboutus';


const App = () => {
    const location = useLocation(); // Get the current location
    const isAccountPage = location.pathname === '/account'; // Check if on AccountPage

    return (
        <div>
            <Header isAccountPage={isAccountPage} />
            <Routes>
                <Route path="/" element={<MainSection />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
            {/* Conditionally render FeatureSection based on the current path */}
            {location.pathname !== '/account' && <FeatureSection />}
        </div>
    );
};

// Wrap the App component with Router
const Root = () => (
    <Router>
        <App />
    </Router>
);

export default Root;