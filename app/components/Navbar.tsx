import { Link, NavLink } from "react-router";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }).from(".nav-item", {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4");
    }, { scope: navRef });

    useGSAP(() => {
        if (isOpen && mobileMenuRef.current) {
            gsap.from(mobileMenuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.out"
            });
            gsap.from(".mobile-nav-item", {
                x: -20,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.out",
                delay: 0.1
            });
        }
    }, { dependencies: [isOpen], scope: mobileMenuRef });

    return (
        <nav ref={navRef} className={`fixed w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isScrolled ? '-top-32 opacity-0 pointer-events-none' : 'top-0 opacity-100'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center nav-item">
                        <Link to="/" className="text-2xl font-black tracking-tighter text-white">
                            AARVITEK
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center bg-white/5 px-6 py-2 rounded-full border border-white/10">
                        <NavLink to="/" className={({ isActive }) => `nav-item text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            Home
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => `nav-item text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            About Us
                        </NavLink>

                        <div className="relative group nav-item">
                            <button className="text-sm font-medium text-slate-400 group-hover:text-white flex items-center gap-1 cursor-pointer h-10">
                                Services
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2">
                                    <Link to="/web-development" className="block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors">Web Development</Link>
                                    <Link to="/website-design" className="block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors">Website Design</Link>
                                    <Link to="/graphic-design" className="block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors">Graphic Design</Link>
                                    <Link to="/ecommerce" className="block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors">E-Commerce</Link>
                                    <Link to="/video-editing" className="block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors">Video Editing</Link>
                                </div>
                            </div>
                        </div>
                        
                        <NavLink to="/portfolio" className={({ isActive }) => `nav-item text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            Portfolio
                        </NavLink>
                        <NavLink to="/clients" className={({ isActive }) => `nav-item text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            Clients
                        </NavLink>
                        <NavLink to="/locations" className={({ isActive }) => `nav-item text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            Locations
                        </NavLink>
                    </div>

                    <div className="hidden md:flex items-center nav-item">
                        <Link to="/contact" className="px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                            Book a Call
                        </Link>
                    </div>

                    <div className="flex md:hidden nav-item">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div ref={mobileMenuRef} className="md:hidden">
                {isOpen && (
                    <div className="bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            <Link to="/" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Home</Link>
                            <Link to="/about" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">About Us</Link>
                            <div className="py-2 pl-4">
                                <p className="mobile-nav-item px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Services</p>
                                <Link to="/web-development" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5">Web Development</Link>
                                <Link to="/website-design" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5">Website Design</Link>
                                <Link to="/graphic-design" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5">Graphic Design</Link>
                                <Link to="/ecommerce" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5">E-Commerce</Link>
                                <Link to="/video-editing" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5">Video Editing</Link>
                            </div>
                            <Link to="/portfolio" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Portfolio</Link>
                            <Link to="/clients" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Clients</Link>
                            <Link to="/locations" onClick={() => setIsOpen(false)} className="mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Locations</Link>
                            <div className="mobile-nav-item mt-6">
                                <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]">Book a Call</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
