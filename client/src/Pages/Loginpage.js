import React, { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { AxiosWrapperContext } from "../Utils/AxiosWrapper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
            toast.success("Success");
            navigate("/home");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
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
                setLoading(false); // Stop loading after the request completes
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
                backgroundColor: "lightblue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: { xs: "90%", sm: "400px" },
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.5s",
                    transform: isLogin ? "translateX(0)" : "translateX(-100%)",
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: "20px", textAlign: "center" }}>
                    {isLogin ? "Login" : "Register"}
                </Typography>

                {!isLogin && (
                    <>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={registerData.name}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "15px" }}
                        />
                    </>
                )}

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={isLogin ? loginData.email : registerData.email}
                    onChange={handleInputChange}
                    sx={{ marginBottom: "15px" }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={isLogin ? loginData.password : registerData.password}
                    onChange={handleInputChange}
                    sx={{ marginBottom: "20px" }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                >
                    {isLogin ? "Login" : "Register"}
                </Button>

                <Button
                    sx={{ marginTop: "10px", textTransform: "none" }}
                    fullWidth
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </Button>
            </Box>
        </Box>
    );
}
