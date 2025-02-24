import './styles.css'
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './theme';
import WeightInputScreen from './components/WeightInputScreen'
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <WeightInputScreen />
    </ThemeProvider>
  )
}

export default App