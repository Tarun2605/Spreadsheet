import React, { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, TextField, Tabs, Tab } from "@mui/material";
import { AxiosWrapperContext } from "../Utils/AxiosWrapper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BackgroundGradientAnimation } from "../Components/ui/background-gradient-animation";
import Typography from "@mui/material/Typography";
export default function AuthPage() {
    const { apiPost } = useContext(AxiosWrapperContext);
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isLogin) {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setRegisterData({ ...registerData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        const url = isLogin ? "api/login" : "api/register";
        const data = isLogin ? loginData : registerData;

        try {
            const response = await apiPost(url, data);
            console.log("Response:", response.data);
            // toast.success("Success");
            navigate("/home");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error("Error:", error.response?.data || error.message);
        }
    };

    const handleForgotPassword = async () => {
        try {
            navigate("/verify-otp");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);

        }
    };

    useEffect(() => {
        const loginByToken = async () => {
            try {
                await apiPost("api/login");
                navigate("/home");
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        loginByToken();
    }, [apiPost, navigate]);

    if (loading) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    width: "100vw",
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
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 0,
                backgroundColor: "transparent",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50px",
                    left: "45%",
                    width: "150px",
                    height: "150px",
                    zIndex: 1,
                    // backgroundColor: "lightblue",
                    opacity: 0.5,
                    borderRadius: "50%",
                }}>
                <img src={require("../Assets/cg logo.png")} alt="logo" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
            </Box>
            <BackgroundGradientAnimation />
            <Box sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                backgroundColor: "transparent",
                position: "absolute"
            }}>

                <Box
                    sx={{
                        width: { xs: "90%", sm: "400px" },
                        padding: "20px",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Tabs
                        value={isLogin ? 0 : 1}
                        onChange={(event, newValue) => setIsLogin(newValue === 0)}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{ marginBottom: "20px" }}
                    >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    <Box
                        sx={{
                            transition: "transform 0.5s",
                        }}
                    >
                        {isLogin ? (
                            <>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: "15px" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: "10px" }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "blue"
                                    }}
                                    onClick={handleForgotPassword}
                                >
                                    Forgot Password?
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleSubmit}
                                    sx={{
                                        marginTop: "10px",
                                    }}
                                >
                                    Login
                                </Button>
                            </>
                        ) : (
                            <>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: "15px" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: "15px" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={registerData.password}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: "20px" }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleSubmit}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
        // </BackgroundGradientAnimation>
    );
}
