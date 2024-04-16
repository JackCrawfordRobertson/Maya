import { useEffect } from "react";
import geojsonData1 from '../../data/simulationGeojson/S0';
import geojsonData2 from '../../data/simulationGeojson/S11';
import geojsonData3 from '../../data/simulationGeojson/S11CC';

const GeoJsonHeatmapOverlay = ({ map, currentGeoJsonIndex, opacity }) => {
    const layerID = "geojson-heatmap-layer";
    const sourceID = "geojson-heatmap-source";
    const geoJsonDataFiles = [geojsonData1, geojsonData2, geojsonData3];

    useEffect(() => {
        console.log('Current Opacity:', opacity);  // Log the opacity value whenever it changes

        if (!map) return;

        const addOrUpdateLayer = () => {
            if (!map.getSource(sourceID)) {
                // If the source does not exist, add both the source and the layer
                map.addSource(sourceID, {
                    type: "geojson",
                    data: geoJsonDataFiles[currentGeoJsonIndex]
                });

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
                        'fill-opacity': opacity
                    }
                });
            } else {
                // If the source exists, simply update the data and opacity
                map.getSource(sourceID).setData(geoJsonDataFiles[currentGeoJsonIndex]);
                map.setPaintProperty(layerID, 'fill-opacity', opacity);
            }
        };

        if (map.isStyleLoaded()) {
            addOrUpdateLayer();
        } else {
            map.on('load', addOrUpdateLayer);
        }

        return () => {
            if (map.getLayer(layerID)) {
                map.removeLayer(layerID);
                map.removeSource(sourceID);
                map.off('load', addOrUpdateLayer);

            }
        };
    }, [map, currentGeoJsonIndex, opacity]); // Add opacity to the dependency array

    return null;
};

export default GeoJsonHeatmapOverlay;
