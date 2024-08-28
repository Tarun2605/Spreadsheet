import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SpreadSheetPage from './Pages/SpreadSheetPage';
import Loginpage from './Pages/Loginpage';
function App() {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
    }}>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/spreadsheet" element={<SpreadSheetPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Box>
  );
}

export default App;
