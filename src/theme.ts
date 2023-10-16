import { createTheme } from "@mui/material";
import { Components } from "@mui/material/styles";

const createThemeWithPalette = () => createTheme();

const createOverrides = (): Components => ({
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontWeight: 700,
      },
    },
  },
  MuiFormGroup: {
    styleOverrides: {
      root: {
        margin: "0 -0.5rem",
        flexFlow: "row wrap",
      },
    },
  },
  MuiFormControl: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: {
        width: "200px",
        margin: "0.5rem",
      },
    },
  },
  MuiSelect: {
    defaultProps: {
      size: "small",
    },
  },
});

export const defaultTheme = createThemeWithPalette();
defaultTheme.components = createOverrides();

export const darkTheme = createThemeWithPalette();
darkTheme.components = createOverrides();
