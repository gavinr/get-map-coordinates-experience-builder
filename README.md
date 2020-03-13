# Get Map Coordinates - Experience Builder Widget

Example Experience Builder widget showing how to display the latitude and longitude, scale, and zoom level of the map.

[![Screenshot](https://github.com/gavinr/get-map-coordinates-experience-builder/raw/master/get-map-coordinates.gif)](https://gavinr.github.io/get-map-coordinates-experience-builder/)

[(Settings Panel)](https://github.com/gavinr/get-map-coordinates-experience-builder/raw/master/screencast-settings.mp4)

## Quick Start - Download

1. [Download](https://developers.arcgis.com/downloads/apis-and-sdks?product=arcgis-experience-builder) and unzip [Experience Builder Developer Edition](https://developers.arcgis.com/experience-builder/).
2. Download the latest [release](https://github.com/gavinr/get-map-coordinates-experience-builder/releases) from this repository.
3. Unzip the downloaded files, and copy the `get-map-coordinates` folder into the `client\your-extensions\widgets\get-map-coordinates` folder of the extracted Experience Builder files.

## Quick Start - Git

1. [Download](https://developers.arcgis.com/downloads/apis-and-sdks?product=arcgis-experience-builder) and unzip [Experience Builder Developer Edition](https://developers.arcgis.com/experience-builder/).
2. Open a new terminal window and browse to the `client` folder.
3. `git clone https://github.com/gavinr/get-map-coordinates-experience-builder`
4. `npm ci`
5. `npm start`
6. Start Experience Builder server per the instructions (in a separate terminal, `cd server`, `npm ci`, `npm start`)

## Development

1. Open the `client` folder as a project in VS Code (or similar code editor).
1. Make sure *both* scripts are running (in the `server` folder and `client`) folder).
1. Every time you make a change to your widget, it will be re-built with webpack automatically.
