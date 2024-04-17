import { useEffect } from "react";
import geojsonData1 from '../../data/simulationGeojson/S0';
import geojsonData2 from '../../data/simulationGeojson/S11';
import geojsonData3 from '../../data/simulationGeojson/S11CC';

const GeoJsonHeatmapOverlay = ({ map, currentGeoJsonIndex, opacity }) => {
    const layerID = "geojson-heatmap-layer";
    const sourceID = "geojson-heatmap-source";
    const geoJsonDataFiles = [geojsonData1, geojsonData2, geojsonData3];

    useEffect(() => {
        if (!map) return;

        // Function to initialize the source and layer
        const initializeLayer = () => {
            if (!map.getSource(sourceID)) {
                map.addSource(sourceID, {
                    type: "geojson",
                    data: geoJsonDataFiles[currentGeoJsonIndex]
                });
            }

            if (!map.getLayer(layerID)) {
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
                            '#000'  // Default color
                        ],
                        'fill-opacity': opacity,
                        'fill-opacity-transition': { duration: 300 }
                    }
                });
            }
        };

        // Update the data only when currentGeoJsonIndex changes
        const updateData = () => {
            if (map.getSource(sourceID)) {
                map.getSource(sourceID).setData(geoJsonDataFiles[currentGeoJsonIndex]);
            }
        };

        // Listen for when the map is loaded to initialize the layer
        if (map.isStyleLoaded()) {
            initializeLayer();
            updateData();
        } else {
            map.on('load', initializeLayer);
        }

        // Effect cleanup
        return () => {
            if (map.getLayer(layerID)) {
                map.removeLayer(layerID);
                map.removeSource(sourceID);
                map.off('load', initializeLayer);
            }
        };
    }, [map, currentGeoJsonIndex]); // Dependencies for initializing and updating data

    // Separate effect for handling opacity changes efficiently
    useEffect(() => {
        if (map && map.getLayer(layerID)) {
            console.log('Current Opacity:', opacity);  // Log the opacity value when it changes
            map.setPaintProperty(layerID, 'fill-opacity', opacity);
        }
    }, [map, opacity]); // Dependency on opacity to update it smoothly

    return null;
};

export default GeoJsonHeatmapOverlay;
