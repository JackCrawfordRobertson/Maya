import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import datasets from '../../geojsonData';
import SVGHeatmapOverlay from '../SVGHeatmapOverlay/SVGHeatmapOverlay';
import SVGControls from '../SVGHeatmapOverlay/SVGControls';

import S0 from '../../images/S0.svg';
import S11 from '../../images/S11.svg';
import "./Lebanon_Bekaa.css";

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const LebanonBekaa = () => {
  const mapContainer = useRef(null);
  const [center, setCenter] = useState([36.105, 34.108]);
  const [zoom, setZoom] = useState(9);
  const [mapInstance, setMapInstance] = useState(null);
  const [visibleSVG, setVisibleSVG] = useState(0); // State to track the visible SVG

  const SVGs = [S0, S11]; // Array of SVGs

  const cycleSVG = () => {
    console.log("Cycling SVGs");
    setVisibleSVG((prevSVG) => (prevSVG + 1) % SVGs.length);
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jackrob/clnuiw3az00oy01qp4m2j1dha",
      center: center,
      zoom: zoom,
    });

    map.on('move', () => {
      setCenter(map.getCenter().toArray());
      setZoom(map.getZoom());
    });

    map.on('load', () => {
      Object.entries(datasets).forEach(([key, data]) => {
        const sourceId = `${key}Source`;
        const layerId = `${key}Layer`;

        map.addSource(sourceId, {
          type: 'geojson',
          data: data
        });

        map.addLayer({
          id: layerId,
          type: 'fill',
          source: sourceId,
          layout: {},
          paint: {
            'fill-color': '#3496d3', 
            'fill-opacity': 0.6,
          }
        });
      });

      setMapInstance(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-wrapper">
      <div className="map-container" ref={mapContainer}></div>
      <SVGHeatmapOverlay center={center} zoom={zoom} map={mapInstance} visibleSVG={visibleSVG} />
      <SVGControls cycleSVG={cycleSVG} />
    </div>
  );
};

export default LebanonBekaa;
