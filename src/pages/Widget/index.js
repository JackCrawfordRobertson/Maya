import React, { useState } from "react";
import { IoWater } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import InteractivePoints from "../Localities/InteractivePoints";
import GeoControls from "../SVGHeatmapOverlay/GeoControls";
import ExpandableButton from '../Widget/BubbleCharts/ExpandableButton'; // Adjust the import path as necessary

const WidgetConsolidation = ({ map, isZoomCompleted, cycleSVG }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInteractivePointsOpen, setIsInteractivePointsOpen] = useState(false);

  const toggleOpen = () => {
    console.log("Toggle Open/Close Button clicked");
    setIsOpen(!isOpen);
  };

  const toggleInteractivePointsOpen = () => {
    console.log("Interactive Points toggle before:", isInteractivePointsOpen);
    setIsInteractivePointsOpen(!isInteractivePointsOpen);
    console.log("Interactive Points toggle after:", isInteractivePointsOpen);
};


  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          display: "flex",
          gap: "10px",
          padding: "10px",
          zIndex: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          width: "25vw",
          borderRadius: "10px",
        }}
      >
        {/* Toggle Open/Close Button */}
        <ExpandableButton
          icon={<IoWater />}
          label={isOpen ? "Close" : "Open"}
          onClick={toggleOpen}
        />

        {/* Toggle Interactive Points Button */}
        <ExpandableButton
          icon={<FaLocationDot />}
          label="Interactive Points"
          onClick={toggleInteractivePointsOpen}
        />

        {/* Select Category Title */}
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'normal', fontSize:'1em' }}>
          Select Category
        </div>
      </div>

      <GeoControls isZoomCompleted={isZoomCompleted} isOpen={isOpen} cycleSVG={cycleSVG} />
      <InteractivePoints map={map} isZoomCompleted={isZoomCompleted} isWidgetOpen={isInteractivePointsOpen} />
    </>
  );
};

export default WidgetConsolidation;
