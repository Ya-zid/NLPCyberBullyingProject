import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mainsec.css";
import womanImage from "./woman.png";

const MainSection = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState({});

  const handleGoClick = async () => {
    console.log("Fetching comments for:", inputValue); // Debugging
    if (!inputValue) {
      alert("Please enter a valid YouTube video URL");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/scrape_comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputValue }),
      });
      const data = await response.json();
      console.log("Received comments:", data); // Debugging
      if (response.ok) {
        setAllMessages(data.comments);
        setShowModal(true);
      } else {
        alert("Failed to fetch comments. Check the URL and try again.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("An error occurred while fetching comments.");
    }
  };
  

  const handleDetectClick = async () => {
    if (!allMessages.length) {
      alert("No comments available to analyze.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/detect_cyberbullying", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: allMessages }),
      });
      const data = await response.json();
      if (response.ok) {
        setFilteredMessages(data.cyberbullying_comments);
        setShowFilterModal(true);
      } else {
        alert("Failed to detect cyberbullying. Try again.");
      }
    } catch (error) {
      alert("An error occurred while analyzing comments.");
    }
  };

  const handleReportComments = () => {
    const reportedMessages = Object.keys(selectedMessages).filter(
      (msg) => selectedMessages[msg]
    );
    alert(`Reported messages:\n${reportedMessages.join("\n")}`);
  };

  return (
    <div className="main-section">
      <div className="content">
        <div className="text-container">
          <h1 className="title">
            Make your online space a positive and safe environment.
          </h1>
          <p className="description">
            No more cyberbullying with <span className="highlighted-text">ClearNet AI</span>, an
            AI-Powered Protection for Your Social Space.
          </p>
          <div className="login-container">
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                placeholder="Enter YouTube video URL"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className="go-button" onClick={handleGoClick}>Go</button>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img src={womanImage} alt="Illustration" className="woman-image" />
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>X</button>
            <h2>Comments</h2>
            <div className="comments-container">
              {allMessages.map((message, index) => (
                <div className="comment-item" key={index}>{message}</div>
              ))}
            </div>
            <button className="detect-button" onClick={handleDetectClick}>
              Detect Cyberbullying
            </button>
          </div>
        </div>
      )}

      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowFilterModal(false)}>X</button>
            <h2>Filter Messages</h2>
            <div className="comments-container">
              {filteredMessages.map((message, index) => (
                <div className="comment-item" key={index}>
                  <input
                    type="checkbox"
                    checked={selectedMessages[message] || false}
                    onChange={() =>
                      setSelectedMessages((prev) => ({
                        ...prev,
                        [message]: !prev[message],
                      }))
                    }
                  />
                  <span>{message}</span>
                </div>
              ))}
            </div>
            <button className="report-button" onClick={handleReportComments}>
              ⚠ Report Comments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSection;