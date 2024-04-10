import React from "react";
import {Helmet} from "react-helmet";
import App from "./Home/App.js";
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

export const Head = () => (
    <Helmet>
        <title>Maya - Accessible Climate Knowledge</title>
        <meta
            name="description"
            content="Maya is a peer-reviewed platform designed to bridge the gap between specialists and non-specialists in the climate field. It offers a unique space where specialist data is synthesized and presented in an accessible, informative manner. Our goal is to empower non-specialists with reliable and understandable climate knowledge, facilitating informed decisions and greater awareness. Maya leverages advanced data visualization techniques and collaborative tools to make complex environmental information easily digestible for everyone."
        />
        <meta
            name="keywords"
            content="gatsby, climate communication, knowledge sharing, peer-reviewed content, specialist insights, environmental data, accessible information, climate change education, sustainable practices, community engagement, climate science, data visualization, environmental awareness, interdisciplinary collaboration, climate policy, environmental research"
        />
    </Helmet>
);
