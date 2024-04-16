import React, {useEffect, useState, useRef, useMemo} from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Box, Fade} from "@mui/material";
import {motion, AnimatePresence} from "framer-motion";
import {ResponsiveRadar} from "@nivo/radar";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {LocalitiesData} from "../../data/LocalitiesData";
import {
    LocalitesWaterUsage2023,
    LocalitesWaterUsage2024,
    LocalitesWaterUsage2025,
    LocalitesWaterUsage2026,
} from "../../data/LocalitesWaterUsage2";
import LocalitiesImageGrid from "../Widget/LocalitiesImageGrid"; // Adjust the path as necessary

import Slider from "@mui/material/Slider";

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

const reversedPurpleBlue = [
    "#3DA9DE",
    "#2881B4",
    "#6BBDEE",
    "#5BAFD7",
    "#A2D9F2",
    "#3DA9DE",
    "#2881B4",
    "#6BBDEE",
].reverse();

const marks = [
    {
        value: 2023,
        label: "2023",
    },
    {
        value: 2024,
        label: "2024",
    },

    {
        value: 2025,
        label: "2025",
    },
    {
        value: 2026,
        label: "2026",
    },
];

const InteractivePoints = ({ map, isZoomCompleted, isWidgetOpen, setIsWidgetOpen }) => {
    const [ selectedPoint, setSelectedPoint ] = useState(null);
    const hoveredPointIdRef = useRef(null);
    const [ displayKeys, setDisplayKeys ] = useState([ "2023", "2024", "2025", "2026" ]);
    const [ mapReady, setMapReady ] = useState(false);
    const [ infoOpen, setInfoOpen ] = useState(false);
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
    const [ isOpen, setIsOpen ] = useState(!isMobile);
    const [ hoveredPoint, setHoveredPoint ] = useState(null);
    const [ showFade, setShowFade ] = useState(false);
    const localityImages = selectedPoint?.properties?.images || [];

    const getCorrespondingDataForLocality = (localityId) => {
        const data2023 = LocalitesWaterUsage2023.find((item) => item.id === localityId);
        const data2024 = LocalitesWaterUsage2024.find((item) => item.id === localityId);
        const data2025 = LocalitesWaterUsage2025.find((item) => item.id === localityId);
        const data2026 = LocalitesWaterUsage2026.find((item) => item.id === localityId);

        if (data2023 && data2024) {
            return [
                {
                    metric: "Water Demand m3/day",
                    2023: data2023.waterDemand,
                    2024: data2024.waterDemand,
                    2025: data2025.waterDemand,
                    2026: data2026.waterDemand,
                },
                {
                    metric: "Water Produced m3/day",
                    2023: data2023.averageProducedWater,
                    2024: data2024.averageProducedWater,
                    2025: data2025.averageProducedWater,
                    2026: data2026.averageProducedWater,
                },
                {
                    metric: "Available Water Source m3/day",
                    2023: data2023.availableWaterSource,
                    2024: data2024.availableWaterSource,
                    2025: data2025.availableWaterSource,
                    2026: data2026.availableWaterSource,
                },
            ];
        }

        return [];
    };

    const radarData = useMemo(() => getCorrespondingDataForLocality(selectedPoint?.id), [ selectedPoint, displayKeys ]);

    const resetFilter = () => {
        setDisplayKeys([ "2023", "2024", "2025", "2026" ]);
    };

    const transitionSettings = { duration: 1, ease: "easeInOut" };
    
    useEffect(() => {
        // You can add any specific logic here if needed when isWidgetOpen changes
        if (!isWidgetOpen) {
          // Reset or perform cleanup if the widget is forcefully closed from the parent
        }
      }, [isWidgetOpen]);
      

    useEffect(() => {
        const handleMapLoad = () => {
            try {
                map.addSource("points", {
                    type: "geojson",
                    data: LocalitiesData,
                });

                map.on("zoomend", () => {
                    setMapReady(true);
                });

                map.addLayer({
                    id: "points",
                    type: "circle",
                    source: "points",
                    paint: {
                        "circle-radius": [
                            "step",
                            [ "zoom" ],
                            2, // radius at zoom levels less than 5
                            5,
                            6, // radius of 6 at zoom level 5
                            10,
                            8, // radius of 8 at zoom level 10
                            15,
                            10, // radius of 10 at zoom level 15
                        ],
                        "circle-color": "#3498db",
                        // Gradually increase opacity starting from zoom level 5
                        "circle-opacity": [
                            "interpolate",
                            [ "linear" ],
                            [ "zoom" ],
                            5,
                            0, // Opacity is 0 at zoom levels less than 5
                            5.5,
                            1, // Opacity transitions to 1 between zoom levels 5 and 5.5
                        ],
                    },
                });

                // Adjust the mouseenter event to set both hoveredPoint and showFade
                map.on("mouseenter", "points", (e) => {
                    if (e.features.length > 0) {
                        const {id, title} = e.features[0].properties;
                        setHoveredPoint({id, title});
                        setShowFade(true); // Ensure fade-in is triggered
                    }
                });

                // Adjust the mouseleave event to control fade-out
                map.on("mouseleave", "points", () => {
                    map.getCanvas().style.cursor = "";
                    setShowFade(false); // Trigger fade-out
                    // Optionally delay clearing hoveredPoint if you want the information to persist slightly during the fade-out
                    setTimeout(() => setHoveredPoint(null), 500); // Match fade timeout
                });

                map.on("click", "points", (e) => {
                    if (e.features.length > 0) {
                        const featureId = e.features[0].properties.id;
                        const data2023 = LocalitesWaterUsage2023.find(item => item.id === featureId);
                        const data2024 = LocalitesWaterUsage2024.find(item => item.id === featureId);
                        const data2025 = LocalitesWaterUsage2025.find(item => item.id === featureId);
                        const data2026 = LocalitesWaterUsage2026.find(item => item.id === featureId);
                        const localityData = LocalitiesData.features.find(feature => feature.properties.id === featureId);
                
                        if (data2023 && data2024 && data2025 && data2026 && localityData) {
                            setSelectedPoint(prevState => {
                                // Determine if we're clicking the same point
                                const isSamePoint = prevState?.id === featureId;
                                // Set the widget to open or toggle it if the same point is clicked again
                                setIsWidgetOpen(isSamePoint ? !isWidgetOpen : true);

                                return {
                                    ...localityData.properties,
                                    data2023: {
                                        waterDemand: data2023.waterDemand,
                                        averageProducedWater: data2023.averageProducedWater,
                                        availableWaterSource: data2023.availableWaterSource,
                                    },
                                    data2024: {
                                        waterDemand: data2024.waterDemand,
                                        averageProducedWater: data2024.averageProducedWater,
                                        availableWaterSource: data2024.availableWaterSource,
                                    },
                                    data2025: {
                                        waterDemand: data2025.waterDemand,
                                        averageProducedWater: data2025.averageProducedWater,
                                        availableWaterSource: data2025.availableWaterSource,
                                    },
                                    data2026: {
                                        waterDemand: data2026.waterDemand,
                                        averageProducedWater: data2026.averageProducedWater,
                                        availableWaterSource: data2026.availableWaterSource,
                                    },
                                };
                            });
                        }
                    }
                });
                
            } catch (error) {
                console.error("Error adding source and layer:", error);
            }
        };

        if (map && map.isStyleLoaded()) {
            handleMapLoad();
        }
        else {
            map?.on("load", handleMapLoad);
        }

        return () => {
            if (map) {
                map.off("mouseenter", "points");
                map.off("mouseleave", "points");
                map.off("click", "points");
                map.off("load", handleMapLoad);
                map.off("zoomend");

                try {
                    if (map.getLayer("points")) {
                        map.removeLayer("points");
                    }
                    if (map.getSource("points")) {
                        map.removeSource("points");
                    }
                } catch (error) {
                    console.error("Error removing layer or source:", error);
                }
            }
        };
    }, [ map ]);

    useEffect(() => {
        if (isZoomCompleted && !isMobile) {
            setIsOpen(true);
        }
        else if (isMobile) {
            setIsOpen(false);
        }
    }, [ isZoomCompleted, isMobile ]);

    const handleSliderChange = (event, newValue) => {
        setDisplayKeys([ newValue.toString() ]);
    };

    const toggleInfo = () => {
        setInfoOpen(!infoOpen);
    };

    useEffect(() => {
        const defaultLocalityId = 1;

        const defaultLocalityData = LocalitiesData.features.find(
            (feature) => feature.properties.id === defaultLocalityId
        );

        if (defaultLocalityData) {
            const data2023 = LocalitesWaterUsage2023.find((item) => item.id === defaultLocalityId);
            const data2024 = LocalitesWaterUsage2024.find((item) => item.id === defaultLocalityId);
            const data2025 = LocalitesWaterUsage2025.find((item) => item.id === defaultLocalityId);
            const data2026 = LocalitesWaterUsage2026.find((item) => item.id === defaultLocalityId);

            setSelectedPoint({
                ...defaultLocalityData.properties,
                data2023: data2023 ? data2023 : {},
                data2024: data2024 ? data2024 : {},
                data2025: data2025 ? data2025 : {},
                data2026: data2026 ? data2026 : {},
            });
        }
    }, []);

    useEffect(() => {
        console.log("Interactive Points widget open state:", isWidgetOpen);
    }, [isWidgetOpen]);
    

    return (
        <ThemeProvider theme={theme}>
            {/* Wrap the whole content in AnimatePresence to handle the enter and exit animations */}
            <AnimatePresence>
                {isWidgetOpen && (
                    <motion.div
                        className="interactive-points"
                        initial={{x: -500, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: -500, opacity: 0}}
                        transition={{duration: 1.5, ease: "easeInOut"}}
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-end",
                            top: "80px",
                            left: "10px",
                            zIndex: 3,
                            position: "absolute",
                            display: "flex", // Ensure the div is always flex when it's present

                        }}
                    >
                            <Paper
                                elevation={4}
                            sx={{
                                    padding: "10px",
                                    height: isMobile ? "90vh" : "90vh", // Dynamic width based on device
                                    display: "flex",
                                    flexDirection: "column",
                                    zIndex: 1,
                                    width: isMobile ? "90vw" : "25vw", // Dynamic width based on device
                                    overflowY: "auto", // Enables vertical scrolling
                                }}
                            >
                                <AnimatePresence>
                                    <div key={selectedPoint ? selectedPoint.id : "initial"}>
                                        {selectedPoint && <LocalitiesImageGrid images={selectedPoint.images || []} />}
                                    </div>
                                </AnimatePresence>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        margin: "0px",
                                        marginTop: "10px",
                                    }}
                                >
                                    <motion.h2
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1, transition: {delay: 0.6}}}
                                        exit={{opacity: 0}}
                                        style={{marginTop: "0px", marginBottom: "0px"}}
                                    >
                                        {selectedPoint?.title}
                                    </motion.h2>

                                    <Tooltip title="About this widget">
                                        <IconButton onClick={toggleInfo}>
                                            <InfoIcon style={{marginTop: "0px", marginBottom: "0px"}} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                <Dialog open={infoOpen} onClose={toggleInfo}>
                                    <DialogTitle>About the Widget</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            This widget allows you to explore water usage data across different
                                            localities. Select a locality on the map to see detailed metrics.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={toggleInfo} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                {selectedPoint && (
                                    <motion.div
                                        key={selectedPoint.id}
                                        initial={{opacity: 0, y: -20}}
                                        animate={{opacity: 1, y: 0, transition: {delay: 0.5, duration: 0.5}}}
                                        exit={{opacity: 0, y: 20, transition: {duration: 0.5}}}
                                    >
                                        <motion.p
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1, transition: {delay: 0.7}}}
                                            exit={{opacity: 0}}
                                            style={{marginTop: "0px", marginBottom: "0px", fontSize: "1em"}}
                                        >
                                            {selectedPoint?.description}
                                        </motion.p>
                                    </motion.div>
                                )}

                                <div style={{flex: 1, zIndex: 1, minHeight: isMobile ? "400px" : "0"}}>
                                    {selectedPoint && (
                                        <ResponsiveRadar
                                            data={radarData}
                                            keys={displayKeys}
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
                                            enableDotLabel={false}
                                            dotLabel="value"
                                            dotLabelYOffset={-12}
                                            colors={reversedPurpleBlue}
                                            fillOpacity={0.25}
                                            blendMode="multiply"
                                            animate={true}
                                            motionStiffness={90}
                                            motionDamping={15}
                                            isInteractive={true}
                                        />
                                    )}
                                </div>

                                <div style={{padding: "0 20px"}}>
                                    <Slider
                                        defaultValue={2023}
                                        step={1}
                                        marks={marks}
                                        min={2023}
                                        max={2026}
                                        valueLabelDisplay="auto"
                                        onChangeCommitted={handleSliderChange}
                                        disabled={!mapReady}
                                    />
                                </div>
                                <div style={{marginTop: "10px"}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={resetFilter}
                                        style={{width: "100%"}}
                                    >
                                        Reset Filter
                                    </Button>
                                </div>
                                </Paper>
                    </motion.div>
                )}
            </AnimatePresence>


            <Fade in={showFade} timeout={500}>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        zIndex: 1000,
                    }}
                >
                    <b> Current locality:</b> {hoveredPoint?.title}
                </Box>
            </Fade>
        </ThemeProvider>
    );
};

export default InteractivePoints;
