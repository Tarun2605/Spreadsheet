import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, CircularProgress, TextField } from '@mui/material';
import { IoPersonAddOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AxiosWrapperContext, clearAuthToken } from '../Utils/AxiosWrapper';
import { useSocket } from '../Utils/SocketWrapper';
import AddUserDialog from '../Components/AddUserDialog';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ExternalSpreadSheet from '../Components/ExternalSpreadSheet';
import { AppContext } from '../Context/AppContext';
import { cellSave, spreadSheetFunctionsThroughPut } from '../Utils/SpreadSheetFunctions';

export default function SpreadSheetPage() {
    const [workBookDetails, setWorkBookDetails] = useState({});
    const [loading, setLoading] = useState(true); // Loading state
    const [isEditingTitle, setIsEditingTitle] = useState(false); // State to toggle edit mode
    const [newTitle, setNewTitle] = useState(''); // State for new title input
    const [roomId, setRoomId] = useState('');
    const { apiGet, apiPut } = useContext(AxiosWrapperContext);
    const { isConnected } = useSocket();
    const location = useLocation();
    const workBookId = location.pathname.split('/')[2];
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { joinRoom } = useSocket();
    const { spreadsheetRef } = useContext(AppContext);
    const navigate = useNavigate();
    useEffect(() => {
        const getWorkBookDetails = async () => {
            try {
                const response = await apiGet(`api/getWorkbook/${workBookId}`);
                setWorkBookDetails(response.data);
                setNewTitle(response.data.title); // Initialize newTitle with the current title
                if (isConnected) {
                    joinRoom(`${response.data.roomId}`);
                    setRoomId(`${response.data.roomId}`);
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

    const handleTitleClick = () => {
        setIsEditingTitle(true);
    };

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleTitleSave = async () => {
        try {
            await apiPut(`api/updateWorkbook/${workBookId}`, { title: newTitle });
            setWorkBookDetails((prev) => ({ ...prev, title: newTitle }));
            setIsEditingTitle(false);
        } catch (error) {
            console.error("Error updating title:", error);
        }
    };

    const handleTitleCancel = () => {
        setNewTitle(workBookDetails.title); // Reset to the previous title
        setIsEditingTitle(false);
    };

    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    {isEditingTitle ? (
                        <Box sx={{ flexGrow: 1 }}>
                            <TextField
                                value={newTitle}
                                onChange={handleTitleChange}
                                onBlur={handleTitleCancel}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleTitleSave();
                                }}
                                autoFocus
                                variant="outlined"
                                size="small"
                                sx={{ width: '100%' }}
                            />
                        </Box>
                    ) : (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, cursor: 'pointer' }}
                            onClick={handleTitleClick}
                        >
                            {workBookDetails.title || "Loading..."}
                        </Typography>
                    )}
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
                        <MenuItem onClick={() => { handleClose(); navigate('/home'); }}>Home</MenuItem>
                        <MenuItem onClick={() => { handleClose(); clearAuthToken(); navigate("/"); }}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <AddUserDialog open={dialogOpen} onClose={handleDialogClose} roomId={roomId} />

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
