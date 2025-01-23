import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Switch,
  Box,
} from "@mui/material";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Co2Icon from "@mui/icons-material/Co2";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function Results({ results }) {
  const [viewType, setViewType] = useState("yearly"); // yearly or monthly

  const placeholderData = {
    numberOfPanels: "0",
    dailyEnergyProduction: "0",
    annualEnergyProduction: "0",
    co2Savings: "0",
    annualEarnings: "0",
  };

  const data = results || placeholderData;

  const toggleView = () => {
    setViewType(viewType === "yearly" ? "monthly" : "yearly");
  };

  const divisor = viewType === "yearly" ? 1 : 12;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Results ({viewType === "yearly" ? "Yearly" : "Monthly"})
        </Typography>
        <Switch
          checked={viewType === "monthly"}
          onChange={toggleView}
          color="primary"
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <SolarPowerIcon />
              <Typography variant="subtitle1">Solar Panels</Typography>
              <Typography variant="h5">{data.numberOfPanels} panels</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <BatteryChargingFullIcon />
              <Typography variant="subtitle1">Daily Production</Typography>
              <Typography variant="h5">
                {data.dailyEnergyProduction} kWh
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <SolarPowerIcon />
              <Typography variant="subtitle1">Energy Production</Typography>
              <Typography variant="h5">
                {(data.annualEnergyProduction / divisor).toFixed(2)} kWh
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Co2Icon />
              <Typography variant="subtitle1">CO₂ Savings</Typography>
              <Typography variant="h5">
                {(data.co2Savings / divisor).toFixed(2)} kg
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <AttachMoneyIcon />
              <Typography variant="subtitle1">Earnings</Typography>
              <Typography variant="h5">
                ${(data.annualEarnings / divisor).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Results;