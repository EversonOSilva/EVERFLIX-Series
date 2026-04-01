import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import NavBar from "./src/components/NavBar/NavBar";
import backgroundImage from './src/img/background.jpg';

import Home from "./src/pages/Home";
import Sobre from "./src/pages/Sobre";
import Cadastro from "./src/pages/Cadastro";
import Lista from "./src/pages/Lista";

const theme = createTheme({
  palette: {
    primary: {
      main: '#E50914',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#000000',
      paper: '#141414',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          overflowX: 'hidden',
        }}
      >
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/cadastro/:id?" element={<Cadastro />} />
            <Route path="/lista" element={<Lista />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;