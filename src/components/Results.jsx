// src/components/Results.js
import React from 'react';
import { Paper, Typography, Grid, Card, CardContent } from '@mui/material';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Co2Icon from '@mui/icons-material/Co2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function Results({ results }) {
  const placeholderData = {
    numberOfPanels: 'xxx',
    dailyEnergyProduction: 'xxx',
    annualEnergyProduction: 'xxx',
    co2Savings: 'xxx',
    annualEarnings: 'xxx',
  };

  const data = results || placeholderData;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Results
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <SolarPowerIcon />
              <Typography variant="subtitle1">Solar Panels</Typography>
              <Typography variant="h5">{data.numberOfPanels}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <BatteryChargingFullIcon />
              <Typography variant="subtitle1">Daily Production</Typography>
              <Typography variant="h5">{data.dailyEnergyProduction} kWh</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <SolarPowerIcon />
              <Typography variant="subtitle1">Annual Production</Typography>
              <Typography variant="h5">{data.annualEnergyProduction} kWh</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Co2Icon />
              <Typography variant="subtitle1">CO₂ Savings</Typography>
              <Typography variant="h5">{data.co2Savings} kg</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <AttachMoneyIcon />
              <Typography variant="subtitle1">Annual Earnings</Typography>
              <Typography variant="h5">${data.annualEarnings}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Results;