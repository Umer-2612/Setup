import { createTheme, alpha } from "@mui/material/styles";

// Color system
const PRIMARY = {
  main: "#19570B",
  light: "#2A6B1C",
  dark: "#124308",
  contrastText: "#FFFFFF",
};

const SECONDARY = {
  main: "#EBFFF2",
  light: "#F5FFF8",
  dark: "#D9F2E3",
  contrastText: "#19570B",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9F9F9",
  200: "#F4F4F4",
  300: "#E9E9E9",
  400: "#D9D9D9",
  500: "#999999",
  600: "#666666",
  700: "#333333",
  800: "#1A1A1A",
  900: "#0A0A0A",
  A100: "#D5D5D5",
  A200: "#AAAAAA",
  A400: "#616161",
  A700: "#303030",
};

export const theme = createTheme({
  palette: {
    common: { black: "#000000", white: "#FFFFFF" },
    primary: PRIMARY,
    secondary: SECONDARY,
    grey: GREY,
    text: {
      primary: GREY[900],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
    },
    action: {
      active: GREY[600],
      hover: alpha(GREY[500], 0.08),
      selected: alpha(GREY[500], 0.16),
      disabled: GREY[500],
      disabledBackground: GREY[300],
      focus: alpha(GREY[500], 0.24),
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
    divider: alpha(GREY[500], 0.2),
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.2,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: "0.875rem",
      textTransform: "none",
      lineHeight: 1.75,
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.08)",
    "0px 2px 4px rgba(0, 0, 0, 0.08)",
    "0px 4px 8px rgba(0, 0, 0, 0.08)",
    "0px 8px 16px rgba(0, 0, 0, 0.08)",
    "0px 16px 32px rgba(0, 0, 0, 0.08)",
    "0px 2px 8px rgba(0, 0, 0, 0.06)",
    "0px 4px 16px rgba(0, 0, 0, 0.06)",
    "0px 8px 24px rgba(0, 0, 0, 0.06)",
    "0px 16px 32px rgba(0, 0, 0, 0.06)",
    "0px 20px 40px rgba(0, 0, 0, 0.06)",
    "0px 24px 48px rgba(0, 0, 0, 0.06)",
    "none", // Elevation 12
    "none", // Elevation 13
    "none", // Elevation 14
    "none", // Elevation 15
    "none", // Elevation 16
    "none", // Elevation 17
    "none", // Elevation 18
    "none", // Elevation 19
    "none", // Elevation 20
    "none", // Elevation 21
    "none", // Elevation 22
    "none", // Elevation 23
    "none", // Elevation 24
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
          fontWeight: 600,
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": {
            borderWidth: 1.5,
            backgroundColor: alpha(PRIMARY.main, 0.04),
          },
        },
        text: {
          "&:hover": {
            backgroundColor: alpha(PRIMARY.main, 0.04),
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: GREY[100],
            transition: "all 0.2s ease-in-out",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover": {
              backgroundColor: GREY[200],
              "& fieldset": {
                borderColor: "transparent",
              },
            },
            "&.Mui-focused": {
              backgroundColor: "#FFFFFF",
              "& fieldset": {
                borderWidth: 1.5,
                borderColor: PRIMARY.main,
              },
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)",
          "&:hover": {
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          color: PRIMARY.main,
          fontWeight: 500,
          "&:hover": {
            color: PRIMARY.dark,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          color: GREY[700],
          "&.Mui-focused": {
            color: PRIMARY.main,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: GREY[300],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY.main,
            borderWidth: 1.5,
          },
        },
        input: {
          padding: "12px 16px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: GREY[900],
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: alpha(GREY[500], 0.08),
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 1,
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#FFFFFF",
            "& + .MuiSwitch-track": {
              backgroundColor: PRIMARY.main,
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: `1px solid ${GREY[400]}`,
          backgroundColor: GREY[300],
          opacity: 1,
        },
      },
    },
  },
});
