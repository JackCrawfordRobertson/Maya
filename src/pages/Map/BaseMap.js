import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import './BaseMap.css'; // Ensure this path is correct

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const BaseMap = ({ center, zoom, setMap }) => {
    const mapContainer = useRef(null);
    const [is3D, setIs3D] = useState(false); // Manage 3D state


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/jackrob/clutmwwaf002401qz513g42lw", 
            center: center, // Initial center
            zoom: zoom, // Initial zoom
            interactive: true,
        });

        setMap(map); // Optional: Store the map instance

        map.on('load', () => {
            // Example: Adjust a layer to 3D when 'is3D' is true
            if (is3D) {
                map.setPaintProperty('your_layer_id', 'fill-extrusion-height', 20);
                // Add additional adjustments for 3D view
            } else {
                map.setPaintProperty('your_layer_id', 'fill-extrusion-height', 0);
                // Adjust settings back for 2D view
            }
        });

        return () => {
            map.remove(); // Cleanup
        };
    }, [center, zoom, is3D]); // React to changes

    const toggle3D = () => {
        setIs3D(!is3D); // Toggle 3D state
    };

    return (
        <>
            <div className="map-container" ref={mapContainer}></div>
            
        </>
    );
};

export default BaseMap;
