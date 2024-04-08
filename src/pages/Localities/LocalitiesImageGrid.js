import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from 'framer-motion';

const ImageModal = ({ src, alt, onClose }) => {
    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    outline: "none",
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "white",
                        bgcolor: "#3DA9DE",
                        fontSize: "2rem",
                        "&:hover": {
                            bgcolor: "#5BAFD7",
                        },
                        zIndex: 1,
                    }}
                >
                    <CloseIcon sx={{ fontSize: "inherit" }} />
                </IconButton>

                <img src={src} alt={alt} style={{ maxWidth: "90vw", maxHeight: "90vh" }} />
            </Box>
        </Modal>
    );
};

const LocalitiesImageGrid = ({ images = [] }) => { // Default images to an empty array
    const [openImage, setOpenImage] = useState(null);
    const [imageAlt, setImageAlt] = useState("");

    const handleClickImage = (src, alt) => {
        setOpenImage(src);
        setImageAlt(alt);
    };

    // Animation settings for Framer Motion
    const imageVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    // Ensure images is always an array before attempting to use .map()
    if (!Array.isArray(images)) {
        return null; // or your preferred fallback UI
    }

    const imagesKey = images.map(image => typeof image === 'string' ? image : image.src).join(',');

    return (
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden" 
                variants={imageVariants}
                style={{ padding: "0px" }}
                key={imagesKey} // Use a more robust key based on the images
            >
                <Grid container spacing={1}>
                    {images.map((imgUrl, index) => (
                        <Grid item xs={12} sm={index === 0 ? 12 : 6} key={index}>
                            <div
                                style={{
                                    width: "100%",
                                    paddingBottom: "56.25%", // For 16:9 aspect ratio
                                    position: "relative",
                                    borderRadius: "4px",
                                    overflow: "hidden",
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <img
                                    src={typeof imgUrl === 'string' ? imgUrl : imgUrl.src} // Adjusted to handle both string URLs and objects
                                    alt={`Detail ${index}`}
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => handleClickImage(imgUrl, `Detail ${index}`)}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter" || event.key === " ") {
                                            handleClickImage(imgUrl, `Detail ${index}`);
                                        }
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                        </Grid>
                    ))}
                </Grid>
                {openImage && <ImageModal src={openImage} alt={imageAlt} onClose={() => setOpenImage(null)} />}
            </motion.div>
        </AnimatePresence>
    );
};

export default LocalitiesImageGrid;
