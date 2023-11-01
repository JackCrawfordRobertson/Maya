import React, { useState } from "react";
import BaseMap from "../Maps/BaseMap";
import SVGHeatmapOverlay from "../SVGHeatmapOverlay/SVGHeatmapOverlay";
import SVGControls from "../SVGHeatmapOverlay/SVGControls";
import TownBorderMap from "../Maps/TownBorderMap";
import ZoomButton from "../Maps/ZoomButton"; // Make sure the import path is correct

const MapComponent = () => {
  // Initial center set to show the whole world
  const [center, setCenter] = useState([0, 0]);

  // Initial zoom set to show the whole world
  const [zoom, setZoom] = useState(1);

  const [visibleSVG, setVisibleSVG] = useState(0);
  const [map, setMap] = useState(null);

  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  
  // New state variable to track whether zoom has completed
  const [isZoomCompleted, setIsZoomCompleted] = useState(false);

  const cycleSVG = () => {
    setVisibleSVG((prevSVG) => (prevSVG + 1) % 3);
  };

  const handleMove = (newCenter, newZoom) => {
    setCenter(newCenter);
    setZoom(newZoom);
  };

  const zoomToFocus = () => {
    if (map) {
      map.flyTo({
          center: [36.305, 34.27],
          zoom: 9,
          speed: .9,
          curve: 2,
          easing(t) {
              return t;
          },
      });

      map.once('moveend', function() {
          console.log('Zoom animation completed');  // Log to console
          setButtonsDisabled(false);  // Re-enable buttons
          setIsZoomCompleted(true);  // Set isZoomCompleted to true once zoom completes
      });
    }
  };

  return (
    <div className="map-wrapper" style={{ position: "relative" }}>
      <BaseMap
        center={center}
        zoom={zoom}
        onMove={handleMove}
        setMap={setMap}
      />

{isZoomCompleted && (
      <SVGHeatmapOverlay
        center={center}
        zoom={zoom}
        visibleSVG={visibleSVG}
        map={map}
      />
      )}
        
      <TownBorderMap center={center} zoom={zoom} onMove={handleMove} />

      {isZoomCompleted && (
        <SVGControls cycleSVG={cycleSVG} disabled={buttonsDisabled} />
      )}

      <ZoomButton onZoom={zoomToFocus} disabled={buttonsDisabled} />
    </div>
  );
};

export default MapComponent;
