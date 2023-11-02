import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ZoomButton = ({ onZoom }) => {
  const [visible, setVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to manage button disabled/enabled
  const textColor = "#ffffff"; // Replace with your preferred color
  const loadingBarColor = "#ecf0f1"; // Replace with your preferred color



  useEffect(() => {
    // Set an interval to update the loading progress
    const increment = 100 / (5000 / 50); // This should be 1 if we are incrementing every 50ms.

    const intervalId = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        if (newProgress < 100) {
          return newProgress;
        } else {
          clearInterval(intervalId); // Stop the interval when we reach 100%
          setIsButtonDisabled(false); // Enable the button when loading is complete
          return 100; // Cap the progress at 100%
        }
      });
    }, 50);

    

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleZoomClick = () => {
    if (loadingProgress >= 100) {
      onZoom && onZoom();
      setVisible(false);
    }
  };

  // Calculate the button background based on the loading progress
  const buttonBackground = `linear-gradient(to right, rgba(52,152,219,1) ${loadingProgress}%, transparent ${loadingProgress}%)`;

  return visible ? (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52,152,219,0.8)",
        zIndex: 100,
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.25 }}
        style={{ textAlign: "center", marginBottom: "0px" }}
      >
        <h1 style={{ fontSize: "5em", color: textColor, marginBottom: "0px" }}>
          Maya
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
        style={{ textAlign: "center", marginBottom: "0px" }}
      >
        <p style={{ color: textColor }}>
          Transforming comprehension with information and data.
        </p>
      </motion.div>

      <motion.button
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeInOut", delay: 0 }}
  onClick={isButtonDisabled ? undefined : handleZoomClick}
  style={{
    position: 'relative', // Set the position to relative to contain the absolute loading bar
    backgroundColor: "#fff",
    padding: "15px 30px", // Padding to give button size if no fixed width/height
    margin: "20px",
    border: "none",
    borderRadius: "5px",
    cursor: isButtonDisabled ? "not-allowed" : "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
    fontSize: "16px",
    fontWeight: "bold",
    opacity: isButtonDisabled ? 0.5 : 1,
    overflow: 'hidden', // Ensure the progress bar doesn't overflow the button boundaries
    display: 'inline-flex', // This will help contain the span properly
    justifyContent: 'center', // Horizontally center the content
    alignItems: 'center', // Vertically center the content
    width: '200px', // Example fixed width
    height: '50px', // Example fixed height
  }}
>
  {/* This div will serve as the loading bar */}
  <div style={{
    position: 'absolute', // Absolute position to overlay inside the button
    bottom: 0,
    left: 0,
    height: '100%', // Match the height of the button
    backgroundColor: '#ecf0f1', // Color of the loading bar
    width: `${loadingProgress}%`, // Width based on loading progress
    borderRadius: '5px', // Optional: to match the button's border radius
    transition: 'width 0.5s ease', // Smooth transition for the loading bar's width
    zIndex: 1, // Ensure the loading bar is behind the text
  }}></div>
  
  {/* Positioning the text on top of the loading bar with higher z-index */}
  <span style={{
    position: 'relative', // Relative position to align with the button's text
    zIndex: 2, // Higher z-index to be on top of the progress bar
    pointerEvents: 'none', // Make the text non-interactive
  }}>
    Zoom to Focus
  </span>
</motion.button>

    </motion.div>
  ) : null;
};

export default ZoomButton;