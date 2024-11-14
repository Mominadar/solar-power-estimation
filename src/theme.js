// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black for primary elements
    },
    secondary: {
      main: '#000000', // Black for secondary elements
    },
    background: {
      default: '#ffffff', // White background
      paper: '#ffffff', // White for paper components
    },
    text: {
      primary: '#000000', // Black text color
      secondary: '#555555', // Dark gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // Prevent uppercase transformation on buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          padding: '8px 16px',
          border: '1px solid #000000', // Black border for buttons
          color: '#000000', // Black text
          backgroundColor: '#ffffff', // White background
          '&:hover': {
            backgroundColor: '#f0f0f0', // Light gray on hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove shadows
          border: '1px solid #e0e0e0', // Light gray border for paper components
        },
      },
    },
  },
});

export default theme;