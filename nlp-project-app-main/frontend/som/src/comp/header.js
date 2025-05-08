import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import React from "react";
import "./header.css";

const Header = ({ isAccountPage }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleReturn = () => {
    navigate(-1); 
  };

  return (
    <header className="header">
      <div className="logo">
        ClearNet<span className="highlight"> AI</span>
      </div>
      <div className="nav-container">
        <nav className="nav-links">
          {!isAccountPage && location.pathname !== "/account" && (
            <>
              <a
                href="/"
                className={location.pathname === "/" ? "active-link" : ""}
              >
                Home
              </a>
              <a
                href="/about"
                className={location.pathname === "/about" ? "active-link" : ""}
              >
                About Us
              </a>
            </>
          )}
        </nav>

        {location.pathname === "/account" || isAccountPage ? (
          <button className="contact-button" onClick={handleReturn}>
            Log Out
          </button>
        ) : (
          <a className="contact-button" href="#contact">
            Contact Us
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
