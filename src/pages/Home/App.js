import React, {useState} from "react";
import BaseMap from "../Map/BaseMap";
import WidgetConsolidation from "../Widget/WidgetConsolidation";
import GeoJsonHeatmapOverlay from "../GeoHeatmap/GeoJsonHeatmapOverlay";
import DevZoom from "../StartingZoom/DevZoom";
import ControlButtons from "../Map/MapNavigation/ControlButtons";
import ZoomFrontLoadScreen from "../StartingZoom/ZoomFrontLoadScreen";

//Lebanon
import geojsonData1 from "../../data/Lebanon/S0";
import geojsonData2 from "../../data/Lebanon/S11";
import geojsonData3 from "../../data/Lebanon/S11CC";

//Pacistan
import geojsonData4 from "../../data/Pakistan/Sim1";
import geojsonData5 from "../../data/Pakistan/Sim2";
import geojsonData6 from "../../data/Pakistan/Sim3";

const App = () => {
    const [ center, setCenter ] = useState([ 36.05, 34.27 ]); // Default center
    const [ zoom, setZoom ] = useState(2); // Default zoom level for an "outer space" effect
    const [ map, setMap ] = useState(null);
    const [ isZoomCompleted, setIsZoomCompleted ] = useState(false);
    const [ currentGeoJsonIndex, setCurrentGeoJsonIndex ] = useState(0);
    const [ showZoomFrontLoadScreen, setShowZoomFrontLoadScreen ] = useState(true);

    //data sets
    const dataSetsLebanon = [ geojsonData1, geojsonData2, geojsonData3 ];
    const dataSetsPakistan = [ geojsonData4, geojsonData5, geojsonData6 ];
    const [ activeDataSet, setActiveDataSet ] = useState("lebanon"); // Default to 'lebanon'

    const [ opacity, setOpacity ] = useState(0.43); // Default opacity

    const cycleSVG = () => {
        setCurrentGeoJsonIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    const handleMove = (newCenter, newZoom) => {
        setCenter(newCenter);
        setZoom(newZoom);
    };

    const onMapLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    // Updated function to handle zoom from DevZoom component
    const handleZoomLebanon = () => {
        if (map) {
            // Instantly move to a broader view (simulate "outer space")
            map.jumpTo({
                center: [ 0, 0 ], // Initial coordinates for the broader view
                zoom: 2, // Initial zoom level for an "outer space" effect
            });

            // Animate to the final destination
            setActiveDataSet("lebanon"); // Set active data set to Lebanon
            map.flyTo({
                center: [ 36.05, 34.27 ], // Lebanon coordinates
                zoom: 9,
                essential: true,
                duration: 5000,
            });
        }
    };

    const handleZoomPakistan = () => {
        if (map) {
            // Optionally, jump to a neutral position before flying to the new destination
            map.jumpTo({
                center: [ 0, 0 ], // You can omit this step if it's not needed
                zoom: 2, // Or any neutral zoom level
            });

            // Animate to the final destination in Pakistan
            setActiveDataSet("pakistan"); // Set active data set to Pakistan
            map.flyTo({
                center: [ 73.3451, 31.3753 ],
                zoom: 8,
                essential: true,
                duration: 5000,
            });
        }
    };

    return (
        <div className="app" style={{position: "relative"}}>
            <BaseMap center={center} zoom={zoom} onMove={handleMove} setMap={onMapLoad} />
            <ControlButtons map={map} activeDataSet={activeDataSet} />

            {map && activeDataSet === "lebanon" && (
                <GeoJsonHeatmapOverlay
                    map={map}
                    dataSets={dataSetsLebanon}
                    currentGeoJsonIndex={currentGeoJsonIndex}
                    opacity={opacity}
                    identifier="lebanon"
                />
            )}

            {map && activeDataSet === "pakistan" && (
                <GeoJsonHeatmapOverlay
                    map={map}
                    dataSets={dataSetsPakistan}
                    currentGeoJsonIndex={currentGeoJsonIndex}
                    opacity={opacity}
                    identifier="pakistan"
                />
            )}

            {map && (
                <WidgetConsolidation
                    map={map}
                    isZoomCompleted={isZoomCompleted}
                    cycleSVG={cycleSVG}
                    setOpacity={setOpacity}
                />
            )}

            {/* <DevZoom onZoom={handleZoomPakistan} /> */}

            {showZoomFrontLoadScreen && (
                <ZoomFrontLoadScreen
                    onZoomLebanon={handleZoomLebanon}
                    onZoomPakistan={handleZoomPakistan}
                    onOtherAction={() => setShowZoomFrontLoadScreen(false)}
                />
            )}
        </div>
    );
};

export default App;
