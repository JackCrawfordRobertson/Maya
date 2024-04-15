import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import './BaseMap.css';

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const BaseMap = ({ center, zoom, setMap, resetView }) => {
    const mapContainer = useRef(null);
    const [is3D, setIs3D] = useState(false);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/jackrob/clutmwwaf002401qz513g42lw", 
            center: center,
            zoom: zoom,
            interactive: true,
            // Initialize with a very high exaggeration for dramatic effect
            terrain: { source: "mapbox-dem", exaggeration: 7.0 }
        });

        setMap(map);

        map.on('load', () => {
            // Update terrain exaggeration based on the is3D state
            map.setTerrain({ source: 'mapbox-dem', exaggeration: is3D ? 7.0 : 1.5 });
        });

        return () => {
            map.remove();
        };
    }, [center, zoom, is3D]); 

    return (
        <>
            <div className="map-container" ref={mapContainer}></div>
        </>
    );
};

export default BaseMap;
