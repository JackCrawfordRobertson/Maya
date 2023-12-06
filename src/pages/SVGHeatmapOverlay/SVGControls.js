import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

const SVGControls = ({cycleSVG, disabled}) => {
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
    const [ open, setOpen ] = useState(!isMobile);
    const [ contentIndex, setContentIndex ] = useState(0);
    const [ infoOpen, setInfoOpen ] = useState(false);

    useEffect(() => {
        setOpen(!isMobile);
    }, [ isMobile ]);

    const handleCycleSVG = (event) => {
        event.preventDefault(); // Prevent default event behavior
        event.stopPropagation(); // Stop event propagation
        if (!disabled) {
            cycleSVG();
            setContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
        }
    };

   

    const toggleOpen = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!disabled) {
            setOpen(!open);
        }
    };

    const toggleInfo = () => {
        setInfoOpen(!infoOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <div
                className="heatmap-overlay"
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 3,
                    width: isMobile ? "90vw" : "20vw",
                }}
            >
                    <motion.button
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, ease: "easeInOut"}}
                        onClick={(e) => toggleOpen(e)}
                        style={{
                            backgroundColor: theme.palette.primary.main,
                            color: "#fff",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginBottom: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textTransform: "uppercase",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                        }}
                        disabled={disabled}
                    >
                        <AnimatePresence mode="wait">
                            {open ? (
                                <motion.div
                                    key="hide"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.2}}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    Hide panel <ChevronRightIcon />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="show"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.2}}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    Show panel <ChevronLeftIcon />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                

                <AnimatePresence>
                    {open && (
                        <motion.div
                            key="content"
                            initial={{x: -300, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            exit={{x: -300, opacity: 0}}
                            transition={{duration: 1, ease: "easeInOut"}}
                        >
                            <Paper elevation={4} style={{padding: "10px"}}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <AnimatePresence>
                                        <motion.div
                                            key={contentIndex}
                                            initial={{opacity: 0, y: -20}}
                                            animate={{opacity: 1, y: 0, transition: {delay: 0.5, duration: 0.5}}}
                                            exit={{opacity: 0, y: 20, transition: {duration: 0.5}}}
                                        >
                                            <motion.h3
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1, transition: {delay: 0.6}}}
                                                exit={{opacity: 0}}
                                                style={{marginTop: "5px", marginBottom: "0px"}}
                                            >
                                                {contents[contentIndex].title}
                                            </motion.h3>
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
                                                style={{marginTop: "5px", marginBottom: "0px"}}
                                            >
                                                Description
                                            </motion.h5>
                                            <motion.p
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1, transition: {delay: 0.7}}}
                                                exit={{opacity: 0}}
                                                style={{marginTop: "5px", marginBottom: "0px", fontSize: "1em"}}
                                            >
                                                {contents[contentIndex].text}
                                            </motion.p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div style={{marginTop: "10px"}}>
                                    {" "}
                                    {/* Adjust margin-top as needed */}
                                    <h4 style={{marginTop: "10px", marginBottom: "5px"}}>Drawdown (m)</h4>
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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCycleSVG}
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

export default SVGControls;
