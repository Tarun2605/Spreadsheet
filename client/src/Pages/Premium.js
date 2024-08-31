import React from "react";
import { BackgroundGradientAnimation } from "../Components/ui/background-gradient-animation";
import { EvervaultCard, Icon } from "../Components/ui/evervault-card";
import { BackgroundBeams } from "../Components/ui/background-beams";
import { Meteors } from "../Components/ui/meteors";
import { ShootingStars } from "../Components/ui/shooting-stars";
import StarsBackground from "../Components/ui/stars-background";

export default function Premium() {
    return (
        // <BackgroundGradientAnimation>
        //     <div className="absolute inset-0 flex items-center justify-center z-50 text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl pointer-events-none">
        //         <p className="text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 drop-shadow-2xl">
        //             Gradients X Animations
        //         </p>
        //     </div>
        // </BackgroundGradientAnimation>
        // <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
        //     <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        //     <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        //     <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        //     <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

        //     <EvervaultCard text="hover" />

        //     <h2 className="dark:text-white text-black mt-4 text-sm font-light">
        //         Hover over this card to reveal an awesome effect. Running out of copy
        //         here.
        //     </h2>
        //     <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
        //         Watch me hover
        //     </p>
        // </div>
        // <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        //     <div className="max-w-2xl mx-auto p-4">
        //         <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
        //             Join the waitlist
        //         </h1>
        //         <p></p>
        //         <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        //             Welcome to MailJet, the best transactional email service on the web.
        //             We provide reliable, scalable, and customizable email solutions for
        //             your business. Whether you&apos;re sending order confirmations,
        //             password reset emails, or promotional campaigns, MailJet has got you
        //             covered.
        //         </p>
        //         <input
        //             type="text"
        //             placeholder="hi@manuarora.in"
        //             className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-neutral-700"
        //         />
        //     </div>
        //     <BackgroundBeams />
        // </div>
        // <div className="">
        //     <div className=" w-full relative max-w-xs">
        //         <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        //         <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
        //             <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
        //                 <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     fill="none"
        //                     viewBox="0 0 24 24"
        //                     strokeWidth="1.5"
        //                     stroke="currentColor"
        //                     className="h-2 w-2 text-gray-300"
        //                 >
        //                     <path
        //                         strokeLinecap="round"
        //                         strokeLinejoin="round"
        //                         d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
        //                     />
        //                 </svg>
        //             </div>

        //             <h1 className="font-bold text-xl text-white mb-4 relative z-50">
        //                 Meteors because they&apos;re cool
        //             </h1>

        //             <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
        //                 I don&apos;t know what to write so I&apos;ll just paste something
        //                 cool here. One more sentence because lorem ipsum is just
        //                 unacceptable. Won&apos;t ChatGPT the shit out of this.
        //             </p>

        //             <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
        //                 Explore
        //             </button>

        //             {/* Meaty part - Meteor effect */}
        //             <Meteors number={20} />
        //         </div>
        //     </div>
        // </div>
        <div className="h-[40rem] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
            <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                <span>Shooting Star</span>
                <span className="text-white text-lg font-thin">x</span>
                <span>Star Background</span>
            </h2>
            <ShootingStars />
            <StarsBackground />
        </div>
    );
};
