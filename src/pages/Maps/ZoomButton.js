import React, { useState } from "react";
import { motion } from "framer-motion";

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
          
            <motion.div
                initial={{ opacity: 1, backgroundColor: 'rgba(52,152,219,1)' }}
                animate={{ opacity: 1, backgroundColor: 'rgba(52,152,219,0.8)' }}
                transition={{ duration: 2, ease: "easeInOut" }}  // Adjust the duration as needed
                
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
                    backgroundColor: 'rgba(52,152,219,0.8)',
                    zIndex: 100,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                    transition: 'opacity 3s ease-in-out',  // Adjusted transition for opacity
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.25 }}
                    style={{ textAlign: 'center', marginBottom: '0px' }}
                >
                    <h1 style={{ fontSize: '5em', color: '#fff',marginBottom: '0px' }}>Aqueous</h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: .5 }}
                    style={{ textAlign: 'center', marginBottom: '0px' }}
                >
                    <p style={{ color: '#fff' }}>Evolving understanding and scale through information</p>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 2 }}
                    onClick={handleZoomClick}
                    style={{
                        backgroundColor: '#fff',
                        padding: '15px 30px',
                        margin: '20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                    Zoom to Focus
                </motion.button>
            </motion.div>
        ) : null
    );
};

export default ZoomButton;