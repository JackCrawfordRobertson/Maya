import React, { useEffect } from "react";
import Button from "@mui/material/Button";

const ActionSection = ({ onZoomLebanon, onZoomPakistan, onOtherAction }) => {
    useEffect(() => {
        const setCustomVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        setCustomVH();
        window.addEventListener("resize", setCustomVH);

        return () => window.removeEventListener("resize", setCustomVH);
    }, []);

    const handleLaunchLebanon = () => {
        onZoomLebanon();
        if (typeof onOtherAction === "function") {
            onOtherAction();
        }
    };

    const handleLaunchPakistan = () => {
        onZoomPakistan();
        if (typeof onOtherAction === "function") {
            onOtherAction();
        }
    };

    return (
        <div className="Main__container" style={{ height: "100vh", maxHeight: "calc(var(--vh, 1vh) * 100)" }}>
            <div className="Main" style={{ overflowY: "auto", padding: "1rem" }}>
                <div style={{ marginBottom: "20px" }}>
                    <h1>Launch Maya</h1>
                    <p>
                        Explore, compare and enhance your understanding of water scarcity and the impacts of climate
                        change across the Levant.
                    </p>
                </div>
                <div className="widget">
                    <h2 style={{ marginBottom: "0" }}>Baalbek-Hermel Governorate, Lebanon</h2>
                    <h5 style={{ marginTop: "0", fontWeight: "500" }}>Last updated on - 09/04/24</h5>
                    <p>
                        A comprehensive investigation into River Basin Management within the Baalbek-Hermel Governorate,
                        specifically targeting water usage across localities most at risk throughout the region.
                    </p>
                    <Button
                        onClick={handleLaunchLebanon}
                        style={{
                            backgroundColor: "#ffffff",
                            color: "#3DA9DE",
                            padding: "10px",
                            marginBottom: "10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                            width: "100%",
                        }}
                    >
                        Launch Baalbek-Hermel
                    </Button>
                </div>

                <div className="widget">
                    <h2 style={{ marginBottom: "0" }}>Lahore, Pakistan</h2>
                    <h5 style={{ marginTop: "0", fontWeight: "500" }}>Last updated on - To Be confirmed</h5>
                    <p>
                        An ongoing, in-depth examination of River Basin Management within the Lahore Governorate,
                        Pakistan.
                    </p>
                    <Button
                        onClick={handleLaunchPakistan} // Button remains disabled until implementation
                        disabled={false}
                      
                            style={{
                                backgroundColor: "#ffffff",
                                color: "#3DA9DE",
                                padding: "10px",
                                marginBottom: "10px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "bold",
                                width: "100%",
                            }}
                        >
                        Launch Lahore
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ActionSection;
