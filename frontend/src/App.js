import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import theme from './theme';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Results from './pages/Results';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            py: 4
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 