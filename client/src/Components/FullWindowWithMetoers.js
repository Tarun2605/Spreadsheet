import React from "react";
import { Meteors } from "./ui/meteors";
import { Box } from "@mui/material";
// import { Meteors } from "./Meteors"; // Adjust the import path based on your project structure

export function FullWindowWithMeteors() {
    return (
        <Box sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            width: "100vw",
            height: "100vh",

        }}>

            <Meteors number={100} className="absolute inset-0 z-0" />
        </Box>



    );
}
