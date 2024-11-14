// utils/calculations.js

export default function calculateResults(polygonArea, irradiance) {
  // Example calculation based on dummy logic; adjust as needed
  const numberOfPanels = Math.round(polygonArea / 1.7); // Example: 1.7 sq meters per panel
  const dailyEnergyProduction = (numberOfPanels * irradiance * 0.75).toFixed(2); // Example calculation with efficiency
  const annualEnergyProduction = (dailyEnergyProduction * 365).toFixed(2);
  const co2Savings = (annualEnergyProduction * 0.82).toFixed(2); // Example conversion to CO₂ savings
  const annualEarnings = (annualEnergyProduction * 0.1).toFixed(2); // Assuming $0.1 per kWh

  return {
    numberOfPanels,
    dailyEnergyProduction,
    annualEnergyProduction,
    co2Savings,
    annualEarnings,
  };
}