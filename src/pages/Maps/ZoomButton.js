import React, { useState, useEffect } from "react";

const ZoomButton = ({ onZoom }) => {
    const [visible, setVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);

    const handleZoomClick = (event) => {
        // Stop the event from propagating
        event.stopPropagation();
        
        // Call the passed in onZoom function if it exists
        onZoom && onZoom();

        // Begin fading out the content
        setOpacity(0);
    };

    useEffect(() => {
        if (opacity === 0) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 500);  // Adjust timeout to match your transition duration
            return () => clearTimeout(timer);  // Cleanup timer on unmount
        }
    }, [opacity]);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: opacity,
                transition: 'opacity 0.5s ease-in-out',  // Adjust transition duration to your preference
                backgroundColor: 'rgba(52,152,219,0.8)',
                zIndex: 100,
            }}
        >
            {visible && (
                <>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h1>Title</h1>
                        <p>Your paragraph content goes here.</p>
                    </div>
                    <button 
                        onClick={handleZoomClick} 
                        style={{ 
                            backgroundColor: 'white', 
                            padding: '10px 20px', 
                            border: '1px solid black', 
                            borderRadius: '5px', 
                            cursor: 'pointer',
                            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
                        }}>
                        Zoom to Focus
                    </button>
                </>
            )}
        </div>
    );
};

export default ZoomButton;
