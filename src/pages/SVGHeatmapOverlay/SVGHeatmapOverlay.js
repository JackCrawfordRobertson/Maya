import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import S0 from '../../images/S0.svg';
import S11 from '../../images/S11.svg';

const SVG_COORDINATES = [36.305, 34.270];
const SVGs = [S0, S11]; // Array of SVGs

const SVGHeatmapOverlay = ({ center, zoom, map, visibleSVG }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const markerContainer = document.createElement("div");
    markerContainer.className = "marker";
    markerContainer.style.zIndex = "0";

    const svgImage = new Image();
    svgImage.src = SVGs[visibleSVG];
    svgImage.style.opacity = '0.5';
    markerContainer.appendChild(svgImage);

    if (markerRef.current) {
      markerRef.current.remove(); // Remove the old marker
    }
    markerRef.current = new mapboxgl.Marker(markerContainer).setLngLat(SVG_COORDINATES).addTo(map);

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
      var pixelSizes = getScale(geoReferenceWidthInMeters, geoReferenceHeightInMeters);
      markerContainer.style.width = pixelSizes[0] + "px";
      markerContainer.style.height = pixelSizes[1] + "px";
    }

    map.on("viewreset", render);
    map.on("zoom", render);
    map.on("drag", render);
    map.on("rotate", render);
    render();

    return () => {
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
