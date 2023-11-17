// TownBorderMap.js
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import InteractivePoints from "../Localities/InteractivePoints"; // Import the new component


mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const TownBorderMap = ({ center, zoom, onMove, isZoomCompleted }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/jackrob/clocxnocp017d01qs5mdqfprm",
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
    }, [center, zoom]);

    return (
        <div className="town-border-map-container" ref={mapContainer} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
            {map.current && <InteractivePoints map={map.current} isZoomCompleted={isZoomCompleted} />}
        </div>
    );
};

export default TownBorderMap;