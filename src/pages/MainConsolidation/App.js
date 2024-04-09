// App.js
import React, {useState} from "react";
import BaseMap from "../Maps/BaseMap";
import SVGHeatmapOverlay from "../SVGHeatmapOverlay/SVGHeatmapOverlay";
import SVGControls from "../SVGHeatmapOverlay/SVGControls";
import TownBorderMap from "../Maps/TownBorderMap";
import DevZoom from "../StartingZoom/DevZoom";
import ZoomFrontLoadScreen from "../StartingZoom/index";
// import TutorialJoyride from "../Tutorial/TutorialJoyride"; // Adjust the path as necessary

const App = () => {
    const [ center, setCenter ] = useState([ 0, 0 ]);
    const [ zoom, setZoom ] = useState(3);
    const [ visibleSVG, setVisibleSVG ] = useState(0);
    const [ map, setMap ] = useState(null);
    const [ buttonsDisabled, setButtonsDisabled ] = useState(true);
    const [ isZoomCompleted, setIsZoomCompleted ] = useState(false);
    const [ showZoomFrontLoad, setShowZoomFrontLoad ] = useState(true); // Add this line

    const cycleSVG = () => {
        setVisibleSVG((prevSVG) => (prevSVG + 1) % 3);
    };

    const handleMove = (newCenter, newZoom) => {
        if (center[0] !== newCenter[0] || center[1] !== newCenter[1] || zoom !== newZoom) {
            setCenter(newCenter);
            setZoom(newZoom);
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

            setTimeout(() => {
                map.once("moveend", function () {
                    console.log("Zoom animation completed");
                    setButtonsDisabled(false);
                    setIsZoomCompleted(true);
                });
            }, 500);
        }
    };

    return (
        <div className="app" style={{position: "relative"}}>
            {/* <TutorialJoyride /> */}

            <div style={{pointerEvents: isZoomCompleted ? "all" : "none"}}>
                <BaseMap center={center} zoom={zoom} onMove={handleMove} setMap={setMap} />
            </div>

            <div style={{pointerEvents: isZoomCompleted ? "all" : "none"}}>
                {isZoomCompleted && <SVGHeatmapOverlay center={center} zoom={zoom} visibleSVG={visibleSVG} map={map} />}
            </div>

            <div style={{pointerEvents: isZoomCompleted ? "all" : "none"}}>
                {isZoomCompleted && (
                    <TownBorderMap center={center} zoom={zoom} onMove={handleMove} isZoomCompleted={isZoomCompleted} />
                )}
            </div>

            {/* <div style={{pointerEvents: isZoomCompleted ? "all" : "none"}}>
                {isZoomCompleted && <SVGControls cycleSVG={cycleSVG} disabled={buttonsDisabled} />}
            </div> */}

            {/* DevZoom component */}

            <DevZoom onZoom={zoomToFocus} disabled={buttonsDisabled} />

            {/* Production component */}

            {/* {showZoomFrontLoad && <ZoomFrontLoadScreen onZoom={zoomToFocus} onOtherAction={() => setShowZoomFrontLoad(false)} />} */}
        </div>
    );
};

export default App;
