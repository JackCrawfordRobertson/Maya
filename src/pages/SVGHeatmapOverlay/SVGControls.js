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
    fontFamily: '"inter", sans-serif',
  },
  palette: {
    primary: {
      main: "#3498db",
      "&:hover": {
        backgroundColor: "#3498db",
      },
    },
  },
});

const keyParameters = [
  { color: "#AD1457", text: "> 50" },
  { color: "#F44336", text: "40 - 50" },
  { color: "#FF9800", text: "30 - 40" },
  { color: "#FFC107", text: "20 - 30" },
  { color: "#8BC34A", text: "10 - 20" },
  { color: "#009688", text: "5 - 10" },
  { color: "#156550", text: "< 5" },
  // ... Add more parameters if needed
];

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
    {
      title: "Simulation S11CC",
      text: " Increase of irrigation water demand based on spatial expansion in 2035 leading to an increase in groundwater abstractions, mainly from private wells.",
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
          style={{ marginBottom: "10px", width: "100%" }}
          fullWidth
        >
          {open ? "Cycle SVG " : "Cycle SVG "}
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Button>

        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
    <Paper elevation={4} style={{ padding: "10px", width: "200px" }}>
        <h3 style={{ marginTop: '10px', marginBottom: '5px' }}>{contents[contentIndex].title}</h3>
            <p>{contents[contentIndex].text}</p>
            <div>

            <h4 style={{ marginTop: '10px', marginBottom: '5px' }}>Drawdown (m)</h4>
            {keyParameters.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: item.color,
                      marginRight: "10px",
                    }}
                  ></div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
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
