import React, { useState, useEffect } from "react";
import { IoWater } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import InteractivePoints from "../Localities/InteractivePoints";
import GeoControls from "../GeoHeatmap/GeoControls";
import ExpandableButton from '../Widget/BubbleCharts/ExpandableButton'; // Adjust the import path as necessary

const WidgetConsolidation = ({ map, isZoomCompleted, cycleSVG }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInteractivePointsOpen, setIsInteractivePointsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // For example, consider < 768px as mobile
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isInteractivePointsOpen) {
      setIsInteractivePointsOpen(false);
    }
  };

  const toggleInteractivePointsOpen = () => {
    setIsInteractivePointsOpen(!isInteractivePointsOpen);
    if (isOpen) {
      setIsOpen(false);
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
          width: isMobile ? "90vw" : "25vw", // Dynamic width based on isMobile state
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

        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'normal', fontSize:'em' }}>
          Select Category
        </div>
      </div>

      <GeoControls isZoomCompleted={isZoomCompleted} isOpen={isOpen} cycleSVG={cycleSVG} />
      <InteractivePoints map={map} isZoomCompleted={isZoomCompleted} isWidgetOpen={isInteractivePointsOpen} />
    </>
  );
};

export default WidgetConsolidation;
