import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import datasets from "../../geojsonData";
import SVGControls from "../SVGHeatmapOverlay/SVGControls";
import S0 from "../../images/S0.svg";
import S11 from "../../images/S11.svg";
import "./Lebanon_Bekaa.css";

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const SVG_COORDINATES = [36.305, 34.27];
const SVGs = [S0, S11];
const geoReferenceWidthInMeters = 101000;
const geoReferenceHeightInMeters = 101000;

const LebanonBekaa = () => {
    const mapContainer = useRef(null);
    const [center, setCenter] = useState([36.105, 34.108]);
    const [zoom, setZoom] = useState(9);
    const [mapInstance, setMapInstance] = useState(null);
    const [visibleSVG, setVisibleSVG] = useState(0);
    const [marker, setMarker] = useState(null);

    const getScale = () => {
        const center = mapInstance.getCenter();
        const zoom = mapInstance.getZoom();
        const tmp = 156543.03392 * Math.cos(center.lat * Math.PI / 180) / Math.pow(2, zoom);
        const meterSizeInPixelN = geoReferenceWidthInMeters / tmp;
        const meterSizeInPixelM = geoReferenceHeightInMeters / tmp;
        return [meterSizeInPixelN, meterSizeInPixelM];
    };

    const render = () => {
        const pixelSizes = getScale();
        const markerElement = marker.getElement();
        markerElement.style.width = pixelSizes[0] + "px";
        markerElement.style.height = pixelSizes[1] + "px";
    };

    const cycleSVG = () => {
        console.log("Cycling SVGs");
        setVisibleSVG((prevSVG) => (prevSVG + 1) % SVGs.length);
    };

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/jackrob/clo8dumuh00v301pkd1ca12j0",
            center: center,
            zoom: zoom,
        });

        map.on("move", () => {
            setCenter(map.getCenter().toArray());
            setZoom(map.getZoom());
        });

        map.on("load", () => {
            fetch(SVGs[visibleSVG])
                .then(response => response.text())
                .then(svgText => {
                    const svgContainer = document.createElement('div');
                    svgContainer.style.width = '400px';
                    svgContainer.style.height = '400px';
                    svgContainer.innerHTML = svgText;

                    const svgMarker = new mapboxgl.Marker(svgContainer)
                        .setLngLat(SVG_COORDINATES)
                        .addTo(map);

                    setMarker(svgMarker);

                    Object.entries(datasets).forEach(([key, data]) => {
                        const sourceId = `${key}Source`;
                        const layerId = `${key}Layer`;

                        map.addSource(sourceId, {
                            type: "geojson",
                            data: data,
                        });

                        map.addLayer({
                            id: layerId,
                            type: "fill",
                            source: sourceId,
                            layout: {},
                            paint: {
                                "fill-color": "#3496d3",
                                "fill-opacity": 0.6,
                            },
                        });
                    });

                    setMapInstance(map);
                });
        });

        return () => {
            if (map) {
                map.off("move");
            }
        };
    }, []);

    useEffect(() => {
        if (marker && mapInstance) {
            fetch(SVGs[visibleSVG])
                .then(response => response.text())
                .then(svgText => {
                    const svgContainer = marker.getElement();
                    svgContainer.innerHTML = svgText;
                    mapInstance.on("viewreset", render);
                    mapInstance.on("zoom", render);
                    mapInstance.on("drag", render);
                    mapInstance.on("rotate", render);
                    render();
                });
        }

        return () => {
            if (mapInstance) {
                mapInstance.off("viewreset", render);
                mapInstance.off("zoom", render);
                mapInstance.off("drag", render);
                mapInstance.off("rotate", render);
            }
        };
    }, [visibleSVG, marker, mapInstance]);

    return (
        <div className="map-wrapper">
            <div className="map-container" ref={mapContainer}></div>
            <SVGControls cycleSVG={cycleSVG} />
        </div>
    );
};

export default LebanonBekaa;
