import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Schedule from "./Schedule";
import Prizes from "./Prizes";
import Sponsors from "./Sponsors";
import FAQs from "./FAQs/FAQs";
import Footer from "../Footer";
import LoadingScreen from "./LoadingScreen";
import "./tidal-effects.css";

const REGISTER_URL = "https://tidaltamu.com/register";

const HackathonS26 = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAssetsLoaded = async () => {
            const assetsThatNeedToLoad = [
                "/s26/pebble.gif",
                "/s26/snowman.png",
            ];

            const loadPromises = assetsThatNeedToLoad.map((src) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // Resolve even on error to prevent hanging
                    img.src = src;
                });
            });

            // Wait for all assets to load or timeout after 3 seconds
            const timeoutPromise = new Promise<void>((resolve) =>
                setTimeout(() => resolve(), 3000),
            );

            await Promise.race([Promise.all(loadPromises), timeoutPromise]);

            // Add a small delay before hiding the loading screen for a smoother transition
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        };

        const animationTimer = setTimeout(() => {
            setShouldAnimate(true);
        }, 500); // Delay animation until after loading screen starts fading

        checkAssetsLoaded();

        return () => {
            clearTimeout(animationTimer);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLoading && <LoadingScreen progress={100} />}
            </AnimatePresence>
            <div className="hackathon-s26-container min-h-screen overflow-x-hidden w-full">
                <div
                    className="hero-gradient relative overflow-x-clip overflow-y-hidden"
                    style={{
                        backgroundColor: "#77A5C6",
                    }}
                >
                    <div className="relative z-30">
                        <Navbar
                            dark
                            onMenuToggle={setIsMobileMenuOpen}
                            shouldAnimate={shouldAnimate}
                        />
                    </div>
                    <a
                        href={REGISTER_URL}
                        className={`hidden sm:flex absolute right-4 sm:right-8 z-30 !cursor-pointer transition-all duration-200 ${
                            isMobileMenuOpen
                                ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
                                : "opacity-100"
                        }`}
                        style={{ bottom: "6vh" }}
                    >
                        <div className="snowman-container">
                            <img
                                src="/s26/snowman.png"
                                alt="Register"
                                className="w-20 h-20 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 object-contain opacity-90 hover:opacity-100 transition-opacity duration-200 block cursor-pointer"
                                width={176}
                                height={176}
                                decoding="async"
                            />
                        </div>
                    </a>

                    <div className="relative z-0">
                        <Hero shouldAnimate={shouldAnimate} />
                    </div>
                </div>

                <div
                    className="relative w-full h-28 md:h-48 lg:h-64"
                    aria-hidden="true"
                >
                    <div
                        className="absolute inset-0 -z-10"
                        style={{ backgroundColor: "#77A5C6" }}
                    />
                </div>

                <About />

                <Schedule />

                <Prizes />

                <Sponsors />

                <FAQs />

                <div
                    className="relative z-20"
                    style={{ backgroundColor: "#6fa7cf" }}
                >
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default HackathonS26;
