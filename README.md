# UNICEF Project Alpha Solar Estimator 🌞

> **An interactive web application to estimate solar energy potential for schools, health centers, and other facilities, using mapping technology and data-driven calculations.**

This project was developed to help UNICEF assess solar energy potential at various sites, estimate energy requirements, and calculate potential CO₂ savings and financial benefits. The app uses Google Maps for site mapping and allows users to interact with polygons for area estimation, input facility details, and calculate solar energy potential.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Map Integration**: Uses Google Maps for selecting locations and drawing polygons to estimate area.
- **Facility Details Input**: Accepts data related to site requirements and activity type.
- **Energy Calculation**: Calculates energy production, potential savings, and financial impact.
- **Save & Load Locations**: Stores user-selected locations and associated polygons for easy access.
- **Toggle Map View**: Switch between roadmap and satellite views for better analysis.
- **Responsive Design**: Optimized for both desktop and mobile viewing.
  
## Demo
Here is a screenshot of the application:
![Application UI](./UI.png)

## Installation

### Prerequisites

- **Node.js** (v14 or above)
- **npm** (comes with Node.js) or **yarn**
- A **Google Maps API Key** with the following libraries enabled:
  - Maps JavaScript API
  - Places API
  - Geocoding API

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/unicef-solar-estimator.git
   cd unicef-solar-estimator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the project root with your Google Maps API key:

   ```bash
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Run the Application**

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

- **Draw Polygons**: Use the map’s drawing tools to draw polygons around areas of interest to estimate the available rooftop or ground space.
- **Input Facility Data**: Fill in details about the site, including the estimated energy requirements and number of visitors.
- **Calculate Energy Potential**: After drawing the polygon, click "Calculate" to estimate the site's solar potential.
- **Save & Load Locations**: Save locations and reload them from the "Saved Locations" tab for quick access to previous analyses.

## Configuration

- **Google Maps API**: Ensure your Google Maps API key is stored in `.env` as `REACT_APP_GOOGLE_MAPS_API_KEY`.
- **Map View Options**: Users can toggle between roadmap and satellite views.

## Scripts

- **Start the Application**

  ```bash
  npm start
  ```

- **Run Tests**

  ```bash
  npm test
  ```

- **Build the Application**

  ```bash
  npm run build
  ```

- **Deploy the Application**

  Deploy your built application to a static site host, like GitHub Pages or Vercel.

- **Commit Files in Chunks** (using `push.sh` script)

  The provided `push.sh` script stages files in 40 small chunks with commit messages. Run this script to push your changes:

  ```bash
  ./push.sh
  ```

  Ensure `.env` and `push.sh` are in `.gitignore` before running the script.

## Technologies

- **React** with **Material-UI** for the user interface
- **Google Maps API** for mapping and polygon drawing
- **Axios** for handling API requests
- **JavaScript** for core application logic

## Contributing

If you wish to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a Pull Request.

## License

This project is licensed under the MIT License.