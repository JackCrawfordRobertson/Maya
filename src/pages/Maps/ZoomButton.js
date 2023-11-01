// ZoomButton.js
import React from "react";

const ZoomButton = ({ onZoom }) => {
    const handleZoomClick = (event) => {
        // Stop the event from propagating
        event.stopPropagation();
        
        // Call the passed in onZoom function if it exists
        onZoom && onZoom();
    };

    return (
        <button 
            onClick={handleZoomClick} 
            style={{ 
                position: 'absolute', 
                top: 10, 
                left: 10, 
                zIndex: 4, 
                backgroundColor: 'white', 
                padding: '10px 20px', 
                border: '1px solid black', 
                borderRadius: '5px', 
                cursor: 'pointer',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
            }}>
            Zoom to Focus
        </button>
    );
};

export default ZoomButton;
