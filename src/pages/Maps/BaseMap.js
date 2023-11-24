// BaseMap.js
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import './Lebanon_Bekaa.css';
import { debounce } from 'lodash';

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const BaseMap = ({ center, zoom, onMove, setMap }) => {  // Added setMap prop
    const mapContainer = useRef(null);

    useEffect(() => {
        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/jackrob/clo8dumuh00v301pkd1ca12j0",
            center: center,
            zoom: zoom,
            interactive: true,
        });

        setMap(mapInstance);  // Set map instance

        mapInstance.on("move", () => {
            const newCenter = mapInstance.getCenter().toArray();
            const newZoom = mapInstance.getZoom();
            const centerChanged = newCenter.toString() !== center.toString();
            const zoomChanged = newZoom !== zoom;
            if (centerChanged || zoomChanged) {
                onMove && onMove(newCenter, newZoom);
            }
        });

        mapInstance.on("load", () => {

        });

        return () => {
            mapInstance.off("move");
            mapInstance.remove();
        };
    }, []);  // Dependency array left empty to run once on mount

    useEffect(() => {
        setMap(prevMap => {
            if (prevMap) {
                const currentCenter = prevMap.getCenter().toArray();
                const currentZoom = prevMap.getZoom();
                const centerChanged = currentCenter.toString() !== center.toString();
                const zoomChanged = currentZoom !== zoom;
                if (centerChanged) {
                    prevMap.setCenter(center);
                }
                if (zoomChanged) {
                    prevMap.setZoom(zoom);
                }
            }
            return prevMap;  // Return the previous map instance
        });
    }, [center, zoom]);

    return <div className="map-container" ref={mapContainer}></div>;
};

export default BaseMap;
