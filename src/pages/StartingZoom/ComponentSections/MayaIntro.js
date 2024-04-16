import React from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { BsArrowRightSquareFill } from "react-icons/bs";

const MayaIntro = ({ onNext }) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.6, // Delay the initial container animation
                when: "beforeChildren",
                staggerChildren: 0.3,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.6, // Adjusting button delay to match the initial delay
                duration: 0.5,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{
                textAlign: "center",
                color: "#ffffff",
                alignItems: "center",
                zIndex: 10000,
            }}
        >
            <motion.h1 variants={childVariants} style={{ fontSize: "5em", marginBottom: "0" }}>Maya</motion.h1>
            <motion.h2 variants={childVariants}>Your Gateway to Understanding</motion.h2>
            <motion.p variants={childVariants}>Visualising the complex connection between Water Scarcity and Climate Change</motion.p>
            <motion.div variants={buttonVariants}>
                <Button
                    variant="contained"
                    onClick={onNext}
                    className="jump-animation"
                    style={{
                        backgroundColor: "transparent",
                        padding: "0",
                        display: "inline-block",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "none",
                        boxShadow: "none",
                        marginTop: "2rem",
                    }}
                >
                    <BsArrowRightSquareFill style={{ fontSize: "3rem" }} />
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default MayaIntro;
