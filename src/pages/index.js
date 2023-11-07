import React from "react";
import MapComponent from "./MainConsolidation/MapComponent";
import "./global.css";

const IndexPage = () => {
  const mainContainerStyle = {
    height: "100%",
    width: "100%" ,
  };

  return (
    <main style={mainContainerStyle}>
      <title>Home Page</title>

      <MapComponent />
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
