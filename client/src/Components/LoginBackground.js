import React from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { Box } from "@mui/material";

export default function Premium() {
    return (
        <Box sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            color: "white",
            fontWeight: "bold",
            px: 4,
            fontSize: ["3xl", "4xl", "7xl"],
            textAlign: "center",
            pointerEvents: "none",
            zIndex: -1
        }}>

            <BackgroundGradientAnimation>
            </BackgroundGradientAnimation>
        </Box>
    );
};
