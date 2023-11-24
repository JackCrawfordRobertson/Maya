<p align="center">
  <a href="https://www.jack-roberson.com">
    <img alt="Main website" src="src/images/icon.png" width="60" />
  </a>
</p>
<h1 align="center">
Maya - Transforming understanding with information and data.
</h1>

# Project Overview

This project, named "Maya", aims to transform understanding with information and data. It's a React-based application that uses Gatsby for building the website and app.

The project is structured into several main parts:

- `src/data/`: This directory contains JavaScript files with data that the application uses. It also includes a `geojsonData/` subdirectory with GeoJSON data for different localities.

- `src/images/`: This directory contains images used throughout the application.

- `src/pages/`: This directory contains the main components of the application. Each file corresponds to a different page or feature of the app. Notable subdirectories include `Localities/`, `MainConsolidation/`, `Maps/`, `SVGHeatmapOverlay/`, `StartingZoom/`, and `Tutorial/`.

- `src/pages/Localities/InteractivePoints.js`: This file contains the interactive points for the localities.

- `src/pages/MainConsolidation/App.js`: This is the main application file.

- `src/pages/Maps/`: This directory contains files related to the map features of the application, including `BaseMap.js`, `Lebanon_Bekaa.css`, and `TownBorderMap.js`.

The project uses npm and Yarn as package managers. To start the development server, run `yarn develop`.

Please refer to the individual files and directories for more detailed information.