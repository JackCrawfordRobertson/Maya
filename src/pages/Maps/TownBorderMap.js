import React, {useState, useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";
import InteractivePoints from "../Localities/InteractivePoints";
import SVGControls from "../SVGHeatmapOverlay/SVGControls";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {motion} from "framer-motion";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const TownBorderMap = ({center, zoom, onMove, isZoomCompleted}) => {
    const mapContainer = useRef(null);
    const [ isOpen, setIsOpen ] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const map = useRef(null);
    const [ isInteractivePointsOpen, setIsInteractivePointsOpen ] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleInteractivePointsOpen = () => setIsInteractivePointsOpen(!isInteractivePointsOpen);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/jackrob/cluiljae400z101pi4soxf1g9",
            center: center,
            zoom: zoom,
            interactive: true,
        });

        map.current.on("move", () => {
            const newCenter = map.current.getCenter().toArray();
            const newZoom = map.current.getZoom();
            const centerChanged = newCenter.toString() !== center.toString();
            const zoomChanged = newZoom !== zoom;
            if (centerChanged || zoomChanged) {
                onMove && onMove(newCenter, newZoom);
            }
        });

        map.current.on("load", () => {
            // ... (your existing 'load' event handler code)
        });

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (map.current) {
            const currentCenter = map.current.getCenter().toArray();
            const currentZoom = map.current.getZoom();
            const centerChanged = currentCenter.toString() !== center.toString();
            const zoomChanged = currentZoom !== zoom;
            if (centerChanged) {
                map.current.setCenter(center);
            }
            if (zoomChanged) {
                map.current.setZoom(zoom);
            }
        }
    }, [ center, zoom ]);

  
    return (
        <div
            className="town-border-map-container"
            ref={mapContainer}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
        >
            {/* Flex container for buttons */}
            <div style={{
                position: "absolute",
                top: 10,
                left: 10, // Adjust as necessary
                display: "flex",
                gap: "10px", // Spacing between buttons
                zIndex: 4, // Ensure it's above other elements
            }}>
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    onClick={toggleOpen}
                >
                    {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    {isOpen ? "Close" : "Open"} Panel
                </motion.button>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    onClick={toggleInteractivePointsOpen}
                >
                    {isInteractivePointsOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    {isInteractivePointsOpen ? "Close" : "Open"} Interactive Points
                </motion.button>
            </div>

            <SVGControls isZoomCompleted={isZoomCompleted} isOpen={isOpen} />

            <InteractivePoints
                map={map.current}
                isZoomCompleted={isZoomCompleted}
                isWidgetOpen={isInteractivePointsOpen}
            />
        </div>
    );
};

export default TownBorderMap;
