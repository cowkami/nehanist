import { createTheme } from '@mui/material/styles';
import { cyan, blueGrey } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FFC107',
    },
    background: {
      default: '#F0F2F5',
      paper: '#fff',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
    },
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: cyan[800],
    },
    secondary: {
      main: '#a5d6a7',
    },
    warning: {
      main: '#ffd740',
    },
    background: {
      default: blueGrey[900],
      paper: blueGrey[700], 
    },
    text: {
      primary: '#fff',
      secondary: '#cccccc',
    },
    mode: 'dark',
  },
});

export { lightTheme, darkTheme };