// OverlayMap.js
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import * as d3 from "d3";

import S0 from '../../images/S0.svg';
import S11 from '../../images/S11.svg';
import S11CC from '../../images/S11CC.svg';

const SVG_COORDINATES = [36.305, 34.270];
const SVGs = [S0, S11, S11CC]; // Array of SVGs

const SVGHeatmapOverlay = ({ center, zoom, map, visibleSVG }) => {
    const markerRef = useRef(null);

    const geoReferenceWidthInMeters = 101000;
    const geoReferenceHeightInMeters = 101000;

    function getScale(n, m) {
        var center = map.getCenter();
        var zoom = map.getZoom();
        var tmp = 156543.03392 * Math.cos(center.lat * Math.PI / 180) / Math.pow(2, zoom);
        var meterSizeInPixelN = n / tmp;
        var meterSizeInPixelM = m / tmp;
        return [meterSizeInPixelN, meterSizeInPixelM];
    }

    function render() {
        if (!markerRef.current) return;  // Add this line to prevent errors if markerRef.current is null
        var pixelSizes = getScale(geoReferenceWidthInMeters, geoReferenceHeightInMeters);
        markerRef.current._element.style.width = pixelSizes[0] + "px";
        markerRef.current._element.style.height = pixelSizes[1] + "px";
    }

    useEffect(() => {
        if (!map) return;  // Ensure map is loaded

        const transitionDuration = 300;  // Transition duration in milliseconds

        // Fade out the current SVG using D3
        if (markerRef.current) {
            d3.select(markerRef.current.getElement().querySelector('img'))
              .transition()
              .duration(transitionDuration)
              .style("opacity", 0);
        }

        const timer = setTimeout(() => {
            // Remove old marker
            if (markerRef.current) {
                markerRef.current.remove();
            }

            // Create new marker
            const markerContainer = document.createElement("div");
            markerContainer.className = "marker";
            markerContainer.style.zIndex = "0";

            const svgImage = new Image();
            svgImage.src = SVGs[visibleSVG];
            svgImage.style.opacity = 0;  // Start with opacity 0
            markerContainer.appendChild(svgImage);

            markerRef.current = new mapboxgl.Marker(markerContainer).setLngLat(SVG_COORDINATES).addTo(map);

            // Fade in the new SVG using D3 after a short delay
            d3.select(svgImage)
              .transition()
              .delay(50)
              .duration(transitionDuration)
              .style("opacity", 0.4);

            map.on("viewreset", render);
            map.on("zoom", render);
            map.on("drag", render);
            map.on("rotate", render);
            render();

        }, transitionDuration);

        return () => {
            clearTimeout(timer);  // Cleanup timer on component unmount
            map.off("viewreset", render);
            map.off("zoom", render);
            map.off("drag", render);
            map.off("rotate", render);
        };
    }, [map, visibleSVG]);

    console.log("SVGHeatmapOverlay prop visibleSVG:", visibleSVG);

    return null;
};

export default SVGHeatmapOverlay;
