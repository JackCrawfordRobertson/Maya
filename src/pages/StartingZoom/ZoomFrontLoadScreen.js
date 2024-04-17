import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MayaIntro from "./ComponentSections/MayaIntro";
import AboutSection from "./ComponentSections/AboutSection";
import ActionSection from "./ComponentSections/ActionSection";

const ZoomFrontLoadScreen = ({ onZoom, onOtherAction }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    const [backgroundOpacity, setBackgroundOpacity] = useState(1);
    const [opacityStates, setOpacityStates] = useState([0, 0, 0]); // Opacity for each slide

    useEffect(() => {
        // Set opacity to 1 for each component after a delay when the component is mounted
        const timers = opacityStates.map((_, index) =>
            setTimeout(() => {
                setOpacityStates(prev => {
                    const newStates = [...prev];
                    newStates[index] = 1;
                    return newStates;
                });
            }, 900) // Delay of 1000 milliseconds
        );
        
        return () => timers.forEach(timer => clearTimeout(timer)); // Cleanup timeouts when component unmounts
    }, []);

    const nextSlide = () => {
        instanceRef.current?.next();
    };

    const handleButtonClick = () => {
        setBackgroundOpacity(0.8);
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: `rgba(52,152,219, ${backgroundOpacity})`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
                overflow: "hidden",
                transition: "background-color 6s ease-in-out",
            }}
        >
            <div ref={sliderRef} className="keen-slider" style={{width: "100%", height: "100%", margin: "auto"}}>
                <div
                    className="keen-slider__slide"
                    style={{display: "flex", justifyContent: "center", alignItems: "center", opacity: opacityStates[0]}}
                >
                    <MayaIntro onNext={nextSlide} />
                </div>
                <div
                    className="keen-slider__slide"
                    style={{display: "flex", justifyContent: "center", alignItems: "center", opacity: opacityStates[1]}}
                >
                    <AboutSection onNext={nextSlide} onButtonClick={handleButtonClick} />
                </div>
                <div
                    className="keen-slider__slide"
                    style={{display: "flex", justifyContent: "center", alignItems: "center", opacity: opacityStates[2]}}
                >
                    <ActionSection onNext={nextSlide} onZoom={onZoom} onOtherAction={onOtherAction} />
                </div>
            </div>
        </div>
    );
};

export default ZoomFrontLoadScreen;
