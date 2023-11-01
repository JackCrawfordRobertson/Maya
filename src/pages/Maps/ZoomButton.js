import React, { useState } from "react";

const ZoomButton = ({ onZoom }) => {
    const [visible, setVisible] = useState(true);

    const handleZoomClick = (event) => {
        // Stop the event from propagating
        event.stopPropagation();
        
        // Call the passed in onZoom function if it exists
        onZoom && onZoom();

        // Begin fading out the content
        const element = event.currentTarget.parentElement;
        element.style.opacity = 0;

        // Remove element from DOM after transition
        element.addEventListener('transitionend', () => {
            setVisible(false);
        }, { once: true });
    };

    return (
        visible ? (
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
                    opacity: 1,
                    transition: 'opacity 0.5s ease-in-out',
                    backgroundColor: 'rgba(52,152,219,0.8)',
                    zIndex: 100,
                    borderRadius: '15px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '48px', color: '#fff' }}>Aqueous</h1>  
                    <p style={{ color: '#fff' }}>Evolving understanding and scale through information</p>
                </div>
                <button 
                    onClick={handleZoomClick} 
                        style={{ 
                            backgroundColor: '#fff', 
                            padding: '15px 30px',  
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            transition: 'transform 0.3s ease-in-out',  // Transition for smooth scaling effect
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}  // Scale up on hover
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}  // Reset scale on mouse out
                    >
                        Zoom to Focus
                        </button>
            </div>
        ) : null
    );
};

export default ZoomButton;

