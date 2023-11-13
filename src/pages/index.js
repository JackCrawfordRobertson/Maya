//index.js
import React from "react";
import App from "./MainConsolidation/App.js";
import "./global.css";
import "mapbox-gl/dist/mapbox-gl.css";

const IndexPage = () => {
    const mainContainerStyle = {
        height: "100%",
        width: "100%",
    };

    return (
        <main style={mainContainerStyle}>
            <App />
        </main>
    );
};

export default IndexPage;

export const Head = () => <title>Maya</title>;
