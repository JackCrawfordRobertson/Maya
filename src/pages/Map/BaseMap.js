import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import './BaseMap.css';

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const BaseMap = ({ center, zoom, setMap, resetView }) => {
    const mapContainer = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/jackrob/clutmwwaf002401qz513g42lw", // Use the Mapbox Studio style URL
            center: center,
            zoom: zoom,
            interactive: true,
        });

        setMap(map);

        return () => {
            map.remove();
        };
    }, [center, zoom]); // No need to include terrain options in the dependency array

    return (
        <>
            <div className="map-container" ref={mapContainer}></div>
        </>
    );
};

export default BaseMap;
