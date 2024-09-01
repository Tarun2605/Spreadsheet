import React from "react";
import StarsBackground from "./ui/stars-background";
import { ShootingStars } from "./ui/shooting-stars";
// import ShootingStars from "@/components/ui/shooting-stars";
// import StarsBackground from "@/components/ui/stars-background";

export function FullscreenBackground() {
    return (
        <div className="flex flex-col items-center justify-center absolute inset-0 w-full h-full z-[-1]" style={{
            backgroundColor: "rgb(2, 6, 38)",
        }}>

            <ShootingStars />
            <StarsBackground />
        </div>
    );
}
