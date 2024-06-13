import React, {useState} from "react";
import {ButtonBase, createTheme, ThemeProvider} from "@mui/material";
import {animated, useSpring} from "react-spring";
import {VscDebugRestart} from "react-icons/vsc";
import {FaRegSquare, FaCube} from "react-icons/fa";

const ControlButtons = ({map, activeDataSet}) => {
    const [ isHoveredReset, setHoveredReset ] = useState(false);
    const [ isHoveredToggle, setHoveredToggle ] = useState(false);
    const [ is3DMode, setIs3DMode ] = useState(false);

    // Create a local theme
    const theme = createTheme({
        components: {
            MuiButtonBase: {
                styleOverrides: {
                    root: {
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        padding: "10px",
                    },
                },
            },
        },
    });

    // Animation styles
    const animationStyleReset = useSpring({
        height: isHoveredReset ? 120 : 40,
        width: isHoveredReset ? "120px" : "40px",
        backgroundColor: "#3DA9DE",
        config: {tension: 300, friction: 20},
        borderRadius: "30px",
    });

    const animationStyleToggle = useSpring({
        height: isHoveredToggle ? 120 : 40,
        width: isHoveredToggle ? "120px" : "40px",
        backgroundColor: "#3DA9DE",
        config: {tension: 300, friction: 20},
        borderRadius: "30px",
    });

    const resetView = () => {
        if (!map || !map.isStyleLoaded()) {
            console.error("Map instance not available or style not fully loaded.");
            return;
        }

        const coordinates = activeDataSet === "lebanon" ? [ 36.05, 34.27 ] : [ 73.3451, 31.3753 ];
        const zoomLevel = activeDataSet === "lebanon" ? 9 : 8;

        map.flyTo({
            center: coordinates,
            zoom: zoomLevel,
            pitch: 0,
            bearing: 0,
            essential: true,
            duration: 3000,
        });
    };

    const toggle3DMode = () => {
        if (!map || !map.isStyleLoaded()) {
            console.error("Map instance not available or style not fully loaded.");
            return;
        }

        setIs3DMode((prevMode) => !prevMode);
        const newMode = !is3DMode;

        map.flyTo({
            pitch: newMode ? 45 : 0,
        });

        const layers = [ "building-layer" ];
        const extrusionHeight = newMode ? 20 : 0;

        layers.forEach((layerId) => {
            if (map.getLayer(layerId)) {
                map.setPaintProperty(layerId, "fill-extrusion-height", extrusionHeight);
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
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
                }}
            >
                <animated.div style={animationStyleReset}>
                    <ButtonBase
                        onMouseEnter={() => setHoveredReset(true)}
                        onMouseLeave={() => setHoveredReset(false)}
                        onClick={resetView}
                        style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                    >
                        {isHoveredReset ? (
                            <span style={{color: "#fff"}}>Reset Zoom</span>
                        ) : (
                            <VscDebugRestart style={{color: "#fff", fontSize: "1.5em"}} />
                        )}
                    </ButtonBase>
                </animated.div>
                <animated.div style={animationStyleToggle}>
                    <ButtonBase
                        onMouseEnter={() => setHoveredToggle(true)}
                        onMouseLeave={() => setHoveredToggle(false)}
                        onClick={toggle3DMode}
                        style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                    >
                        {isHoveredToggle ? (
                            <span style={{color: "#fff"}}>{is3DMode ? "Switch to 2D" : "Switch to 3D"}</span>
                        ) : is3DMode ? (
                            <FaRegSquare style={{color: "#fff", fontSize: "1.5em"}} />
                        ) : (
                            <FaCube style={{color: "#fff", fontSize: "1.5em"}} />
                        )}
                    </ButtonBase>
                </animated.div>
            </div>
        </ThemeProvider>
    );
};

export default ControlButtons;
