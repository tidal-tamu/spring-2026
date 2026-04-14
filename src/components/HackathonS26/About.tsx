import {
    KeyframeOptions,
    animate,
    useInView,
    useIsomorphicLayoutEffect,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ParametricScrollPath from "./ParametricScrollPath";
import gsap from "gsap";

type AnimatedCounterProps = {
    from: number;
    to: number;
    suffix?: string;
    animationOptions?: KeyframeOptions;
    start?: boolean;
};
const AnimatedCounter = ({
    from,
    to,
    suffix = "",
    animationOptions,
    start = true,
}: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);

    // CHANGED: Reduced amount to 0.2 to ensure it triggers easily on mobile
    const inView = useInView(ref, { once: true, amount: 0.2 });

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;

        if (!element) return;
        if (!inView || !start) return;

        element.textContent = String(from) + suffix;

        if (window.matchMedia("(prefers-reduced-motion)").matches) {
            element.textContent = String(to) + suffix;
            return;
        }

        const controls = animate(from, to, {
            duration: 2,
            ease: "easeOut",
            ...animationOptions,
            onUpdate(value) {
                element.textContent = value.toFixed(0) + suffix;
            },
        });

        return () => {
            controls.stop();
        };
    }, [ref, inView, from, to, suffix, start]);

    return (
        <span
            ref={ref}
            style={{
                display: "inline-block",
                minWidth: "3.5em",
                fontVariantNumeric: "tabular-nums",
                minHeight: "1em",
            }}
        />
    );
};
const About = () => {
    const pebbleSkiRef = useRef<HTMLImageElement>(null);
    const revealIndexRef = useRef(-1);
    const revealThresholds = [0.2, 0.35, 0.5, 0.65];
    const [prizesMarkerActive, setPrizesMarkerActive] = useState(false);
    const [secondPrizesMarkerActive, setSecondPrizesMarkerActive] =
        useState(false);
    const [mentorsMarkerActive, setMentorsMarkerActive] = useState(false);
    const [sponsorsMarkerActive, setSponsorsMarkerActive] = useState(false);
    const prizesMarkerProgress = 0.68;
    const secondPrizesMarkerProgress = 0.73;
    const mentorsMarkerProgress = 0.78;
    const sponsorsMarkerProgress = 0.83;

    useEffect(() => {
        if (pebbleSkiRef.current) {
            // Start off-screen (bottom left, diagonally) - position far to the left and down
            gsap.set(pebbleSkiRef.current, {
                x: -window.innerWidth,
                y: window.innerHeight,
                opacity: 0,
            });
        }
    }, []);

    const handleReachEnd = () => {
        if (pebbleSkiRef.current) {
            // Slide in diagonally from bottom left to final position
            gsap.to(pebbleSkiRef.current, {
                x: -120,
                y: 120,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
            });
        }
    };

    const handleLeaveEnd = () => {
        if (pebbleSkiRef.current) {
            // Reverse animation - slide back out to bottom left
            gsap.to(pebbleSkiRef.current, {
                x: -window.innerWidth,
                y: window.innerHeight,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out",
            });
        }
    };

    const handleProgress = (progress: number) => {
        let nextIndex = -1;
        for (let i = 0; i < revealThresholds.length; i++) {
            if (progress >= revealThresholds[i]) {
                nextIndex = i;
            }
        }
        if (nextIndex !== revealIndexRef.current) {
            revealIndexRef.current = nextIndex;
        }
        if (progress >= prizesMarkerProgress && !prizesMarkerActive) {
            setPrizesMarkerActive(true);
        }
        if (progress < prizesMarkerProgress && prizesMarkerActive) {
            setPrizesMarkerActive(false);
        }
        if (
            progress >= secondPrizesMarkerProgress &&
            !secondPrizesMarkerActive
        ) {
            setSecondPrizesMarkerActive(true);
        }
        if (progress < secondPrizesMarkerProgress && secondPrizesMarkerActive) {
            setSecondPrizesMarkerActive(false);
        }
        if (progress >= mentorsMarkerProgress && !mentorsMarkerActive) {
            setMentorsMarkerActive(true);
        }
        if (progress < mentorsMarkerProgress && mentorsMarkerActive) {
            setMentorsMarkerActive(false);
        }
        if (progress >= sponsorsMarkerProgress && !sponsorsMarkerActive) {
            setSponsorsMarkerActive(true);
        }
        if (progress < sponsorsMarkerProgress && sponsorsMarkerActive) {
            setSponsorsMarkerActive(false);
        }
    };

    return (
        <section
            className="relative z-10 w-full overflow-visible pt-32 md:pt-16"
            style={{
                background: "linear-gradient(to bottom, #77a5c6, #79b0cf)",
            }}
        >
            <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    backgroundImage: "url('/s26/SkiSlope.png')",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                }}
                aria-label="Snowy Path"
            />
            <ParametricScrollPath
                onReachEnd={handleReachEnd}
                onLeaveEnd={handleLeaveEnd}
                onProgress={handleProgress}
                pathMarkers={[
                    {
                        id: "last-year-we-had",
                        progress: 0.45,
                        revealWindow: 0.2,
                        offsetX: 200,
                        offsetY: -18,
                        element: (
                            <div
                                className="text-[#3a729b] text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[72px] font-bold leading-tight"
                                style={{ fontFamily: "'Caudex', serif" }}
                            >
                                LAST YEAR WE HAD...
                            </div>
                        ),
                    },
                    {
                        id: "participants-marker",
                        progress: prizesMarkerProgress,
                        revealWindow: 0.1,
                        element: (
                            <div className="flex flex-col items-center">
                                <span
                                    className="text-[#3a729b] text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-normal"
                                    style={{
                                        fontFamily: "'Chelsea Market', cursive",
                                    }}
                                >
                                    <AnimatedCounter
                                        from={0}
                                        to={300}
                                        suffix="+"
                                        start={prizesMarkerActive}
                                    />
                                </span>
                                <span
                                    className="text-[#004272] text-base md:text-lg lg:text-xl mt-1 transform rotate-1"
                                    style={{
                                        fontFamily: "'Pangolin', cursive",
                                    }}
                                >
                                    participants
                                </span>
                            </div>
                        ),
                    },
                    {
                        id: "prizes-marker-2k",
                        progress: secondPrizesMarkerProgress,
                        revealWindow: 0.12,
                        element: (
                            <div className="flex flex-col items-center">
                                <span
                                    className="text-[#3a729b] text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-normal"
                                    style={{
                                        fontFamily: "'Chelsea Market', cursive",
                                    }}
                                >
                                    <AnimatedCounter
                                        from={0}
                                        to={2}
                                        suffix="k+"
                                        start={secondPrizesMarkerActive}
                                    />
                                </span>
                                <span
                                    className="text-[#004272] text-base md:text-lg lg:text-xl mt-1 transform rotate-1"
                                    style={{
                                        fontFamily: "'Pangolin', cursive",
                                    }}
                                >
                                    in prizes
                                </span>
                            </div>
                        ),
                    },
                    {
                        id: "mentors-marker",
                        progress: mentorsMarkerProgress,
                        revealWindow: 0.12,
                        element: (
                            <div className="flex flex-col items-center">
                                <span
                                    className="text-[#3a729b] text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-normal"
                                    style={{
                                        fontFamily: "'Chelsea Market', cursive",
                                    }}
                                >
                                    <AnimatedCounter
                                        from={0}
                                        to={20}
                                        suffix="+"
                                        start={mentorsMarkerActive}
                                    />
                                </span>
                                <span
                                    className="text-[#004272] text-base md:text-lg lg:text-xl mt-1"
                                    style={{
                                        fontFamily: "'Pangolin', cursive",
                                    }}
                                >
                                    mentors
                                </span>
                            </div>
                        ),
                    },
                    {
                        id: "sponsors-marker",
                        progress: sponsorsMarkerProgress,
                        revealWindow: 0.12,
                        element: (
                            <div className="flex flex-col items-center">
                                <span
                                    className="text-[#3a729b] text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-normal"
                                    style={{
                                        fontFamily: "'Chelsea Market', cursive",
                                    }}
                                >
                                    <AnimatedCounter
                                        from={0}
                                        to={10}
                                        suffix="+"
                                        start={sponsorsMarkerActive}
                                    />
                                </span>
                                <span
                                    className="text-[#004272] text-base md:text-lg lg:text-xl mt-1 transform -rotate-2"
                                    style={{
                                        fontFamily: "'Pangolin', cursive",
                                    }}
                                >
                                    sponsors
                                </span>
                            </div>
                        ),
                    },
                ]}
            />

            <div className="relative z-20 w-full min-h-screen px-6 md:px-12 lg:px-20 pb-8 md:pb-12">
                <div className="max-w-4xl relative z-20 -translate-y-[290px] origin-top-left scale-90">
                    <h2
                        className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold leading-tight"
                        id="about"
                        style={{
                            fontFamily: "'Dynapuff', sans-serif",
                            textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                        }}
                    >
                        ABOUT TIDALHACK
                    </h2>

                    <div className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[723px] h-[5px] md:h-[7px] bg-[#b34756] mt-2 mb-6" />

                    <div
                        className="text-white text-lg md:text-xl lg:text-2xl xl:text-[32px] leading-relaxed space-y-4 max-w-3xl backdrop-blur-md bg-white/10 rounded-2xl p-6 md:p-8"
                        style={{
                            textShadow: "0 0 6px #77A5C6",
                        }}
                    >
                        <p style={{ fontFamily: "'Inter', sans-serif" }}>
                            TidalHack Spring 2026 is a{" "}
                            <span className="font-bold">24-hour</span> event for{" "}
                            <span className="font-bold">
                                data science and AI/ML enthusiasts
                            </span>{" "}
                            to build open-ended projects, learn new skills, and
                            have fun with friends.
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif" }}>
                            Enjoy free food, mentorship, and networking with
                            sponsors on{" "}
                            <span className="font-bold">Feb. 7-8th!</span> Check
                            out our{" "}
                            <a href="/hacker-guide.pdf">
                                <span className="font-bold text-[#29608b] hover:text-white transition-colors duration-300">
                                    Hacker Guide
                                </span>
                            </a>{" "}
                            for more info.
                        </p>
                    </div>
                </div>

                <div className="absolute left-4 md:left-8 lg:left-10 bottom-8 md:bottom-12 lg:bottom-16 z-20">
                    <div className="w-[320px] md:w-[420px] lg:w-[520px] xl:w-[620px] transform rotate-[8deg]">
                        <img
                            ref={pebbleSkiRef}
                            src="/s26/Pebble Ski.png"
                            alt="Pebble Skiing"
                            className="w-full h-auto object-contain"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>

                <div className="mt-16 md:mt-24 lg:mt-32 text-center relative z-0" />

                <div className="h-80 md:h-96 lg:h-[32rem]" />
            </div>
        </section>
    );
};

export default About;
