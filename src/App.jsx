// App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, AppBar, Toolbar, Tabs, Tab, Box, Grid, Button, Paper } from '@mui/material';
import Map from './components/Map';
import InputFields from './components/InputFields';
import Results from './components/Results';
import SavedLocations from './components/SavedLocations';
import Footer from './components/Footer';
import calculateResults from './utils/calculations';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [results, setResults] = useState(null);
  const [selectedArea, setSelectedArea] = useState(0);
  const [savedLocations, setSavedLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(storedLocations);
  }, []);

  const handleCalculate = (area) => {
    const calculationResults = calculateResults(area || selectedArea, 10);
    setResults(calculationResults);
  };

  const handleSaveLocation = (locationName) => {
    const newLocation = {
      name: locationName,
      area: selectedArea,
      center: mapCenter,
      polygons: polygons.map(p => p.path),
      results,
    };
    const updatedLocations = [...savedLocations, newLocation];
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
    alert(`Location "${locationName}" saved successfully!`);
  };

  const handleLoadLocation = (location) => {
    const safeCenter = location.center || { lat: 0, lng: 0 };
    const safePolygons = Array.isArray(location.polygons) ? location.polygons : [];

    setMapCenter(safeCenter);
    setPolygons(safePolygons.map(path => ({ path })));
    const totalArea = location.area || 0;
    setSelectedArea(totalArea);
    handleCalculate(totalArea);
    setSelectedTab(0);
  };

  // Define handleTabChange here
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              UNICEF Project Alpha Solar Estimator
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Attach handleTabChange here */}
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
                <Box mt={2} textAlign="center">
                  <Button variant="contained" size="large" onClick={() => handleCalculate()}>
                    Calculate
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      const locationName = prompt("Enter a name for this location:");
                      if (locationName) handleSaveLocation(locationName);
                    }}
                  >
                    Save Location
                  </Button>
                </Box>
              </Grid>

              {/* Facility Details and Results Side-by-Side */}
              <Grid item xs={12} md={7}>
                <Grid container spacing={3}>
                  {/* Facility Details */}
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <InputFields />
                  </Grid>
                  {/* Results */}
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Results results={results} />
                  </Grid>
                </Grid>

                {/* Calculation Algorithm Below Facility Details and Results */}
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Paper variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Calculation Algorithm
                    </Typography>
                    <Typography variant="body2">
                      The solar capacity estimation algorithm works as follows:
                      <ul>
                        <li><b>Number of Panels:</b> Calculated based on the selected area divided by the area required for one solar panel (approx. 1.7 m² per panel).</li>
                        <li><b>Daily Energy Production:</b> Multiplied by the irradiance factor and an efficiency factor (approx. 75%).</li>
                        <li><b>Annual Energy Production:</b> Daily production multiplied by 365 days.</li>
                        <li><b>CO₂ Savings:</b> Estimated by converting the annual production to the equivalent CO₂ savings (approx. 0.82 kg/kWh).</li>
                        <li><b>Annual Earnings:</b> Based on a rate per kWh, approximated at $0.1 per kWh.</li>
                      </ul>
                    </Typography>
                  </Paper>
                </Grid>
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

        {/* <Footer /> */}
      </Box>
    </ThemeProvider>
  );
}

export default App;