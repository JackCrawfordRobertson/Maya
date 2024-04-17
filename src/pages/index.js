import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import App from "./Home/App.js";
import "./global.css";
import "mapbox-gl/dist/mapbox-gl.css";

const IndexPage = () => {
    useEffect(() => {
        const adjustVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // Add event listener to adjust viewport height on resize
        window.addEventListener('resize', adjustVH);
        
        // Call once to set initial viewport height
        adjustVH();

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', adjustVH);
        };
    }, []);

    return (
        <main style={{ height: "100%", width: "100%" }}>
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
