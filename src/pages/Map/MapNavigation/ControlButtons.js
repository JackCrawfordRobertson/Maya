import React, { useState } from "react";
import { ButtonBase, createTheme, ThemeProvider } from "@mui/material";
import { animated, useSpring } from "react-spring";
import { VscDebugRestart } from "react-icons/vsc";
import { FaRegSquare, FaCube } from "react-icons/fa";

const ControlButtons = ({ map }) => {
    const [isHoveredReset, setHoveredReset] = useState(false);
    const [isHoveredToggle, setHoveredToggle] = useState(false);
    const [is3DMode, setIs3DMode] = useState(false);

    // Create a local theme
    const theme = createTheme({
        components: {
            MuiButtonBase: {
                styleOverrides: {
                    root: {
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '10px',
                        padding: '10px',
                    }
                }
            }
        }
    });

    // Animation styles
    const animationStyleReset = useSpring({
        height: isHoveredReset ? 120 : 40,
        width: isHoveredReset ? "120px" : "40px",
        backgroundColor: "#3DA9DE",
        config: { tension: 300, friction: 20 },
        borderRadius: "30px",
    });

    const animationStyleToggle = useSpring({
        height: isHoveredToggle ? 120 : 40,
        width: isHoveredToggle ? "120px" : "40px",
        backgroundColor: "#3DA9DE",
        config: { tension: 300, friction: 20 },
        borderRadius: "30px",
    });

    // Handlers
    const handleMouseEnterReset = () => setHoveredReset(true);
    const handleMouseLeaveReset = () => setHoveredReset(false);
    const handleMouseEnterToggle = () => setHoveredToggle(true);
    const handleMouseLeaveToggle = () => setHoveredToggle(false);

    const resetView = () => {
        if (!map) {
            console.error("Map instance not available.");
            return;
        }

        if (!map.isStyleLoaded()) {
            console.error("Map style is not fully loaded.");
            return;
        }

        try {
            // Reset the map view with additional camera orientation parameters
            map.flyTo({
                center: [ 36.305, 34.27 ], // Coordinates for the center of the view
                zoom: 9, // Zoom level
                pitch: 0, // Set the pitch to 0 for a flat, 2D view
                bearing: 0, // Set the bearing to 0 to face north
                essential: true,
                duration: 3000, // Duration of the animation in milliseconds
            });

            // Loop through each 3D-capable layer and set its extrusion height to 0
            const layersToFlatten = [ "layer-id1", "layer-id2" ]; // Add your actual layer IDs here
            layersToFlatten.forEach((layerId) => {
                if (map.getLayer(layerId)) {
                    map.setPaintProperty(layerId, "fill-extrusion-height", 0);
                }
            });
        } catch (error) {
            console.error("Failed to reset view and flatten layers:", error);
        }
    };

    const toggle3DMode = () => {
        if (!map) {
            console.error("Map instance not available.");
            return;
        }

        if (!map.isStyleLoaded()) {
            console.error("Map style is not fully loaded.");
            return;
        }

        const newMode = !is3DMode; // Toggle the current mode
        setIs3DMode(newMode); // Update the state

        const pitchValue = newMode ? 45 : 0; // Use a non-zero pitch for 3D

        map.flyTo({
            pitch: pitchValue,
        });

        // Example layers that need to change their extrusion height
        const layers = [ "building-layer" ]; // Replace with actual 3D-capable layer IDs
        const extrusionHeight = newMode ? 20 : 0; // Height depends on the mode

        layers.forEach((layerId) => {
            if (map.getLayer(layerId)) {
                map.setPaintProperty(layerId, "fill-extrusion-height", extrusionHeight);
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                position: "absolute",
                bottom: 30,
                right: 10,
                zIndex: 1,
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}>
                <animated.div style={animationStyleReset}>
                    <ButtonBase
                        onMouseEnter={handleMouseEnterReset}
                        onMouseLeave={handleMouseLeaveReset}
                        onClick={resetView}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        {isHoveredReset ? (
                            <span style={{ color: "#fff" }}>Reset Zoom</span>
                        ) : (
                            <VscDebugRestart style={{ color: "#fff", fontSize: "1.5em" }} />
                        )}
                    </ButtonBase>
                </animated.div>
                <animated.div style={animationStyleToggle}>
                    <ButtonBase
                        onMouseEnter={handleMouseEnterToggle}
                        onMouseLeave={handleMouseLeaveToggle}
                        onClick={toggle3DMode}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        {isHoveredToggle ? (
                            <span style={{ color: "#fff" }}>{is3DMode ? " Switch to 2D" : "Switch to 3D"}</span>
                        ) : (
                            <span style={{ color: "#fff" }}>{is3DMode ? <FaRegSquare /> : <FaCube />}</span>
                        )}
                    </ButtonBase>
                </animated.div>
            </div>
        </ThemeProvider>
    );
};

export default ControlButtons;
