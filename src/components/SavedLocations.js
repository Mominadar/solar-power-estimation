// src/components/SavedLocations.js
import React from 'react';
import { Paper, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';

function SavedLocations({ savedLocations, onLoadLocation }) {
  const handleDeleteLocation = (index) => {
    const updatedLocations = savedLocations.filter((_, i) => i !== index);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Saved Locations
      </Typography>
      <List>
        {savedLocations.length > 0 ? (
          savedLocations.map((location, index) => (
            <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText
                primary={location.name}
                secondary={`Area: ${location.area.toFixed(2)} m²`}
              />
              <Box>
                <Button variant="outlined" color="primary" onClick={() => onLoadLocation(location)}>
                  Load
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteLocation(index)}
                  sx={{ ml: 1 }}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" align="center">
            No saved locations.
          </Typography>
        )}
      </List>
    </Paper>
  );
}

export default SavedLocations;