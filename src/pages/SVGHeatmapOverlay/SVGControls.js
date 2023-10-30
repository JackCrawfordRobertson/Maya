import React, { useState } from "react";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: '"inter", sans-serif', // Replace 'Roboto' with your desired font family
  },
  palette: {
    primary: {
      main: "#3498db", // Replace '#3498db' with your desired color in HEX format
      "&:hover": {
        backgroundColor: "#3498db",
      },
    },
  },
});

const SVGControls = ({ cycleSVG }) => {
  const [open, setOpen] = useState(true);
  const [contentIndex, setContentIndex] = useState(0);

  const contents = [
    {
      title: "Simulation S0",
      text: "Business as usual including private wells, operating public wells, and under-construction wells.",
    },
    {
      title: "Simulation S11",
      text: "Increase of irrigation water demand based on spatial expansion in 2035, implementation of NWSS measures, additional measures to meet unmet domestic demand by 2035, and irrigation mitigation measures low demanding crops and efficiency improvement.",
    },
    // ... Add more content objects for additional SVGs if needed
  ];

  const handleCycleSVG = () => {
    cycleSVG();
    setContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(!open)}
          style={{ marginBottom: "10px", width: "100%" }} // Adjusted width
          fullWidth
        >
          {open ? "Cycle SVG " : "Cycle SVG "}
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Button>

        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
          <Paper elevation={4} style={{ padding: "10px", width: "200px" }}>
            <h3>{contents[contentIndex].title}</h3>
            <p>{contents[contentIndex].text}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCycleSVG}
              fullWidth
            >
              Cycle SVG
            </Button>
          </Paper>
        </Slide>
      </div>
    </ThemeProvider>
  );
};

export default SVGControls;
