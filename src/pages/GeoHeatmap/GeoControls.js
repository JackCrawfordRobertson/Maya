import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import {createTheme, ThemeProvider, useTheme} from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {motion, AnimatePresence} from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

// Create a custom theme
const theme = createTheme({
    typography: {},
    palette: {
        primary: {
            main: "#3498db",
            "&:hover": {
                backgroundColor: "#3498db",
            },
        },
    },
});

const keyParameters = [
    {color: "#AD1457", text: "> 50"},
    {color: "#F44336", text: "40 - 50"},
    {color: "#FF9800", text: "30 - 40"},
    {color: "#FFC107", text: "20 - 30"},
    {color: "#8BC34A", text: "10 - 20"},
    {color: "#009688", text: "5 - 10"},
    {color: "#156550", text: "< 5"},
    // ... Add more parameters if needed
];

const contents = [
    {
        title: "Simulation S0",
        text: "Increase of domestic water demand and supply according to demographic expansion.",
    },
    {
        title: "Simulation S11",
        text: "Implementation of water supply infrastructure and water conservation measures as proposed in the NWSS for 2035.",
    },
    {
        title: "Simulation S11CC",
        text: " Climate change scenario with incorporation of CMIP6 climate anomalies",
    },
    // ... Add more content objects for additional SVGs if needed
];

// The SVGControls now accepts an isOpen prop from the parent
const GeoControls = ({cycleSVG, disabled, isOpen, onOpacityChange}) => {
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
    const [ contentIndex, setContentIndex ] = useState(0);
    const [ infoOpen, setInfoOpen ] = useState(false);
    const [ opacity, setOpacity ] = useState(0.25); // Manage local state

    const handleOpacityChange = (event, newValue) => {
        setOpacity(newValue);
        onOpacityChange(newValue);
    };

    const handleCycleSVG = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!disabled) {
            cycleSVG();
            setContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
        }
    };

    const toggleInfo = () => {
        setInfoOpen(!infoOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            {/* Removed the style that controls visibility using isOpen */}
            <div
                className="interactive-points"
                style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    top: "80px",
                    left: "10px",
                    zIndex: 3,
                    position: "absolute",
                }}
            >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="panel"
                            initial={{x: -500, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            exit={{x: -500, opacity: 0}}
                            transition={{duration: 1.5, ease: "easeInOut"}}
                        >
                            <Paper
                                elevation={4}
                                sx={{
                                    padding: "10px",
                                    height: isMobile ? "auto" : "auto", // Dynamic width based on device
                                    display: "flex",
                                    flexDirection: "column",
                                    zIndex: 1,
                                    width: isMobile ? "90vw" : "25vw", // Dynamic width based on device
                                    overflowY: "auto", // Enables vertical scrolling
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: isMobile ? "90vw" : "25vw", // Dynamic width based on device
                                    }}
                                >
                                    <AnimatePresence>
                                        <motion.div
                                            key={contentIndex}
                                            initial={{opacity: 0, y: -20}}
                                            animate={{opacity: 1, y: 0, transition: {delay: 0.5, duration: 0.5}}}
                                            exit={{opacity: 0, y: 20, transition: {duration: 0.5}}}
                                        >
                                            <motion.h2
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1, transition: {delay: 0.6}}}
                                                exit={{opacity: 0}}
                                                style={{marginTop: "0px", marginBottom: "0px"}}
                                            >
                                                {contents[contentIndex].title}
                                            </motion.h2>
                                        </motion.div>
                                    </AnimatePresence>

                                    <Tooltip title="About this widget">
                                        <IconButton onClick={toggleInfo}>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                <Dialog open={infoOpen} onClose={toggleInfo}>
                                    <DialogTitle>About the Widget</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            This widget enables you to explore a range of simulations related to the
                                            Letani River Basin across various time frames and variable periods.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={toggleInfo} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                {/* Container for the animating content */}
                                <div style={{position: "relative", padding: "40px"}}>
                                    {" "}
                                    {/* Adjust height as needed */}
                                    <AnimatePresence>
                                        <motion.div
                                            key={contentIndex}
                                            initial={{opacity: 0, y: -20}}
                                            animate={{opacity: 1, y: 0, transition: {delay: 0.5, duration: 0.5}}}
                                            exit={{opacity: 0, y: 20, transition: {duration: 0.5}}}
                                            style={{position: "absolute", top: 0, left: 0}}
                                        >
                                            {/* Animating elements */}
                                            <motion.h5
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1, transition: {delay: 0.6}}}
                                                exit={{opacity: 0}}
                                                style={{marginTop: "0px", marginBottom: "0px"}}
                                            >
                                                Description
                                            </motion.h5>
                                            <motion.p
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1, transition: {delay: 0.7}}}
                                                exit={{opacity: 0}}
                                                style={{marginTop: "10px", marginBottom: "0px", fontSize: "1em"}}
                                            >
                                                {contents[contentIndex].text}
                                            </motion.p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div style={{marginTop: "5px"}}>
                                    {" "}
                                    {/* Adjust margin-top as needed */}
                                    <h4 style={{marginTop: "0px", marginBottom: "5px"}}>Drawdown (m)</h4>
                                    {keyParameters.map((item, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    backgroundColor: item.color,
                                                    marginRight: "10px",
                                                }}
                                            ></div>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <motion.h4
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1, transition: {delay: 0.6}}}
                                    exit={{opacity: 0}}
                                    style={{marginTop: "10px", marginBottom: "0px"}}
                                >
                                    Transparency Level
                                </motion.h4>
                                <Slider
                                    value={opacity}
                                    onChange={handleOpacityChange}
                                    min={0}
                                    max={0.5}
                                    step={0.01}
                                    aria-labelledby="opacity-slider"
                                    valueLabelDisplay="auto"
                                    style={{marginBottom: "5px"}}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCycleSVG} // Use handleCycleSVG here instead of cycleSVG
                                    fullWidth
                                    disabled={disabled}
                                >
                                    Next Simulation
                                </Button>
                            </Paper>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ThemeProvider>
    );
};

export default GeoControls;
