import { createTheme } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#00CCFF",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: "'Open Sans', sans-serif",
    },
    h6: {
      fontFamily: "'Open Sans', sans-serif",
    }
  },
});

export default theme;
