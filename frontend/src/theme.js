import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1', // Indigo/purple main color from image
      light: '#818CF8',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#A5B4FC', // Lighter purple
      light: '#C7D2FE',
      dark: '#818CF8',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
    severity: {
      none: '#E2E8F0',    // Gray for "None"
      mild: '#CBD5E1',    // Light gray for "Mild"
      moderate: '#FCD34D', // Yellow for "Moderate"
      severe: '#EF4444',   // Red for "Severe"
    },
    action: {
      hover: 'rgba(99, 102, 241, 0.04)',
      selected: 'rgba(99, 102, 241, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    question: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#1E293B',
    },
    h1: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '0.9375rem',
          fontWeight: 500,
          boxShadow: 'none',
        },
        contained: {
          backgroundColor: '#6366F1',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#4F46E5',
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: '#E2E8F0',
          color: '#64748B',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.04)',
            borderColor: '#6366F1',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: 'none',
          border: '1px solid #F1F5F9',
          '&:hover': {
            borderColor: '#E2E8F0',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          height: '28px',
          fontSize: '0.875rem',
          fontWeight: 500,
          '&.severity-none': {
            backgroundColor: '#F8FAFC',
            color: '#64748B',
            border: '1px solid #E2E8F0',
          },
          '&.severity-mild': {
            backgroundColor: '#F1F5F9',
            color: '#475569',
          },
          '&.severity-moderate': {
            backgroundColor: '#FEF3C7',
            color: '#92400E',
          },
          '&.severity-severe': {
            backgroundColor: '#FEE2E2',
            color: '#B91C1C',
          },
        },
        label: {
          padding: '0 12px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.04)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          height: '6px',
          backgroundColor: '#F1F5F9',
        },
        bar: {
          borderRadius: '6px',
          backgroundColor: '#6366F1',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: 'none',
          border: '1px solid #F1F5F9',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
            borderColor: '#E2E8F0',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '16px',
          '&.Mui-expanded': {
            minHeight: '48px',
          },
        },
        content: {
          margin: '0',
          '&.Mui-expanded': {
            margin: '0',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderTop: '1px solid #F1F5F9',
        },
      },
    },
  },
});

export default theme; 