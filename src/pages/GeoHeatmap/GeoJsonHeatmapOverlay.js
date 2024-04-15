// GeoJsonHeatmapOverlay.js
import { useEffect } from "react";
// Import the three GeoJSON data files
import geojsonData1 from '../../data/simulationGeojson/S0';
import geojsonData2 from '../../data/simulationGeojson/S11';
import geojsonData3 from '../../data/simulationGeojson/S11CC';

const GeoJsonHeatmapOverlay = ({ map, currentGeoJsonIndex }) => {
    const layerID = "geojson-heatmap-layer"; // ID for the heatmap layer
    const sourceID = "geojson-heatmap-source"; // ID for the GeoJSON source
    // Organize your GeoJSON data into an array
    const geoJsonDataFiles = [geojsonData1, geojsonData2,geojsonData3];

    useEffect(() => {
        if (!map) return; // Ensure map is loaded

        const addHeatmapLayer = () => {
            // Ensure there's no existing source or layer with the same ID
            if (map.getSource(sourceID)) {
                map.removeLayer(layerID);
                map.removeSource(sourceID);
            }

            // Use the currentGeoJsonIndex to select the GeoJSON data to use
            const currentGeoJsonData = geoJsonDataFiles[currentGeoJsonIndex] || geoJsonDataFiles[0];

            // Add the GeoJSON source with the selected data
            map.addSource(sourceID, {
                type: "geojson",
                data: currentGeoJsonData
            });

            // Add the layer with the source
            map.addLayer({
                id: layerID,
                type: "fill",
                source: sourceID,
                paint: {
                    'fill-color': [
                        'match',
                        ['get', 'fieldName'],
                        'Value1', '#156550',
                        'Value2', '#009688',
                        'Value3', '#8bc34a',
                        'Value4', '#ffc107',
                        'Value5', '#ffc107',
                        'Value6', '#ffc107',
                        'Value7', '#ffc107',
                        '#000' // Default color
                    ],
                    'fill-opacity': 0.43
                },
            });
        };

        if (map.isStyleLoaded()) {
            addHeatmapLayer();
        } else {
            map.on('load', addHeatmapLayer);
        }

        return () => {
            // Clean up by removing the layer and source when the component unmounts or updates
            if (map.getLayer(layerID)) {
                map.removeLayer(layerID);
                map.removeSource(sourceID);
            }
        };
    }, [map, currentGeoJsonIndex]); // React to changes in map and currentGeoJsonIndex

    return null;
};

export default GeoJsonHeatmapOverlay;
