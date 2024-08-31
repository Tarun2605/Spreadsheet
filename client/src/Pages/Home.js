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
import { useContext, useEffect, useState } from "react";
import { AxiosWrapperContext } from "../Utils/AxiosWrapper";
import { convertToBase64 } from "../Utils/base64";
import { toast } from "react-toastify";
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { alignProperty } from "@mui/material/styles/cssUtils";
import {  Circle, Donut, CircleGrid, Diamond, PolygonCard, Polygon, Star, Cross } from "react-awesome-shapes";
import "./home.css";

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
                    backgroundColor: "lightblue",
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
                zIndex: -2,
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(109.6deg, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%)",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                    width: "0.1rem",
                },
                "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.1)",
                    outline: "1px solid slategrey",
                },
                position: "relative",
            }}
        >
            <Donut
                color="#FEBE10"
                size="300px"
                width={['60px', '50px', '70px', '700px']}
                zIndex={-1}
            />
            
            <Diamond
                color="#018749"
                size="250px"
                zIndex={-1}
            />
            <Circle
            
                color=" #C5630E"
                size={['25px', '25px', '25px', '25px']}
                zIndex={-1}
            /> 
            <CircleGrid
                color="#C04000"
                size="175px"
                zIndex={-1}
            />      

        
            <Box
                sx={{
                    width: "70%",
                    height: "70%",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
                }}
            >
                <Box
                    sx={{
                        width: "50%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
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
                                width: 200,
                                height: 200,
                                marginBottom: "10px",
                                cursor: "pointer",
                                "&:hover": {
                                    "&::after": {
                                        content: "'Add Image'",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                        color: "white",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        fontSize: "14px",
                                    },
                                },
                            }}
                            src={`data:image/jpeg;base64,${userDetails?.user?.profilePic}`}
                        >
                            {userDetails?.user?.name[0]}
                        </Avatar>
                    </label>
                    <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                        {userDetails?.user?.name}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                        {userDetails?.user?.email}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "50%",
                        height: "100%",
                        display: "flex",
                        padding: "20px",
                        flexDirection: "column",
                        alignItems: "center",
                        overflowY: "scroll",
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                        Start a new Project
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100px",
                            backgroundColor: "lightgray",
                            marginBottom: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": {
                                backgroundColor: "lightblue",
                                cursor: "pointer",
                            },
                        }}
                        onClick={() => {
                            setOpenCreateWorkbookDialog(true);
                        }}
                    >
                        <CiSquarePlus
                            style={{
                                fontSize: "50px",
                                cursor: "pointer",
                                color: "black",
                                padding: "10px",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        />
                    </Box>
                    {userDetails?.workbooks?.map((workbook) => (
                        <Box
                            key={workbook._id}
                            sx={{
                                width: "100%",
                                height: "100px",
                                borderRadius: "10px",
                                backgroundColor: "lightgray",
                                marginBottom: "10px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                padding: "10px",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "lightblue",
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => {
                                navigate(`/spreadsheet/${workbook._id}`);
                            }}
                        >
                            <Typography variant="h6" >{workbook.title}</Typography>
                            <Typography variant="caption"  >
                                {new Date(workbook.createdAt).toDateString()}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Dialog open={openCreateWorkbookDialog} onClose={() => setOpenCreateWorkbookDialog(false)}>
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
