import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, CircularProgress } from '@mui/material';
import { IoPersonAddOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AxiosWrapperContext } from '../Utils/AxiosWrapper';
import { useSocket } from '../Utils/SocketWrapper';
import AddUserDialog from '../Components/AddUserDialog';
import '../App.css';
import { useLocation } from 'react-router-dom';
import ExternalSpreadSheet from '../Components/ExternalSpreadSheet';
import { AppContext } from '../Context/AppContext';
import { cellSave, spreadSheetFunctionsThroughPut } from '../Utils/SpreadSheetFunctions';


export default function SpreadSheetPage() {
    const [workBookDetails, setWorkBookDetails] = useState({});
    const [loading, setLoading] = useState(true); // Loading state
    const { apiGet } = useContext(AxiosWrapperContext);
    const { isConnected } = useSocket();
    const location = useLocation();
    const workBookId = location.pathname.split('/')[2];
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { joinRoom } = useSocket();
    const { spreadsheetRef } = useContext(AppContext);
    useEffect(() => {
        const getWorkBookDetails = async () => {
            try {
                const response = await apiGet(`api/getWorkbook/${workBookId}`);
                setWorkBookDetails(response.data);
                if (isConnected) {
                    joinRoom(`${response.data.roomId}`);
                }
                if (response.data.timeline.length > 0) {
                    response.data.timeline.forEach((item) => {
                        spreadSheetFunctionsThroughPut(item, spreadsheetRef);
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getWorkBookDetails();
    }, [isConnected, workBookId, joinRoom, apiGet, spreadsheetRef]);


    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {workBookDetails.title || "Loading..."}
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleDialogOpen}
                    >
                        <IoPersonAddOutline style={{ height: '25px', width: '25px' }} />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={handleProfileClick}
                    >
                        <CgProfile style={{ height: '25px', width: '25px' }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Home</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <AddUserDialog open={dialogOpen} onClose={handleDialogClose} />

            <Box sx={{ width: '100%', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <ExternalSpreadSheet roomId={workBookDetails.roomId} workBookId={workBookId} />
                )}
            </Box>
        </Box>
    );
}
