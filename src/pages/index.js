import React from "react";
import LebanonBekaa from "./LebanonBekaa/LebanonBekaa";
import "./global.css";
import 'mapbox-gl/dist/mapbox-gl.css';

const IndexPage = () => {
  const mainContainerStyle = {
    height: "100%",
    width: "100%" ,
  };

  return (
    <main style={mainContainerStyle}>
      <title>Home Page</title>

      <LebanonBekaa />
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
