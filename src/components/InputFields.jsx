// src/components/InputFields.js
import React from 'react';
import { Box, TextField, Typography, MenuItem, Paper, Grid } from '@mui/material';

function InputFields() {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Facility Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Installation Type"
            variant="outlined"
            defaultValue="Roof Mounted"
          >
            <MenuItem value="Roof Mounted">Roof Mounted</MenuItem>
            <MenuItem value="Ground Mounted">Ground Mounted</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Facility Type"
            variant="outlined"
            defaultValue="School"
          >
            <MenuItem value="School">School</MenuItem>
            <MenuItem value="Health Center">Health Center</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Number of People"
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Operating Hours"
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Current Consumption (kWh/day)"
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Desired Consumption (kWh/day)"
            variant="outlined"
            type="number"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default InputFields;