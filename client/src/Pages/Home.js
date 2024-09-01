import React, { useContext, useEffect, useState } from "react";
import {
    Avatar,
    Box,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import { AxiosWrapperContext } from "../Utils/AxiosWrapper";
import { convertToBase64 } from "../Utils/base64";
import { toast } from "react-toastify";
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { FullWindowWithMeteors } from "../Components/FullWindowWithMetoers";
import { Fullscreen } from "@mui/icons-material";
import { FullscreenBackground } from "../Components/FullScreenBackground";
import { BackgroundGradientAnimation } from "../Components/ui/background-gradient-animation";

export default function Home() {
    const { apiGet, apiPost } = useContext(AxiosWrapperContext);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openCreateWorkbookDialog, setOpenCreateWorkbookDialog] = useState(false);
    const [workbookTitle, setWorkbookTitle] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiGet("api/getUserDetails");
            setUserDetails(response.data);
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (event) => {
        try {
            const file = event.target.files[0];
            if (file) {
                const base64image = await convertToBase64(file);
                console.log("Base64:", base64image);
                const response = await apiPost("api/editUser", { profilePic: base64image });
                console.log("Response:", response.data);
                setUserDetails({ ...userDetails, user: { ...userDetails.user, profilePic: base64image } });
                toast.success("Profile picture updated successfully");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCreateWorkbook = async () => {
        if (workbookTitle.length === 0) {
            toast.error("Workbook title cannot be empty");
            return;
        }
        const response = await apiPost("api/createWorkbook", { title: workbookTitle });
        setOpenCreateWorkbookDialog(false);
        setWorkbookTitle("");
        fetchData();
        toast.success("Workbook created successfully");
    };

    useEffect(() => {
        fetchData();
    }, [apiGet]);

    if (loading) {
        return (
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f0f4f8",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                // padding: "16px",
                overflowY: "hidden",
                overflowX: "hidden",
                "&::-webkit-scrollbar": {
                    width: "0.5em",
                },
                "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.1)",
                    outline: "1px solid slategrey",
                },
                position: "relative",
                zIndex: 0,
            }}
        >
            {/* <FullWindowWithMeteors /> */}
            {/* <FullscreenBackground /> */}
            <BackgroundGradientAnimation />
            <Box
                sx={{
                    // maxWidth: "600px",
                    width: "95%",
                    height: "95%",
                    marginTop: "auto",
                    backgroundColor: "transparent",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,1)",
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    overflow: "hidden",
                    padding: "16px",
                    position: "absolute",
                    zIndex: 1,
                    // position: "absolute",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", sm: "30%" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "16px",
                        // borderRight: { xs: "none", sm: "1px solid #ddd" },
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="avatar-upload"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="avatar-upload">
                        <Avatar
                            sx={{
                                width: { xs: "120px", sm: "300px" },
                                height: { xs: "120px", sm: "300px" },
                                marginBottom: "16px",
                                cursor: "pointer",
                                border: "3px solid #ddd",
                                //position the image in the center
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                //fir the image to the container
                                objectFit: "contain",
                            }}
                            src={`data:image/jpeg;base64,${userDetails?.user?.profilePic}`}
                        />
                    </label>
                    <Typography variant="h6" sx={{ marginBottom: "8px", textAlign: "center", color: "white" }}>
                        {userDetails?.user?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "center", color: "white" }}>
                        {userDetails?.user?.email}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: { xs: "100%", sm: "70%" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        padding: "16px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "60px",
                            backgroundColor: "#f1f1f1",
                            borderRadius: "8px",
                            marginBottom: "16px",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                            "&:hover": {
                                backgroundColor: "#e1e1e1",
                            },
                        }}
                        onClick={() => setOpenCreateWorkbookDialog(true)}
                    >
                        <CiSquarePlus
                            style={{
                                fontSize: "36px",
                                color: "#333",
                            }}
                        />
                        <Typography variant="body1" sx={{ marginLeft: "8px", fontWeight: "bold" }}>
                            Create New Workbook
                        </Typography>
                    </Box>
                    {userDetails?.workbooks?.map((workbook) => (
                        <Box
                            key={workbook._id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "12px",
                                marginBottom: "12px",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                },
                            }}
                            onClick={() => navigate(`/spreadsheet/${workbook._id}`)}
                        >
                            <Typography variant="h6">{workbook.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {new Date(workbook.createdAt).toDateString()}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Dialog
                open={openCreateWorkbookDialog}
                onClose={() => setOpenCreateWorkbookDialog(false)}
            >
                <DialogTitle>Create New Workbook</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Workbook Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={workbookTitle}
                        onChange={(e) => setWorkbookTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateWorkbookDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateWorkbook} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
