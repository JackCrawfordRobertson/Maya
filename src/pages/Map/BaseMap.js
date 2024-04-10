import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import './BaseMap.css'; // Ensure this path is correct

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const BaseMap = ({ center, zoom, setMap }) => {
    const mapContainer = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/jackrob/clutmwwaf002401qz513g42lw", 
            center: center, // Initial center
            zoom: zoom, // Initial zoom
            interactive: true,
        });

        setMap(map); // Optional: Store the map instance in the parent component's state for further use

        return () => {
            map.remove(); // Cleanup map instance on component unmount
        };
    }, [center, zoom]); // React to changes in 'center' and 'zoom'

    return <div className="map-container" ref={mapContainer}></div>;
};

export default BaseMap;
