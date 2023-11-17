//App.js
import React, {useState, useContext} from "react";
import BaseMap from "../Maps/BaseMap";
import SVGHeatmapOverlay from "../SVGHeatmapOverlay/SVGHeatmapOverlay";
import SVGControls from "../SVGHeatmapOverlay/SVGControls";
import TownBorderMap from "../Maps/TownBorderMap";
import ZoomButton from "../StartingZoom/ZoomButton";
import Joyride, {STATUS} from "react-joyride";

const App = () => {
    // Initial center set to show the whole world
    const [ center, setCenter ] = useState([ 0, 0 ]);

    // Initial zoom set to show the whole world
    const [ zoom, setZoom ] = useState(2);

    const [ visibleSVG, setVisibleSVG ] = useState(0);
    const [ map, setMap ] = useState(null);

    const [ buttonsDisabled, setButtonsDisabled ] = useState(true);

    // New state variable to track whether zoom has completed
    const [ isZoomCompleted, setIsZoomCompleted ] = useState(false);

    const cycleSVG = () => {
        setVisibleSVG((prevSVG) => (prevSVG + 1) % 3);
    };

    const handleMove = (newCenter, newZoom) => {
        setCenter(newCenter);
        setZoom(newZoom);
    };

    //Tutorial

    const [ runTour, setRunTour ] = useState(false); // For controlling whether the tour is running
    const [ stepIndex, setStepIndex ] = useState(0); // For tracking the current step of the tour
    const [ hasInteracted, setHasInteracted ] = useState(false); // Declare hasInteracted state

    const steps = [
        {
            target: ".heatmap-overlay", // CSS Selector for the element to target
            content: "This is an important feature!",
        },
    ];

    const handleJoyrideCallback = (data) => {
        const {status, type} = data;

        if ([ STATUS.FINISHED, STATUS.SKIPPED ].includes(status)) {
            setRunTour(false);
        }
        else if (type === "beacon:click" || type === "tooltip:close") {
            setHasInteracted(true);
        }
    };

    const zoomToFocus = () => {
        if (map) {
            map.flyTo({
                center: [ 36.305, 34.27 ],
                zoom: 9,
                speed: 0.9,
                curve: 2,
                easing(t) {
                    return t;
                },
            });

            // Delay the attachment of the event listener
            setTimeout(() => {
                map.once("moveend", function () {
                    console.log("Zoom animation completed"); // Log to console
                    setButtonsDisabled(false); // Re-enable buttons
                    setIsZoomCompleted(true); // Set isZoomCompleted to true once zoom completes
                    setRunTour(true); // Start the Joyride tour
                });
            }, 500); // Adjust the delay time as necessary
        }
    };

    return (
        <div className="app" style={{position: "relative"}}>
            <Joyride
                steps={steps}
                run={runTour && !hasInteracted}
                stepIndex={stepIndex}
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        arrowColor: "#e3ffeb",
                        backgroundColor: "#ffffff",
                        overlayColor: "#424242",
                        primaryColor: "#00bf43",
                        textColor: "#000000",
                        width: "20vw",
                        zIndex: 1000,
                    },
                }}
            />

            <div style={{pointerEvents: isZoomCompleted ? "all" : "none"}}>
                <BaseMap center={center} zoom={zoom} onMove={handleMove} setMap={setMap} />
            </div>

            <div style={{pointerEvents: isZoomCompleted ? "all" : "none"}}>
                {isZoomCompleted && <SVGHeatmapOverlay center={center} zoom={zoom} visibleSVG={visibleSVG} map={map} />}
            </div>

            <div style={{pointerEvents: isZoomCompleted ? "all" : "none"}}>
            <TownBorderMap center={center} zoom={zoom} onMove={handleMove} isZoomCompleted={isZoomCompleted} />
            </div>

            <div style={{pointerEvents: isZoomCompleted ? "all" : "none"}}>
                {isZoomCompleted && <SVGControls cycleSVG={cycleSVG} disabled={buttonsDisabled} />}
            </div>

            <ZoomButton onZoom={zoomToFocus} disabled={buttonsDisabled} />
        </div>
    );
};

export default App;
