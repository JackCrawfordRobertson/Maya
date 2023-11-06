import React, {useEffect, useState, useRef} from "react";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { motion } from "framer-motion"; // Ensure this import is present
import { LocalitiesData } from './LocalitiesData';  // Import the data object


const theme = createTheme({
    typography: {
      fontFamily: '"inter", sans-serif',
    },
    palette: {
      primary: {
        main: "#3498db",
        "&:hover": {
          backgroundColor: "#3498db",
        },
      },
    },
  });

const InteractivePoints = ({map}) => {
    const [ selectedPoint, setSelectedPoint ] = useState(null);
    const hoveredPointIdRef = useRef(null); // Create a ref to hold the hovered point id
    const [ isOpen, setIsOpen ] = useState(false); // State to control the button toggle
    const [ disabled, setDisabled ] = useState(false); // You need to define when this should be true or false

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const animateCircleRadius = (timestamp, startTimestamp, startRadius, endRadius, pointId) => {
        const progress = (timestamp - startTimestamp) / 1000; // Calculate progress
        if (progress < 1) {
            const currentRadius = startRadius + (endRadius - startRadius) * progress;
            map.setPaintProperty("points", "circle-radius", [
                "case",
                [ "==", [ "id" ], pointId ],
                currentRadius,
                6, // default radius for other points
            ]);
            requestAnimationFrame((newTimestamp) =>
                animateCircleRadius(newTimestamp, startTimestamp, startRadius, endRadius, pointId)
            );
        }
        else {
            map.setPaintProperty("points", "circle-radius", [
                "case",
                [ "==", [ "id" ], pointId ],
                endRadius,
                6, // default radius for other points
            ]);
        }
    };

    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            try {
                map.addSource("points", {
                    type: "geojson",
                    data: LocalitiesData,  // Use the data object here
                });

                // Wait for the source to load before adding the layer
                map.on("sourcedata", function onSourceData(e) {
                    if (e.sourceId === "points" && map.isSourceLoaded("points")) {
                        map.off("sourcedata", onSourceData);
                        map.addLayer({
                            id: "points",
                            type: "circle",
                            source: "points",
                            paint: {
                                "circle-radius": 6,
                                "circle-color": "#3498db",
                            },
                        });
                    }
                });

                map.on("mouseenter", "points", (e) => {
                    map.getCanvas().style.cursor = "pointer";
                    if (e.features.length > 0) {
                        const {id} = e.features[0];
                        hoveredPointIdRef.current = id;
                        requestAnimationFrame((timestamp) => animateCircleRadius(timestamp, timestamp, 6, 12, id));
                    }
                });

                map.on("mouseleave", "points", () => {
                    map.getCanvas().style.cursor = "";
                    if (hoveredPointIdRef.current !== null) {
                        const id = hoveredPointIdRef.current;
                        requestAnimationFrame((timestamp) => animateCircleRadius(timestamp, timestamp, 12, 6, id));
                        hoveredPointIdRef.current = null; // Reset the hovered point id
                    }
                });

                map.on("click", "points", (e) => {
                    if (e.features.length > 0) {
                        const coordinates = e.features[0].geometry.coordinates.slice();
                        const description = e.features[0].properties.description;
                        const title = e.features[0].properties.title;
                        setSelectedPoint({coordinates, title, description});
                    }
                });
            } catch (error) {
                console.error("Error adding source and layer:", error);
            }
        };

        if (map.isStyleLoaded()) {
            handleMapLoad();
        }
        else {
            map.on("load", handleMapLoad);
        }

        return () => {
            map.off("load", handleMapLoad); // Remove the 'load' event listener
            if (map.getLayer("points")) {
                map.removeLayer("points");
                map.removeSource("points");
            }
        };
    }, [ map ]);

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 2,
                }}
            >
                <motion.button
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, ease: "easeInOut"}}
                    onClick={toggleOpen} // Use the toggleOpen function here
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginBottom: "10px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textTransform: "uppercase", // This line ensures text is displayed in uppercase
                        fontSize: "0.875rem", // Adjust font size if necessary
                        fontWeight: "500",
                    }}
                    disabled={disabled}
                >
                    {isOpen ? "Close " : "Open "}
                    {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </motion.button>

                <Slide direction="left" in={!!selectedPoint} mountOnEnter unmountOnExit>
                    <Paper elevation={4} style={{padding: "10px", width: "200px"}}>
                        <h3>{selectedPoint?.title}</h3>
                        <p>{selectedPoint?.description}</p>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}
                        >
                            <Button
                                startIcon={<ChevronLeftIcon />}
                                onClick={() => {
                                    /* Navigate to previous point */
                                }}
                            >
                                Prev
                            </Button>
                            <Button
                                endIcon={<ChevronRightIcon />}
                                onClick={() => {
                                    /* Navigate to next point */
                                }}
                            >
                                Next
                            </Button>
                        </div>
                    </Paper>
                </Slide>
            </div>
        </ThemeProvider>
    );
};

export default InteractivePoints;