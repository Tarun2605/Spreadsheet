import React, { useContext, useState } from 'react';
import { Box, IconButton, TextField, Typography, Slide, Fade, Button, CircularProgress } from '@mui/material';
import { IoChatbubbleOutline } from "react-icons/io5";
import { AxiosWrapperContext } from '../Utils/AxiosWrapper';
import { TypeAnimation } from 'react-type-animation';

export default function AiChatBot() {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const { apiPost } = useContext(AxiosWrapperContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (!loading) {
            setPrompt('');
            setOpen(false);
        }
    };

    const askQuery = async () => {
        setLoading(true);
        setResponse('');
        try {
            const result = await apiPost("api/askQuery", { prompt: `This is a question asked to you and you must answer in the context of MS-EXCEL only else say it is out of scope. MAX LENGTH: 100 WORDS.${prompt}` });
            // Parse and clean the response
            const cleanResponse = result.data.result.replace(/[*`_~]/g, ''); // Remove extra symbols
            setResponse(cleanResponse);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <IconButton
                style={{ position: 'fixed', bottom: 80, right: 26, zIndex: 1000, width: 50, height: 50, backgroundColor: 'rgba(168, 160, 160,0.1)' }}
                onClick={handleClickOpen}
            >
                <IoChatbubbleOutline />
            </IconButton>

            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <Fade in={open}>
                    <Box
                        style={{
                            position: 'fixed',
                            bottom: 150, // Position it above the icon
                            right: 16,
                            width: 300, // Adjust width as needed
                            padding: '16px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000, // Adjust z-index as needed
                        }}
                    >
                        {
                            loading ? (
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <CircularProgress size={24} />
                                </Box>
                            ) : response && (
                                <Box
                                    sx={{
                                        backgroundColor: 'rgba(168, 160, 160,0.1)',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        marginBottom: '8px',
                                        maxHeight: '150px',
                                        overflowY: 'auto',
                                        '&::-webkit-scrollbar': {
                                            width: '5px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            background: 'transparent',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: 'rgba(168, 160, 160,0.5)',
                                            borderRadius: '24px',
                                        },
                                    }}
                                >
                                    <TypeAnimation
                                        sequence={[response]}
                                        speed={50}
                                        wrapper="Typography"
                                    />
                                </Box>
                            )
                        }

                        {/* Textbox */}
                        <TextField
                            id="outlined-multiline-static"
                            label="Enter text"
                            variant="outlined"
                            fullWidth
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={loading}
                        />

                        {/* Buttons Row */}
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '8px',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={askQuery}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Send'}
                            </Button>

                            <Typography
                                variant="body2"
                                color="primary"
                                onClick={handleClose}
                                style={{ cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
                            >
                                Close
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Slide>
        </Box>
    );
}
