import React, { useState } from "react";
import { IoWater } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import InteractivePoints from "../Localities/InteractivePoints";
import GeoControls from "../SVGHeatmapOverlay/GeoControls";
import ExpandableButton from '../Widget/BubbleCharts/ExpandableButton'; // Adjust the import path as necessary

const WidgetConsolidation = ({ map, isZoomCompleted, cycleSVG }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInteractivePointsOpen, setIsInteractivePointsOpen] = useState(false);

  // Toggle GeoControls Widget
  const toggleOpen = () => {
    console.log("GeoControls Toggle Button clicked");
    setIsOpen(!isOpen); // Toggle current widget
    if (isInteractivePointsOpen) {
      setIsInteractivePointsOpen(false); // Ensure only one widget is open at a time
    }
  };

  // Toggle Interactive Points Widget
  const toggleInteractivePointsOpen = () => {
    console.log("Interactive Points Toggle Button clicked");
    setIsInteractivePointsOpen(!isInteractivePointsOpen); // Toggle current widget
    if (isOpen) {
      setIsOpen(false); // Ensure only one widget is open at a time
    }
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
        <ExpandableButton
          icon={<IoWater />}
          label="Aquifer Health"
          onClick={toggleOpen}
        />

        <ExpandableButton
          icon={<FaLocationDot />}
          label="Interactive Points"
          onClick={toggleInteractivePointsOpen}
        />

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
