import { useContext, useState } from "react";
import { BackgroundGradientAnimation } from "../Components/ui/background-gradient-animation";
import { Box, TextField, Button } from "@mui/material";
import { AxiosWrapperContext } from "../Utils/AxiosWrapper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState(""); // Set your default email here
    const [isOTPSent, setIsOTPSent] = useState(false);
    const { apiPost } = useContext(AxiosWrapperContext);
    const navigate = useNavigate();
    const handleSendOTP = async () => {
        try {
            const response = await apiPost("api/sendOTP", { email });
            console.log("OTP Sent Response:", response.data);
            toast.success("OTP sent successfully");
            setIsOTPSent(true);
        } catch (error) {
            console.error("Error sending OTP:", error.response?.data || error.message);
            toast.error("Failed to send OTP");
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await apiPost("api/verifyOTP", { email, otp, newPassword });
            console.log("OTP Verification Response:", response.data);
            toast.success("Password changed successfully");
            navigate("/");
        } catch (error) {
            console.error("Error verifying OTP:", error.response?.data || error.message);
            toast.error("Failed to verify OTP");
        }
    };

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
            <BackgroundGradientAnimation />
            <Box
                sx={{
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                    backgroundColor: "transparent",
                    position: "absolute",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "90%", sm: "400px" },
                        padding: "20px",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {!isOTPSent ? (
                        <>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: "16px" }}
                                onClick={handleSendOTP}
                            >
                                Send OTP
                            </Button>
                        </>
                    ) : (
                        <>
                            <TextField
                                label="Enter OTP"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <TextField
                                label="New Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: "16px" }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
