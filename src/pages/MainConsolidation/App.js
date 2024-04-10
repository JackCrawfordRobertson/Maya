import React, {useState} from "react";
import BaseMap from "../Maps/BaseMap";
import WidgetConsolidation from "../Widget/index";
import GeoJsonHeatmapOverlay from "../SVGHeatmapOverlay/GeoJsonHeatmapOverlay";
import DevZoom from "../StartingZoom/DevZoom"; // Ensure this path is correct
import ZoomFrontLoadScreen from "../StartingZoom/index"; // Ensure this path is correct

const App = () => {
    const [ center, setCenter ] = useState([ 36.305, 34.27 ]); // Default center
    const [ zoom, setZoom ] = useState(2); // Default zoom level for an "outer space" effect
    const [ map, setMap ] = useState(null);
    const [ isZoomCompleted, setIsZoomCompleted ] = useState(false);
    const [ currentGeoJsonIndex, setCurrentGeoJsonIndex ] = useState(0);
    const [showZoomFrontLoadScreen, setShowZoomFrontLoadScreen] = useState(true);

    const cycleSVG = () => {
        setCurrentGeoJsonIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    const handleMove = (newCenter, newZoom) => {
        setCenter(newCenter);
        setZoom(newZoom);
    };

    const onMapLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    // Updated function to handle zoom from DevZoom component
    const handleZoom = () => {
        if (map) {
            // Instantly move to a broader view (simulate "outer space")
            map.jumpTo({
                center: [ 0, 0 ], // Initial coordinates for the broader view
                zoom: 2, // Initial zoom level for an "outer space" effect
            });

            // Animate to the final destination
            map.flyTo({
                center: center, // Destination coordinates
                zoom: 9, // Destination zoom level for a closer view
                essential: true,
                duration: 5000, // Duration in milliseconds for the animation
            });
        }
    };

    

    return (
        <div className="app" style={{position: "relative"}}>
            <BaseMap center={center} zoom={zoom} onMove={handleMove} setMap={onMapLoad} />
            {map && <GeoJsonHeatmapOverlay map={map} currentGeoJsonIndex={currentGeoJsonIndex} />}
            {map && <WidgetConsolidation map={map} isZoomCompleted={isZoomCompleted} cycleSVG={cycleSVG} />}
            {/* <DevZoom onZoom={handleZoom} /> */}
            {showZoomFrontLoadScreen && (
                <ZoomFrontLoadScreen onZoom={handleZoom} onOtherAction={() => setShowZoomFrontLoadScreen(false)} />
            )}
        </div>
    );
};

export default App;
