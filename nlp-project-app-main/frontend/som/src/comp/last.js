import React from 'react';
import './last.css'; // Ensure this CSS file exists
import first from './First.png'; // Correctly import your images
import sec from './sec.png';
import Third from './thir.png';

const FeatureSection = () => {
    // Feature data
    const features = [
        {
            imgSrc: first, // Use the imported variable directly
        },
        {
            imgSrc: sec,
        },
        {
            imgSrc: Third,
        },
    ];

    return (
        <div className="feature-section">
            {features.map((feature, index) => (
                <div className="feature-card" key={index}>
                    <img src={feature.imgSrc} alt={feature.description} className="feature-image" />
                    <p className="feature-description">{feature.description}</p>
                </div>
            ))}
        </div>
    );
};

export default FeatureSection;