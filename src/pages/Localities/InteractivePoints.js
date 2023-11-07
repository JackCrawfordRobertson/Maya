import React, {useEffect, useState, useRef} from "react";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {motion} from "framer-motion";
import {ResponsiveRadar} from "@nivo/radar";
import {LocalitiesData} from "./LocalitiesData";
import {LocalitesWaterUsage2} from "./LocalitesWaterUsage2";
import "./Interactive.css";

// Set the theme for the MUI components
const theme = createTheme({
    typography: {
        fontFamily: '"inter", sans-serif !important',
    },

    palette: {
        primary: {
            main: "#3498db",
        },
    },
});

const InteractivePoints = ({map}) => {
    const [ selectedPoint, setSelectedPoint ] = useState(null);
    const hoveredPointIdRef = useRef(null);
    const [ isOpen, setIsOpen ] = useState(false);

    const getCorrespondingData = (selectedId) => {
        const data = LocalitesWaterUsage2.find((item) => item.id === selectedId);
        if (data) {
            return [
                {
                    metric: "Water Demand",
                    [data.name]: data.waterDemand,
                },
                {
                    metric: "Average Produced Water",
                    [data.name]: data.averageProducedWater,
                },
                {
                    metric: "Available Water Source",
                    [data.name]: data.availableWaterSource,
                },
            ];
        }
        return [];
    };

    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            try {
                map.addSource("points", {
                    type: "geojson",
                    data: LocalitiesData, // Use the data object here
                });

                map.addLayer({
                    id: "points",
                    type: "circle",
                    source: "points",
                    paint: {
                        "circle-radius": 6,
                        "circle-color": "#3498db",
                    },
                });

                map.on("mouseenter", "points", (e) => {
                    map.getCanvas().style.cursor = "pointer";
                    if (e.features.length > 0) {
                        const {id} = e.features[0].properties;
                        hoveredPointIdRef.current = id;
                    }
                });

                map.on("mouseleave", "points", () => {
                    map.getCanvas().style.cursor = "";
                    hoveredPointIdRef.current = null;
                });

                map.on("click", "points", (e) => {
                    if (e.features.length > 0) {
                        const featureId = e.features[0].properties.id; // Retrieve ID from the clicked feature properties
                        const selectedData = LocalitesWaterUsage2.find((item) => item.id === featureId);
                        const localityData = LocalitiesData.features.find(
                            (feature) => feature.properties.id === featureId
                        );
                        if (selectedData && localityData) {
                            setSelectedPoint({
                                ...selectedData, // This contains id, name, waterDemand, averageProducedWater, availableWaterSource
                                title: localityData.properties.title,
                                description: localityData.properties.description,
                            }); // Merge the data from both sources
                        }
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
            map.off("load", handleMapLoad);
            if (map.getLayer("points")) {
                map.removeLayer("points");
                map.removeSource("points");
            }
        };
    }, [map]);
    
       // Modify the toggleOpen function to handle event stopping
       const toggleOpen = (event) => {
        event.preventDefault(); // Prevent default event behavior
        event.stopPropagation(); // Stop event propagation
        setIsOpen(!isOpen);
    };

    return (
        <ThemeProvider theme={theme}>
        <div
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 5,
                pointerEvents: "none", // Pass mouse events through when the widget is closed
            }}
        >
                <motion.button
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, ease: "easeInOut"}}
                    onClick={(e) => toggleOpen(e)} // Pass the event to the toggle function
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
                        textTransform: "uppercase",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                    }}
                >
                    {isOpen ? "Close " : "Open "}
                    {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </motion.button>

                <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
                    <Paper
                        elevation={4}
                        style={{
                            padding: "10px",
                            width: "300px",
                            height: "50vh", // Set the height to 50vh
                            display: "flex", // Use flexbox to layout the children
                            flexDirection: "column", // Stack children vertically
                            pointerEvents: "auto", // Re-enable mouse events for the open widget

                        }}
                    >
                        <h2 style={{marginTop: "10px", marginBottom: "5px"}}>{selectedPoint?.title}</h2>
                        <h4 style={{marginTop: "5px", marginBottom: "0px", fontSize: "1em"}}>Description</h4>
                        <p style={{marginTop: "5px", marginBottom: "0px", fontSize: "1em"}}>
                            {selectedPoint?.description}
                        </p>
                        <div style={{flex: 1, minHeight: 0}}>
                            {" "}
                            {/* This div will grow to fit available space */}
                            {selectedPoint && (
                                <ResponsiveRadar
                                    keys={selectedPoint ? [ selectedPoint.name ] : []}
                                    data={getCorrespondingData(selectedPoint?.id)}
                                    indexBy="metric"
                                    maxValue="auto"
                                    margin={{top: 50, right: 80, bottom: 40, left: 80}}
                                    padding={{right: 10, left: 10}}
                                    curve="linearClosed"
                                    borderWidth={2}
                                    borderColor={{from: "color"}}
                                    gridLevels={5}
                                    gridShape="circular"
                                    gridLabelOffset={10}
                                    enableDots={true}
                                    dotSize={10}
                                    dotColor={{theme: "background"}}
                                    dotBorderWidth={2}
                                    dotBorderColor={{from: "color"}}
                                    enableDotLabel={true}
                                    dotLabel="value"
                                    dotLabelYOffset={-12}
                                    colors={{scheme: "nivo"}}
                                    fillOpacity={0.25}
                                    blendMode="multiply"
                                    animate={true}
                                    motionStiffness={90}
                                    motionDamping={15}
                                    isInteractive={true}
                                />
                            )}
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Button
                                startIcon={<ChevronLeftIcon />}
                                onClick={() => {
                                    // Logic to navigate to the previous point
                                }}
                            >
                                Prev
                            </Button>
                            <Button
                                endIcon={<ChevronRightIcon />}
                                onClick={() => {
                                    // Logic to navigate to the next point
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
