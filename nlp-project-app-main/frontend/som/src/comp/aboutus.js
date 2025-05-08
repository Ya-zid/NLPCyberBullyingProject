import React from "react";
import "./aboutus.css";

const AboutUs = () => {
    return (
        <div className="about-us-page">
            <div className="about-us-container">
                <h1 className="about-us-title">About <span className="highlighted-text">ClearNet AI</span></h1>
                <div className="about-us-content">
                    <p className="about-us-intro">
                        At <span className="highlighted-text">ClearNet AI</span>, we envision an online world free from the shadows of <strong>cyberbullying</strong> and <strong>hate speech</strong>. We aim to empower <strong>content creators</strong> and <strong>influencers</strong> with cutting-edge <strong>AI tools</strong> to combat negativity and foster positivity.
                    </p>

                    <div className="about-us-mission">
                        <h2>Our Mission</h2>
                        <p>
                            Built for <strong>Algerian influencers</strong>, our AI leverages a vast collection of Algerian linguistic data to accurately detect harmful comments. By using this powerful tool, content creators can:
                        </p>
                        <div className="highlighted-points">
                            <div className="point">
                                <span className="icon">🛡</span>
                                <span>Identify harmful comments in their content</span>
                            </div>
                            <div className="point">
                                <span className="icon">🚫</span>
                                <span>Eliminate cyberbullying in their online spaces</span>
                            </div>
                            <div className="point">
                                <span className="icon">🌟</span>
                                <span>Foster a positive, uplifting environment</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-us-vision">
                        <h2>Our Vision</h2>
                        <p>
                            We believe in creating safer digital spaces where everyone feels respected. By addressing the unique cultural and linguistic context of Algeria, we strive to make the internet a better place for creators and their communities.
                        </p>
                    </div>

                    <div className="about-us-cta">
                        <h2>Join the Movement</h2>
                        <p>
                            Let’s work together to eliminate hate speech and build a more inclusive online community. Start using <span className="highlighted-text">ClearNet AI</span> today!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
