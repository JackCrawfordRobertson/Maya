import React from "react";
import Button from "@mui/material/Button";

const ActionSection = ({ onZoom, onOtherAction }) => {
    const handleLaunch = () => {
        onZoom(); // Trigger the zoom functionality.
        onOtherAction(); // Hide the ZoomFrontLoadScreen component.
    };

  
    return (
        <div className="Main__container">
            <div className="Main">
                <div style={{ marginBottom: "40px" }}>
                    <h1>Launch Maya</h1>
                    <p>Explore, compare and enhance your understanding of water scarcity and the impacts of climate change across the Levant.</p>
                </div>
                <div className="widget">
                    <h2 style={{ marginBottom: "0" }}>Baalbek-Hermel Governorate, Lebanon</h2>
                    <h5 style={{ marginTop: "0", fontWeight: "500" }}>Last updated on - 09/04/24</h5>
                    <p>A comprehensive investigation into River Basin Management within the Baalbek-Hermel Governorate, specifically targeting water usage across localities most at risk throughout the region.</p>
                    <Button
                        onClick={handleLaunch}
                        style={{
                            backgroundColor: "#ffffff",
                            color: "333333", /* Set the text color */
                            padding: "15px",
                            marginBottom: "20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            width: "100%",
                        }}
                    >
                        Launch Baalbek-Hermel
                    </Button>
                </div>

                {/* Explore More Section */}
                <div className="widget">
                    <h2 style={{marginBottom: "0"}}>Al-Qādisiyyah Governorate, Iraq</h2>
                    <h5 style={{marginTop: "0", fontWeight: "500"}}>Last updated on - To Be confirmed</h5>
                    <p>An ongoing, in-depth examination of River Basin Management within the Al-Qādisiyyah Governorate, Iraq, is currently underway.</p>
                    <Button
    onClick={onOtherAction}
    disabled={true} // Disable the button functionality
    style={{
        backgroundColor: "#ededed", // Change background color to a light gray
        color: "#c0c0c0", // Change text color to a lighter shade of gray
        padding: "15px 30px",
        marginBottom: "20px",
        border: "none",
        borderRadius: "5px",
        cursor: "not-allowed", // Change cursor to indicate not clickable
        fontSize: "16px",
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
