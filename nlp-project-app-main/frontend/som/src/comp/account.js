// AccountPage.js
import React, { useState } from "react";
import "./account.css";

const AccountPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const handleDeleteComments = () => {
    const remainingMessages = filteredMessages.filter(msg => !selectedMessages[msg]);
    setFilteredMessages(remainingMessages);
    setSelectedMessages({});
    setShowFilterModal(false); // Close filter modal
    setShowSuccessModal(true); // Show success modal
};

const handleReportComments = () => {
    console.log("Reported messages:", Object.keys(selectedMessages).filter(msg => selectedMessages[msg]));
    setShowFilterModal(false); // Close filter modal
    setShowSuccessModal(true); // Show success modal
};

  // Sample data for posts
  const posts = [
    { id: 1, content: "Post 1", messages: ["Message 1.1", "Message 1.2"] },
    { id: 2, content: "Post 2", messages: ["Message 2.1", "Message 2.2"] },
    { id: 3, content: "Post 3", messages: ["Message 3.1", "Message 3.2"] },
    { id: 1, content: "Post 1", messages: ["Message 1.1", "Message 1.2"] },
    { id: 1, content: "Post 1", messages: ["Message 1.1", "Message 1.2"] },

    // Add more posts as needed
  ];

  const handlePostClick = (messages) => {
    setFilteredMessages(messages);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFilteredMessages([]);
    setSelectedMessages({});
  };

  const handleDetectClick = () => {
    // Example filtering logic
    const detectedMessages = filteredMessages.filter(
      (msg, index) => index % 2 === 0
    );
    setFilteredMessages(detectedMessages);
    const initialSelection = {};
    detectedMessages.forEach((msg) => {
      initialSelection[msg] = false;
    });
    setSelectedMessages(initialSelection);
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
    setSelectedMessages({});
  };

  const handleCheckboxChange = (message) => {
    setSelectedMessages((prev) => ({
      ...prev,
      [message]: !prev[message],
    }));
  };


  return (
    <div className="account-page">
      <header className="account-header">
        <div className="profile-info">
          <img
            src="profile-pic-placeholder.png"
            alt="Profile"
            className="profile-pic"
          />
          <p className="username">sara.ahmed004</p>
          <p className="name">Sara Ahmed</p>
        </div>
      </header>

      <div className="posts-grid">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post"
            onClick={() => handlePostClick(post.messages)}
          >
            <p>{post.content}</p>
            <div className="hover-text">Show Comments</div>
          </div>
        ))}
      </div>
      {/* Modal for comments */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.className === "modal-overlay") handleCloseModal();
          }}
        >
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
            <h2>Comments</h2>
            <div className="comments-container">
              {filteredMessages.map((message, index) => (
                <div className="comment-item" key={index}>
                  <span className="comment-username">Username:</span>
                  <span className="comment-message">{message}</span>
                </div>
              ))}
            </div>
            <button
              className="detect-button"
              onClick={() => {
                handleDetectClick(); // Trigger the detect functionality
                setShowModal(false); // Close current modal
              }}
            >
              Detect Cyberbullying
            </button>
          </div>
        </div>
      )}

      {/* Modal for filtering messages */}
      {showFilterModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.className === "modal-overlay")
              handleCloseFilterModal();
          }}
        >
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseFilterModal}>
              X
            </button>
            <button
              className="back-button"
              onClick={() => {
                setShowFilterModal(false);
                setShowModal(true);
              }}
            >
              ← Back
            </button>
            <h2>Filter Messages</h2>
            <div className="comments-container">
              <div className="select-all-container">
                <input
                  type="checkbox"
                  id="selectAll"
                  onChange={(e) => {
                    const allSelected = e.target.checked;
                    const updatedSelection = {};
                    filteredMessages.forEach((msg) => {
                      updatedSelection[msg] = allSelected;
                    });
                    setSelectedMessages(updatedSelection);
                  }}
                />
                <label htmlFor="selectAll">Select all</label>
              </div>
              {filteredMessages.map((message, index) => (
                <div className="comment-item" key={index}>
                  <input
                    type="checkbox"
                    checked={selectedMessages[message] || false}
                    onChange={() => handleCheckboxChange(message)}
                  />
                  <span className="comment-username">Username:</span>
                  <span className="comment-message">{message}</span>
                </div>
              ))}
            </div>
            <div className="button-group">
              <button className="delete-button" onClick={handleDeleteComments}>
                🗑 Delete Comments
              </button>
              <button className="report-button" onClick={handleReportComments}>
                ⚠ Report Comments
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.className === "modal-overlay")
              setShowSuccessModal(false);
          }}
        >
          <div className="success-modal-content">
            <h1>Done!</h1>
            <button
              className="return-button"
              onClick={() => setShowSuccessModal(false)}
            >
              Return to profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
