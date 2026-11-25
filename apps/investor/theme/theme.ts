import { createTheme } from '@mui/material/styles';

/**
 * ICICI Pru Investor MUI theme aligned with the global Design System tokens.
 */
export const investorTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#DC6009',
      dark: '#D45008',
      light: '#FFF0E5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#133359',
      light: '#5A728B',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#009966',
      light: '#ECFDF5',
    },
    error: {
      main: '#E24A3D',
      light: '#FDF2F1',
    },
    warning: {
      main: '#B08612',
      light: '#FDF8EC',
    },
    info: {
      main: '#035FD0',
      light: '#E7F1FD',
    },
    text: {
      primary: '#133359',
      secondary: '#435160',
      disabled: '#A1ADBD',
    },
    background: {
      default: '#FFFAF6',
      paper: '#FFFFFF',
    },
    divider: '#D9DEE4',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "var(--font-mulish), 'Mulish', sans-serif",
    h1: { fontSize: '2.25rem', lineHeight: 1.22, fontWeight: 900, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.625rem', lineHeight: 1.31, fontWeight: 900, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.25rem', lineHeight: 1.4, fontWeight: 800 },
    h4: { fontSize: '1rem', lineHeight: 1.5, fontWeight: 800 },
    h5: { fontSize: '0.875rem', lineHeight: 1.43, fontWeight: 800 },
    h6: {
      fontSize: '0.75rem',
      lineHeight: 1.33,
      fontWeight: 800,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    subtitle1: { fontSize: '0.9375rem', lineHeight: 1.6, fontWeight: 600 },
    body1: { fontSize: '0.875rem', lineHeight: 1.57, fontWeight: 500 },
    body2: { fontSize: '0.875rem', lineHeight: 1.57, fontWeight: 700 },
    caption: { fontSize: '0.6875rem', lineHeight: 1.45, fontWeight: 700 },
    button: {
      fontSize: '0.8125rem',
      lineHeight: 1.38,
      fontWeight: 800,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    },
  },
});
