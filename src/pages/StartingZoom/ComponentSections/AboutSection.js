import React from "react";
import "../../StartingZoom/styles/animations.css";
import { BsArrowRightSquareFill } from "react-icons/bs";

const AboutSection = ({ onNext, onButtonClick }) => {
    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick(); 
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
                    feedback from initial beta tests, Maya is ready for further expansion. Our vision is to empower specialists and
                    stakeholders across regions, turning critical data into meaningful and accessible actions. Join us on this journey
                    to illuminate paths toward resilience and sustainability, one insight at a time.
                </p>
                <button
                    onClick={() => {
                        if (onNext) {
                            onNext(); 
                        }
                        handleButtonClick(); 
                    }}
                    className="jump-animation"
                    style={{
                        background: "transparent",
                        padding: "0",
                        border: "none",
                        cursor: "pointer", 
                        display: "inline-flex",
                        alignItems: "center", 
                        justifyContent: "right", 
                    }}
                >
                    <BsArrowRightSquareFill style={{ fontSize: "3rem", color: "white" }} />
                </button>
            </div>
        </div>
    );
};

export default AboutSection;
