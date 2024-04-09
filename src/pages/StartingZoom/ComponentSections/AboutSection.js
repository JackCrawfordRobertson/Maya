import React from "react";
import "../../StartingZoom/styles/animations.css";
import { BsArrowRightSquareFill } from "react-icons/bs";

const AboutSection = ({ onNext, onButtonClick }) => {
    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick(); // Call the function passed from the parent component
        }
    };

    return (
        <div className="Main__container">
            <div className="Main">
                <h1 className="heading">About Maya</h1>
                <p className="body_coppy">
                    Maya emerged as an innovative response to the global challenge of water scarcity, exacerbated by
                    climate change. This web-based platform is at the forefront of translating complex environmental
                    data into actionable insights, designed to foster a comprehensive understanding among local
                    stakeholders, international donors, and the broader community.
                </p>
                <p>
                    By transforming dense water case studies from the Levant into accessible, design-driven narratives,
                    Maya sets a new standard for environmental communication. With its proven success and positive
                    feedback from initial tests, Maya is poised for expansion. Our vision is to empower specialists and
                    stakeholders across regions, turning critical data into meaningful action. Join us on this journey
                    to illuminate paths toward resilience and sustainability, one insight at a time.
                </p>
                <button
                    onClick={() => {
                        if (onNext) {
                            onNext(); // Call the function passed from the parent component
                        }
                        handleButtonClick(); // Call the handleButtonClick function
                    }}
                    className="jump-animation"
                    style={{
                        background: "transparent",
                        padding: "0",
                        border: "none",
                        cursor: "pointer", // To visually indicate the element is clickable
                        display: "inline-flex", // Use 'flex' to align the icon center if needed
                        alignItems: "center", // Vertically center the icon in the button
                        justifyContent: "right", // Horizontally center the icon in the button
                    }}
                >
                    <BsArrowRightSquareFill style={{ fontSize: "3rem", color: "white" }} />
                </button>
            </div>
        </div>
    );
};

export default AboutSection;
