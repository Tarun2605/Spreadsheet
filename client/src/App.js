import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SpreadSheetPage from './Pages/SpreadSheetPage';
import Loginpage from './Pages/Loginpage';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import Premium from './Pages/Premium';
import VerifyOTP from './Pages/VerifyOTP';
function App() {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
    }}>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/spreadsheet/:id" element={<SpreadSheetPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
      <ToastContainer
        position="center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Box>
  );
}

export default App;
