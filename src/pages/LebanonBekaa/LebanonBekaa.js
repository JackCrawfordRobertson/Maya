import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import datasets from '../../geojsonData';
import SVGHeatmapOverlay from '../SVGHeatmapOverlay/SVGHeatmapOverlay';

import "./Lebanon_Bekaa.css";

mapboxgl.accessToken = "pk.eyJ1IjoiamFja3JvYiIsImEiOiJjanZ1bDBrdjUxYmgyNGJtczlxdWl3MzRuIn0.qla3sSgkkyxIkbYLvVsceA";

const LebanonBekaa = () => {
  const mapContainer = useRef(null);
  const [center, setCenter] = useState([36.105, 34.108]);
  const [zoom, setZoom] = useState(9);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    setTimeout(() => {
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
        // 1. Add the SVG heatmap layer first (this will be handled by the SVGHeatmapOverlay component)

        // 2. Add your GeoJSON layers next
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

        // 3. The town names from the Mapbox style should already be on top. If not, adjust in Mapbox Studio or use moveLayer.

        setMapInstance(map);
      });

    }, 0);
  }, []);

  return (
    <div className="map-wrapper">
      <div className="map-container" ref={mapContainer}></div>
      <SVGHeatmapOverlay center={center} zoom={zoom} map={mapInstance} />
    </div>
  );
};

export default LebanonBekaa;
