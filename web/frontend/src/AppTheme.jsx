import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),
  },

  palette: {
    mode: "light",
    primary: {
      main: "#b37ee7",
    },
    secondary: {
      main: "#cbaade",
    },
    background: {
      default: "#ececec",
    },
  },
  
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1f1f1f",
          color: "#fff",
        },
      },
    },
  },
});

export default theme;
