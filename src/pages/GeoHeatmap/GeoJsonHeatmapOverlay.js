import { useEffect } from "react";

const GeoJsonHeatmapOverlay = ({ map, dataSets, currentGeoJsonIndex, opacity, identifier }) => {
    const layerID = `geojson-heatmap-layer-${identifier}`;
    const sourceID = `geojson-heatmap-source-${identifier}`;

    useEffect(() => {
        if (!map) return;

        const initializeLayer = () => {
            if (!map.getSource(sourceID)) {
                map.addSource(sourceID, {
                    type: "geojson",
                    data: dataSets[currentGeoJsonIndex]
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
                            'Value3', '#8BC34A',
                            'Value4', '#FFC107',
                            'Value5', '#FF9800',
                            'Value6', '#F44336',
                            'Value7', '#AD1457',
                            '#000'  // Default color
                        ],
                        'fill-opacity': opacity,
                        'fill-opacity-transition': { duration: 300 }
                    }
                });
            }
        };

        const updateData = () => {
            if (map.getSource(sourceID)) {
                map.getSource(sourceID).setData(dataSets[currentGeoJsonIndex]);
            }
        };

        if (map.isStyleLoaded()) {
            initializeLayer();
            updateData();
        } else {
            map.on('load', initializeLayer);
        }

        return () => {
            if (map.getLayer(layerID)) {
                map.removeLayer(layerID);
                map.removeSource(sourceID);
                map.off('load', initializeLayer);
            }
        };
    }, [map, dataSets, currentGeoJsonIndex, identifier]);

    useEffect(() => {
        if (map && map.getLayer(layerID)) {
            console.log('Current Opacity:', opacity);
            map.setPaintProperty(layerID, 'fill-opacity', opacity);
        }
    }, [map, opacity, layerID]);

    return null;
};

export default GeoJsonHeatmapOverlay;
