import React, { useState } from "react";
import BaseMap from "../Maps/BaseMap";
import WidgetConsolidation from "../Widget/index"; // Ensure this path is correct
import GeoJsonHeatmapOverlay from "../SVGHeatmapOverlay/GeoJsonHeatmapOverlay"; // Ensure this path is correct

const App = () => {
    const [center, setCenter] = useState([36.305, 34.27]); // Default center
    const [zoom, setZoom] = useState(9); // Default zoom
    const [map, setMap] = useState(null);
    const [isZoomCompleted, setIsZoomCompleted] = useState(false);
    const [currentGeoJsonIndex, setCurrentGeoJsonIndex] = useState(0); // State to track current GeoJSON index

    // Function to cycle through different GeoJSON layers
    const cycleSVG = () => {
        setCurrentGeoJsonIndex((prevIndex) => (prevIndex + 1) % 3); // Update the index to cycle through the GeoJSONs
    };

    const handleMove = (newCenter, newZoom) => {
        setCenter(newCenter);
        setZoom(newZoom);
    };

    const onMapLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    return (
        <div className="app" style={{ position: "relative" }}>
            <BaseMap center={center} zoom={zoom} onMove={handleMove} setMap={onMapLoad} />
            {map && <GeoJsonHeatmapOverlay map={map} currentGeoJsonIndex={currentGeoJsonIndex} />}
            {map && <WidgetConsolidation map={map} isZoomCompleted={isZoomCompleted} cycleSVG={cycleSVG} />}
        </div>
    );
};

export default App;
