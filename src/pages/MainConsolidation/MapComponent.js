import React, { useState } from "react";
import BaseMap from "../Maps/BaseMap";
import SVGHeatmapOverlay from "../SVGHeatmapOverlay/SVGHeatmapOverlay";  // Adjusted the import path
import SVGControls from "../SVGHeatmapOverlay/SVGControls";
import TownBorderMap from "../Maps/TownBorderMap";  // Importing the new TownBorderMap component

const MapComponent = () => {
    const [center, setCenter] = useState([36.305, 34.27]);
    const [zoom, setZoom] = useState(9);
    const [visibleSVG, setVisibleSVG] = useState(0);
    const [map, setMap] = useState(null);  // Add map state


    const cycleSVG = () => {
        setVisibleSVG((prevSVG) => (prevSVG + 1) % 3);  // Assume you have 2 SVGs for simplicity
    };

    const handleMove = (newCenter, newZoom) => {
        setCenter(newCenter);
        setZoom(newZoom);
    };

    return (
        <div className="map-wrapper" style={{ position: "relative" }}>  {/* Added position: "relative" */}
            <BaseMap center={center} zoom={zoom} onMove={handleMove} setMap={setMap} />
        <SVGHeatmapOverlay center={center} zoom={zoom} visibleSVG={visibleSVG} map={map} />
            <TownBorderMap center={center} zoom={zoom} onMove={handleMove} />  {/* Added onMove prop */}
            <SVGControls cycleSVG={cycleSVG} />
        </div>
    );
};

export default MapComponent;
