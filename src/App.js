// App.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import Map from "./components/Map";
import Results from "./components/Results";
import SavedLocations from "./components/SavedLocations";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [results, setResults] = useState(null);
  const [selectedArea, setSelectedArea] = useState(0);
  const [savedLocations, setSavedLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const storedLocations =
      JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(storedLocations);
  }, []);

  const handleCalculate = (area) => {
    const peakSunHours = 6; // Average value from the screenshots
    const panelEfficiency = 0.75; // Efficiency factor
    const areaPerPanel = 1.7; // Updated area for one panel (m²)
    const annualCO2SavingsFactor = 0.82; // CO₂ savings factor (kg/kWh)
    const pricePerKWh = 0.1; // Annual earnings (USD per kWh)

    const calculateResults = (area) => {
      const numberOfPanels = Math.ceil(area / areaPerPanel);
      const dailyEnergyProduction =
        numberOfPanels * peakSunHours * panelEfficiency;
      const annualEnergyProduction = dailyEnergyProduction * 365;
      const co2Savings = annualEnergyProduction * annualCO2SavingsFactor;
      const annualEarnings = annualEnergyProduction * pricePerKWh;

      return {
        numberOfPanels,
        dailyEnergyProduction: dailyEnergyProduction.toFixed(2),
        annualEnergyProduction: annualEnergyProduction.toFixed(2),
        co2Savings: co2Savings.toFixed(2),
        annualEarnings: annualEarnings.toFixed(2),
      };
    };

    const calculationResults = calculateResults(area || selectedArea);
    setResults(calculationResults);
  };

  const handleSaveLocation = (locationName) => {
    const newLocation = {
      name: locationName,
      area: selectedArea,
      center: mapCenter,
      polygons: polygons.map((p) => p.path),
      results,
    };
    const updatedLocations = [...savedLocations, newLocation];
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
    alert(`Location "${locationName}" saved successfully!`);
  };

  const handleLoadLocation = (location) => {
    const safeCenter = location.center || { lat: 0, lng: 0 };
    const safePolygons = Array.isArray(location.polygons)
      ? location.polygons
      : [];

    setMapCenter(safeCenter);
    setPolygons(safePolygons.map((path) => ({ path })));
    const totalArea = location.area || 0;
    setSelectedArea(totalArea);
    handleCalculate(totalArea);
    setSelectedTab(0);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              UNICEF Project Alpha Solar Estimator
            </Typography>
          </Toolbar>
        </AppBar>

        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Map" />
          <Tab label="Saved Locations" />
        </Tabs>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
          {selectedTab === 0 && (
            <Grid container spacing={3}>
              {/* Map Area on the Left */}
              <Grid item xs={12} md={5}>
                <Map
                  setSelectedArea={setSelectedArea}
                  center={mapCenter}
                  polygons={polygons}
                />
                <Typography variant="body1" align="center" mt={2}>
                  Selected Area: {selectedArea.toFixed(2)} m²
                </Typography>
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ flex: 1, mr: 1 }}
                    onClick={() => handleCalculate()}
                    disabled={selectedArea === 0} // Disable if no polygon is drawn
                  >
                    Calculate
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ flex: 1 }}
                    onClick={() => {
                      const locationName = prompt(
                        "Enter a name for this location:"
                      );
                      if (locationName) handleSaveLocation(locationName);
                    }}
                    disabled={selectedArea === 0} // Disable if no polygon is drawn
                  >
                    Save Location
                  </Button>
                </Box>
              </Grid>

              {/* Results and Assumptions Section */}
              <Grid item xs={12} md={7}>
                <Results results={results} />
                <Paper variant="outlined" sx={{ p: 3, mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Calculation Algorithm Assumptions
                  </Typography>
                  <Typography variant="body2">
                    The solar capacity estimation algorithm is based on the
                    following assumptions:
                    <ul>
                      <li>
                        <b>Number of Panels:</b> Calculated by dividing the
                        total area by the area required for one solar panel (1.7
                        m² per panel).
                      </li>
                      <li>
                        <b>Daily Energy Production:</b> Determined by
                        multiplying the number of panels by peak sun hours (6
                        hours) and panel efficiency (75%).
                      </li>
                      <li>
                        <b>Annual Energy Production:</b> Daily production
                        multiplied by 365 days.
                      </li>
                      <li>
                        <b>CO₂ Savings:</b> Annual production converted to CO₂
                        savings using a factor of 0.82 kg per kWh.
                      </li>
                      <li>
                        <b>Annual Earnings:</b> Energy production valued at
                        $0.10 per kWh.
                      </li>
                    </ul>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}

          {selectedTab === 1 && (
            <SavedLocations
              savedLocations={savedLocations}
              onLoadLocation={handleLoadLocation}
            />
          )}
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
