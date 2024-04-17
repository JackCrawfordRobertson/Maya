import React, {useEffect} from "react";
import Button from "@mui/material/Button";

const ActionSection = ({onZoom, onOtherAction}) => {
    useEffect(() => {
        const setCustomVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        setCustomVH();
        window.addEventListener("resize", setCustomVH);

        return () => window.removeEventListener("resize", setCustomVH);
    }, []);

    const handleLaunch = () => {
        onZoom();
        if (typeof onOtherAction === "function") {
            onOtherAction();
        }
    };

    return (
        <div className="Main__container" style={{height: "100vh", maxHeight: "calc(var(--vh, 1vh) * 100)"}}>
            <div className="Main" style={{overflowY: "auto", padding: "1rem"}}>
                <div style={{marginBottom: "20px"}}>
                    <h1>Launch Maya</h1>
                    <p>
                        Explore, compare and enhance your understanding of water scarcity and the impacts of climate
                        change across the Levant.
                    </p>
                </div>
                <div className="widget">
                    <h2 style={{marginBottom: "0"}}>Baalbek-Hermel Governorate, Lebanon</h2>
                    <h5 style={{marginTop: "0", fontWeight: "500"}}>Last updated on - 09/04/24</h5>
                    <p>
                        A comprehensive investigation into River Basin Management within the Baalbek-Hermel Governorate,
                        specifically targeting water usage across localities most at risk throughout the region.
                    </p>
                    <Button
                        onClick={handleLaunch}
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
                    <h2 style={{marginBottom: "0"}}>Al-Qādisiyyah Governorate, Iraq</h2>
                    <h5 style={{marginTop: "0", fontWeight: "500"}}>Last updated on - To Be confirmed</h5>
                    <p>
                        An ongoing, in-depth examination of River Basin Management within the Al-Qādisiyyah Governorate,
                        Iraq, is currently underway.
                    </p>
                    <Button
                        onClick={onOtherAction}
                        disabled={true}
                        style={{
                            backgroundColor: "#ededed",
                            color: "#c0c0c0",
                            padding: "10px 20px",
                            marginBottom: "10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "not-allowed",
                            fontSize: "14px",
                            fontWeight: "bold",
                            width: "100%",
                        }}
                    >
                        Launch Al-Qādisiyyah
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ActionSection;
