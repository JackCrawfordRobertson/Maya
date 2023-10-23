import  { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import S0 from '../../images/S0.svg';

const SVG_COORDINATES = [36.305, 34.270];

const SVGHeatmapOverlay = ({ center, zoom, map }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const markerContainer = document.createElement("div");
    markerContainer.className = "marker";
    markerContainer.style.zIndex = "0"; // Set the z-index to 0 to place it below other layers

    const svgImage = new Image();
    svgImage.src = S0;
    svgImage.style.opacity = '0.5';
    markerContainer.appendChild(svgImage);

    if (!markerRef.current) {
      markerRef.current = new mapboxgl.Marker(markerContainer).setLngLat(SVG_COORDINATES).addTo(map);
    }

    const geoReferenceWidthInMeters = 101000;
    const geoReferenceHeightInMeters = 101000;

    function getScale(n, m) {
      var center = map.getCenter();
      var zoom = map.getZoom();
      var tmp =
        156543.03392 * Math.cos(center.lat * Math.PI / 180) / Math.pow(2, zoom);
      var meterSizeInPixelN = n / tmp;
      var meterSizeInPixelM = m / tmp;
      return [meterSizeInPixelN, meterSizeInPixelM];
    }

    function render() {
      var pixelSizes = getScale(
        geoReferenceWidthInMeters,
        geoReferenceHeightInMeters
      );
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
  }, [map]); // Only depend on the map instance

  return null;
};

export default SVGHeatmapOverlay;
