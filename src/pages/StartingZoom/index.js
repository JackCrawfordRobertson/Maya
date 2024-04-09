import React, {useState, useEffect} from "react";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Button from "@mui/material/Button";

import MayaIntro from "./ComponentSections/MayaIntro";
import AboutSection from "./ComponentSections/AboutSection";
import ActionSection from "./ComponentSections/ActionSection";

const ZoomFrontLoadScreen = ({onZoom, onOtherAction}) => {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const [ loaded, setLoaded ] = useState(false);
    const [ sliderRef, instanceRef ] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    const [ backgroundOpacity, setBackgroundOpacity ] = useState(1); // Initial opacity

    const nextSlide = () => {
        instanceRef.current?.next();
    };

    const handleButtonClick = () => {
        setBackgroundOpacity(0.8);
    };

    useEffect(() => {
        setBackgroundOpacity(1);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: `rgba(61, 169, 222, ${backgroundOpacity})`, // Set background opacity dynamically
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
                overflow: "hidden",
                transition: "background-color 6s ease-in-out", // Adjust transition duration and timing function
            }}
        >
            <div ref={sliderRef} className="keen-slider" style={{width: "100%", height: "100%", margin: "auto"}}>
                <div
                    className="keen-slider__slide"
                    style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                >
                    <MayaIntro onNext={nextSlide} />
                </div>
                <div
                    className="keen-slider__slide"
                    style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                >
                    <AboutSection onNext={nextSlide} onButtonClick={handleButtonClick} />
                </div>
                <div
                    className="keen-slider__slide"
                    style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                >
                    <ActionSection onNext={nextSlide} onZoom={onZoom} onOtherAction={onOtherAction} />
                </div>
            </div>
        </div>
    );
};

export default ZoomFrontLoadScreen;