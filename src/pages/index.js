//index.js
import React from "react";
import MapComponent from "./MainConsolidation/MapComponent";
import "./global.css";
import "mapbox-gl/dist/mapbox-gl.css";

const IndexPage = () => {
    const mainContainerStyle = {
        height: "100%",
        width: "100%",
    };

    return (
        <main style={mainContainerStyle}>
            <MapComponent />
        </main>
    );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
