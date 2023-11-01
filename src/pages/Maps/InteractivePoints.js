import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const InteractivePoints = ({ map }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const hoveredPointIdRef = useRef(null); // Create a ref to hold the hovered point id

  const animateCircleRadius = (
    timestamp,
    startTimestamp,
    startRadius,
    endRadius,
    pointId
  ) => {
    const progress = (timestamp - startTimestamp) / 2000; // Calculate progress
    if (progress < 1) {
      const currentRadius = startRadius + (endRadius - startRadius) * progress;
      map.setPaintProperty("points", "circle-radius", [
        "case",
        ["==", ["id"], pointId],
        currentRadius,
        6, // default radius for other points
      ]);
      requestAnimationFrame((newTimestamp) =>
        animateCircleRadius(
          newTimestamp,
          startTimestamp,
          startRadius,
          endRadius,
          pointId
        )
      );
    } else {
      map.setPaintProperty("points", "circle-radius", [
        "case",
        ["==", ["id"], pointId],
        endRadius,
        6, // default radius for other points
      ]);
    }
  };

  useEffect(() => {
    if (!map) return;

    const handleMapLoad = () => {
      try {
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                id: 1,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.2017849, 33.9912322], // Your provided coordinates
                },
                properties: {
                  title: "Ain Bourday",
                  description: "Description for Point 1",
                },
              },

              {
                id: 2,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.1723639, 33.9910732], // Your provided coordinates
                },
                properties: {
                  title: "Douris",
                  description: "Description for Point 2",
                },
              },

              {
                id: 3,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.0288086, 33.8582632],
                },
                properties: {
                  title: "Ali el Nahri",
                  description: "Description for Point 2",
                },
              },

              {
                id: 4,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.0121695, 33.8490905],
                },
                properties: {
                  title: "Riyak",
                  description: "Description for Point 2",
                },
              },

              {
                id: 5,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [35.9951409, 33.8479189],
                },
                properties: {
                  title: "Haouch Hala",
                  description: "Description for Point 2",
                },
              },

              {
                id: 6,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.4060488, 34.2434572],
                },
                properties: {
                  title: "Fekha",
                  description: "Description for Point 2",
                },
              },

              {
                id: 7,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.3914808, 34.25137],
                },
                properties: {
                  title: "Khirbet Qanafar",
                  description: "Description for Point 2",
                },
              },

              {
                id: 8,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.2017849, 33.9912322], // Your provided coordinates
                },
                properties: {
                  title: "Ain Bourday",
                  description: "Description for Point 1",
                },
              },

              {
                id: 9,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.1723639, 33.9910732], // Your provided coordinates
                },
                properties: {
                  title: "Douris",
                  description: "Description for Point 2",
                },
              },

              {
                id: 10,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.0288086, 33.8582632],
                },
                properties: {
                  title: "Ali el Nahri",
                  description: "Description for Point 2",
                },
              },

              {
                id: 11,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.0121695, 33.8490905],
                },
                properties: {
                  title: "Riyak",
                  description: "Description for Point 2",
                },
              },

              {
                id: 12,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [35.9951409, 33.8479189],
                },
                properties: {
                  title: "Haouch Hala",
                  description: "Description for Point 2",
                },
              },

              {
                id: 13,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.4060488, 34.2434572],
                },
                properties: {
                  title: "Fekha",
                  description: "Description for Point 2",
                },
              },

              {
                id: 14,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.3914808, 34.25137],
                },
                properties: {
                  title: "Maalqa",
                  description: "Description for Point 2",
                },
              },

              {
                id: 15,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.32138838, 34.1771722],
                },
                properties: {
                  title: "Moqraq",
                  description: "Description for Point 2",
                },
              },

              {
                id: 16,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.3170072, 34.1754875],
                },
                properties: {
                  title: "Toufiqiyeh",
                  description: "Description for Point 2",
                },
              },

              {
                id: 17,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.3665275, 34.212846],
                },
                properties: {
                  title: "Nabi Osman",
                  description: "Description for Point 2",
                },
              },

              {
                id: 18,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.4181301, 34.2604164],
                },
                properties: {
                  title: "Ras Baalbek",
                  description: "Description for Point 2",
                },
              },

              {
                id: 19,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.3539046, 34.1969106],
                },
                properties: {
                  title: "Laboueh",
                  description: "Description for Point 2",
                },
              },

              {
                id: 20,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.3199309, 34.2412865],
                },
                properties: {
                  title: "Zabboud",
                  description: "Description for Point 2",
                },
              },

              {
                id: 21,
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [36.3199309, 34.2412865],
                },
                properties: {
                  title: "Bejjejeh",
                  description: "Description for Point 2",
                },
              },
            ],
          },
        });

        // Wait for the source to load before adding the layer
        map.on("sourcedata", function onSourceData(e) {
          if (e.sourceId === "points" && map.isSourceLoaded("points")) {
            map.off("sourcedata", onSourceData);
            map.addLayer({
              id: "points",
              type: "circle",
              source: "points",
              paint: {
                "circle-radius": 6,
                "circle-color": "#B42222",
              },
            });
          }
        });

        map.on('mouseenter', 'points', (e) => {
          map.getCanvas().style.cursor = 'pointer';
          if (e.features.length > 0) {
            const { id } = e.features[0];
            hoveredPointIdRef.current = id;
            requestAnimationFrame((timestamp) => animateCircleRadius(timestamp, timestamp, 6, 12, id));
          }
        });
        
        map.on('mouseleave', 'points', () => {
          map.getCanvas().style.cursor = '';
          if (hoveredPointIdRef.current !== null) {
            const id = hoveredPointIdRef.current;
            requestAnimationFrame((timestamp) => animateCircleRadius(timestamp, timestamp, 12, 6, id));
            hoveredPointIdRef.current = null;  // Reset the hovered point id
          }
        });

        map.on("click", "points", (e) => {
          if (e.features.length > 0) {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;
            const title = e.features[0].properties.title;
            setSelectedPoint({ coordinates, title, description });
          }
        });
      } catch (error) {
        console.error("Error adding source and layer:", error);
      }
    };

    if (map.isStyleLoaded()) {
      handleMapLoad();
    } else {
      map.on("load", handleMapLoad);
    }

    return () => {
      map.off("load", handleMapLoad); // Remove the 'load' event listener
      if (map.getLayer("points")) {
        map.removeLayer("points");
        map.removeSource("points");
      }
    };
  }, [map]);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        <Slide direction="left" in={!!selectedPoint} mountOnEnter unmountOnExit>
          <Paper elevation={4} style={{ padding: "10px", width: "200px" }}>
            <h3>{selectedPoint?.title}</h3>
            <p>{selectedPoint?.description}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Button
                startIcon={<ChevronLeftIcon />}
                onClick={() => {
                  /* Navigate to previous point */
                }}
              >
                Prev
              </Button>
              <Button
                endIcon={<ChevronRightIcon />}
                onClick={() => {
                  /* Navigate to next point */
                }}
              >
                Next
              </Button>
            </div>
          </Paper>
        </Slide>
      </div>
    </ThemeProvider>
  );
};

export default InteractivePoints;
