import React, {useEffect, useState, useRef, useMemo} from "react";
import {
    Button,
    Paper,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    Fade,
    useMediaQuery,
    Slider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {createTheme, ThemeProvider, useTheme} from "@mui/material/styles";
import {motion, AnimatePresence} from "framer-motion";
import {ResponsiveLine} from "@nivo/line";
import {LocalitiesData} from "../../data/Lebanon/LocalitiesData";
import {
    LocalitesWaterUsage2023,
    LocalitesWaterUsage2024,
    LocalitesWaterUsage2025,
    LocalitesWaterUsage2026,
} from "../../data/Lebanon/LocalitesWaterUsage2";
import LocalitiesImageGrid from "../Widget/LocalitiesImageGrid";
import CustomTooltip from "../Widget/CustomTooltip_InteractivePoints";

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

const InteractivePoints = ({map, isZoomCompleted, isWidgetOpen, setIsWidgetOpen}) => {
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
                    metric: "Water Demand",
                    2023: data2023.waterDemand,
                    2024: data2024.waterDemand,
                    2025: data2025.waterDemand,
                    2026: data2026.waterDemand,
                },
                {
                    metric: "Water Produced",
                    2023: data2023.averageProducedWater,
                    2024: data2024.averageProducedWater,
                    2025: data2025.averageProducedWater,
                    2026: data2026.averageProducedWater,
                },
                {
                    metric: "Available Water",
                    2023: data2023.availableWaterSource,
                    2024: data2024.availableWaterSource,
                    2025: data2025.availableWaterSource,
                    2026: data2026.availableWaterSource,
                },
            ];
        }

        return [];
    };

    // Transform radar data to line chart data
    const transformDataToLineChart = (data) => {
        if (!data) return [];
        const lineChartData = [];

        data.forEach((item) => {
            Object.keys(item).forEach((key) => {
                if (key !== "metric") {
                    let line = lineChartData.find((line) => line.id === key);
                    if (!line) {
                        line = {id: key, data: []};
                        lineChartData.push(line);
                    }
                    line.data.push({x: item.metric, y: item[key]});
                }
            });
        });

        return lineChartData;
    };

    const lineChartData = useMemo(
        () => transformDataToLineChart(getCorrespondingDataForLocality(selectedPoint?.id)),
        [ selectedPoint, displayKeys ]
    );

    const resetFilter = () => {
        setDisplayKeys([ "2023", "2024", "2025", "2026" ]);
    };

    const transitionSettings = {duration: 1, ease: "easeInOut"};

    useEffect(() => {
        if (!isWidgetOpen) {
            // Reset or perform cleanup if the widget is forcefully closed from the parent
        }
    }, [ isWidgetOpen ]);
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
                    setTimeout(() => setHoveredPoint(null), 500); // Match fade timeout
                });

                map.on("click", "points", (e) => {
                    if (e.features.length > 0) {
                        const featureId = e.features[0].properties.id;
                        const data2023 = LocalitesWaterUsage2023.find((item) => item.id === featureId);
                        const data2024 = LocalitesWaterUsage2024.find((item) => item.id === featureId);
                        const data2025 = LocalitesWaterUsage2025.find((item) => item.id === featureId);
                        const data2026 = LocalitesWaterUsage2026.find((item) => item.id === featureId);
                        const localityData = LocalitiesData.features.find(
                            (feature) => feature.properties.id === featureId
                        );

                        if (data2023 && data2024 && data2025 && data2026 && localityData) {
                            setSelectedPoint({
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
                            });

                            setIsWidgetOpen(true); // Ensure the widget is opened
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
    }, [ isWidgetOpen ]);

    const CustomTick = ({x, y, value}) => {
        // Split the value into words and add line breaks
        const words = value.split(" ");
        const lines = [];
        let currentLine = words.shift();

        words.forEach((word) => {
            if ((currentLine + word).length > 10) {
                // Adjust max length as needed
                lines.push(currentLine);
                currentLine = word;
            }
            else {
                currentLine += ` ${word}`;
            }
        });
        lines.push(currentLine);

        // Adjust the y position to add spacing above the labels
        const yOffset = 20; // Adjust this value as needed for more space

        return (
            <g transform={`translate(${x},${y + yOffset})`}>
                <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                        fill: "#333",
                        fontSize: 12,
                        maxWidth: "50px", // Set max width
                    }}
                >
                    {lines.map((line, index) => (
                        <tspan x="0" dy={`${index * 1.2}em`} key={index}>
                            {line}
                        </tspan>
                    ))}
                </text>
            </g>
        );
    };

    return (
        <ThemeProvider theme={theme}>
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
                            display: "flex",
                        }}
                    >
                        <Paper
                            elevation={4}
                            sx={{
                                padding: "10px",
                                height: isMobile ? "80vh" : "90vh",
                                display: "flex",
                                flexDirection: "column",
                                zIndex: 1,
                                width: isMobile ? "90vw" : "25vw",
                                overflowY: "auto",
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
                                        This widget allows you to explore water usage data across different localities.
                                        Select a locality on the map to see detailed metrics.
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
                                    <ResponsiveLine
                                        data={lineChartData}
                                        margin={{top: 20, right: 70, bottom: 80, left: 50}}
                                        xScale={{type: "point"}}
                                        yScale={{type: "linear", stacked: true, min: "auto", max: "auto"}}
                                        axisTop={null}
                                        axisRight={null}
                                        axisBottom={{
                                            orient: "bottom",
                                            legend: "Mesuere",
                                            legendOffset: 60, // Increase legend offset for more space
                                            legendPosition: "middle",
                                            tickPadding: 20, // Increase padding between ticks and labels
                                            renderTick: CustomTick, // Apply custom tick renderer
                                        }}
                                        axisLeft={{
                                            orient: "left",
                                            legend: "m³/day",
                                            legendOffset: -45,
                                            legendPosition: "middle",
                                        }}
                                        colors={reversedPurpleBlue}
                                        pointSize={10}
                                        pointColor={{theme: "background"}}
                                        pointBorderWidth={2}
                                        pointBorderColor={{from: "serieColor"}}
                                        pointLabelYOffset={-12}
                                        useMesh={true}
                                        legends={[
                                            {
                                                anchor: "bottom-right",
                                                direction: "column",
                                                justify: false,
                                                translateX: 100,
                                                translateY: 0,
                                                itemsSpacing: 0,
                                                itemDirection: "left-to-right",
                                                itemWidth: 80,
                                                itemHeight: 20,
                                                itemOpacity: 0.75,
                                                symbolSize: 12,
                                                symbolShape: "circle",
                                                symbolBorderColor: "rgba(0, 0, 0, .5)",
                                                effects: [
                                                    {
                                                        on: "hover",
                                                        style: {
                                                            itemBackground: "rgba(0, 0, 0, .03)",
                                                            itemOpacity: 1,
                                                        },
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                )}
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
