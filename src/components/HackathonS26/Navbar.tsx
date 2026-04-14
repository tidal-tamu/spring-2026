import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaDiscord,
} from "react-icons/fa";

const MAIN_SITE = "https://tidaltamu.com";

type NavLink = {
    title: string;
    path: string;
    isExternal?: boolean;
    disabled?: boolean;
};

const navLinks: NavLink[] = [
    { title: "About", path: "about", isExternal: false },
    { title: "Schedule", path: "schedule", isExternal: false },
    { title: "Prizes", path: "prizes", isExternal: false },
    { title: "Sponsors", path: "sponsors", isExternal: false },
];

interface NavbarProps {
    dark?: boolean;
    onMenuToggle?: (isOpen: boolean) => void;
    shouldAnimate?: boolean;
}

export default function Navbar({ dark = false, onMenuToggle, shouldAnimate = false }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        if (!path.startsWith("/") && !path.startsWith("http")) {
            e.preventDefault();
            const element = document.getElementById(path);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = "100%";
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || "0") * -1);
            }
        }
        onMenuToggle?.(isOpen);
    }, [isOpen, onMenuToggle]);

    return (
        <motion.nav
            className={`absolute top-0 w-full font-mont font-semibold z-[9999] ${
                dark ? "text-white" : "text-black"
            }`}
        >
            <div className="w-full px-6 lg:pl-12 lg:pr-28 py-10 flex items-center justify-between">
                <motion.a
                    href={MAIN_SITE}
                    className="flex items-center !cursor-pointer z-50"
                    initial={{ opacity: 0 }}
                    animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                        duration: 1.8,
                        ease: [0.34, 1.56, 0.64, 1],
                    }}
                >
                    <img
                        src={
                            dark
                                ? "./icons/logos/tidal-white-transparent.png"
                                : "./icons/logos/tidal-newblue.svg"
                        }
                        alt="TIDAL Logo"
                        className="h-6 w-auto !cursor-pointer"
                        width={120}
                        height={24}
                        decoding="async"
                    />
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks
                        .filter((link) => !link.disabled)
                        .map((link) =>
                            link.isExternal ? (
                                <a
                                    key={link.title}
                                    href={link.path}
                                    className={`text-sm lg:text-base transition-all duration-300 font-medium ${
                                        dark
                                            ? "text-gray-200 hover:text-white"
                                            : "text-gray-700 hover:text-[#336699]"
                                    }`}
                                >
                                    {link.title}
                                </a>
                            ) : (
                                <a
                                    key={link.title}
                                    href={`#${link.path}`}
                                    onClick={(e) => handleAnchorClick(e, link.path)}
                                    className={`text-sm lg:text-base transition-all duration-300 font-medium ${
                                        dark
                                            ? "text-gray-200 hover:text-white"
                                            : "text-gray-700 hover:text-[#336699]"
                                    }`}
                                >
                                    {link.title}
                                </a>
                            )
                        )}
                </div>

                <button
                    className={`md:hidden inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg focus:outline-none focus:ring-2 z-50 relative ${
                        dark
                            ? "hover:bg-white/10 focus:ring-white/20"
                            : "hover:bg-gray-100 focus:ring-gray-200"
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    )}
                </button>
            </div>

            <motion.div
                className={`md:hidden fixed inset-0 top-0 left-0 w-full h-screen backdrop-blur-xl z-[9998] ${
                    dark ? "bg-black/20 text-white" : "bg-white/20 text-black"
                }`}
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                    x: isOpen ? "0%" : "100%",
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                    display: isOpen ? "block" : "none",
                }}
            >
                <div className="flex flex-col h-full px-6 py-12">
                    <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                        {navLinks
                            .filter((link) => !link.disabled)
                            .map((link) =>
                                link.isExternal ? (
                                    <a
                                        key={link.title}
                                        href={link.path}
                                        className={`text-2xl transition-all duration-300 font-medium text-center ${
                                            dark
                                                ? "text-gray-300 hover:text-white"
                                                : "text-gray-600 hover:text-[#336699]"
                                        }`}
                                    >
                                        {link.title}
                                    </a>
                                ) : (
                                    <a
                                        key={link.title}
                                        href={`#${link.path}`}
                                        onClick={(e) => {
                                            handleAnchorClick(e, link.path);
                                            setIsOpen(false);
                                        }}
                                        className={`text-2xl transition-all duration-300 font-medium text-center ${
                                            dark
                                                ? "text-gray-300 hover:text-white"
                                                : "text-gray-600 hover:text-[#336699]"
                                        }`}
                                    >
                                        {link.title}
                                    </a>
                                )
                            )}
                    </div>

                    <div className="flex flex-col items-center pb-16">
                        <div className="flex space-x-5">
                            <a
                                href="https://github.com/tidal-tamu/"
                                target="_blank"
                                className={`w-12 h-12 ${
                                    dark
                                        ? "bg-gray-800 hover:bg-[#336699]"
                                        : "bg-gray-200 hover:bg-[#336699]"
                                } rounded-xl flex items-center justify-center transition-all duration-300 group`}
                            >
                                <FaGithub
                                    className={`w-5 h-5 ${
                                        dark
                                            ? "text-gray-400 group-hover:text-white"
                                            : "text-gray-600 group-hover:text-white"
                                    }`}
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/tidaltamu"
                                target="_blank"
                                className={`w-12 h-12 ${
                                    dark
                                        ? "bg-gray-800 hover:bg-[#336699]"
                                        : "bg-gray-200 hover:bg-[#336699]"
                                } rounded-xl flex items-center justify-center transition-all duration-300 group`}
                            >
                                <FaLinkedin
                                    className={`w-5 h-5 ${
                                        dark
                                            ? "text-gray-400 group-hover:text-white"
                                            : "text-gray-600 group-hover:text-white"
                                    }`}
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/tidaltamu/"
                                target="_blank"
                                className={`w-12 h-12 ${
                                    dark
                                        ? "bg-gray-800 hover:bg-[#336699]"
                                        : "bg-gray-200 hover:bg-[#336699]"
                                } rounded-xl flex items-center justify-center transition-all duration-300 group`}
                            >
                                <FaInstagram
                                    className={`w-5 h-5 ${
                                        dark
                                            ? "text-gray-400 group-hover:text-white"
                                            : "text-gray-600 group-hover:text-white"
                                    }`}
                                />
                            </a>
                            <a
                                href="https://discord.gg/eQ8ScamG4H"
                                target="_blank"
                                className={`w-12 h-12 ${
                                    dark
                                        ? "bg-gray-800 hover:bg-[#336699]"
                                        : "bg-gray-200 hover:bg-[#336699]"
                                } rounded-xl flex items-center justify-center transition-all duration-300 group`}
                            >
                                <FaDiscord
                                    className={`w-5 h-5 ${
                                        dark
                                            ? "text-gray-400 group-hover:text-white"
                                            : "text-gray-600 group-hover:text-white"
                                    }`}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.nav>
    );
}
