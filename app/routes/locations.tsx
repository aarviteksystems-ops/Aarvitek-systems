import type { Route } from "./+types/locations";
import { Link } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { generateMeta, generateJsonLd, getBreadcrumbSchema } from "../utils/seo-config";

export function meta({}: Route.MetaArgs) {
    return [
        ...generateMeta({
            title: "Our Office Locations & Localized IT Services | Aarvitek Systems",
            description: "Explore Aarvitek Systems' operations across major Indian tech and business hubs. Delivering custom web development, e-commerce, and creative solutions.",
            url: "/locations",
        }),
        generateJsonLd(getBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Locations", item: "/locations" }
        ]))
    ];
}

interface CityHub {
    slug: string;
    name: string;
    highlight: string;
    tagline: string;
    description: string;
    services: string[];
}

const CITIES: CityHub[] = [
    {
        slug: "bangalore",
        name: "Bangalore (Bengaluru)",
        highlight: "India's Silicon Valley",
        tagline: "High-performance tech & startup software.",
        description: "Powering startups and scale-ups with robust React/Node platforms, scalable e-commerce systems, and advanced cloud integrations.",
        services: ["Web Development", "E-Commerce", "UI/UX Design"]
    },
    {
        slug: "mumbai",
        name: "Mumbai",
        highlight: "Financial Capital",
        tagline: "Enterprise-grade web & security architectures.",
        description: "Delivering secure transactional banking systems, fintech solutions, corporate portals, and enterprise branding.",
        services: ["Enterprise Web", "Cyber Security", "Corporate Branding"]
    },
    {
        slug: "delhi",
        name: "Delhi NCR",
        highlight: "Corporate & Brand Hub",
        tagline: "High-conversion web design & SEO systems.",
        description: "Helping brands, retail enterprises, and services capture market share with lead-generation designs and search authority.",
        services: ["Website Design", "Graphic Design", "Local SEO"]
    },
    {
        slug: "hyderabad",
        name: "Hyderabad",
        highlight: "SaaS & Biotech Center",
        tagline: "Multi-tenant cloud applications & API setups.",
        description: "Engineering multi-tenant dashboards, complex database systems, and custom API layers for modern tech companies.",
        services: ["SaaS Architecture", "API Integration", "Web Portals"]
    },
    {
        slug: "pune",
        name: "Pune",
        highlight: "Engineering & Tech Hub",
        tagline: "Precision design & industrial product catalogs.",
        description: "Supporting manufacturing leaders, automotive partners, and tech firms with corporate portals and UX excellence.",
        services: ["UI/UX Prototyping", "Corporate Portals", "Product Catalogs"]
    },
    {
        slug: "chennai",
        name: "Chennai",
        highlight: "SaaS Export Powerhouse",
        tagline: "Developer-friendly software & video production.",
        description: "Designing modern product interfaces, custom databases, and high-impact marketing videos for SaaS products.",
        services: ["SaaS Development", "Video Editing", "Creative Assets"]
    }
];

export default function Locations() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".locations-animate", {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#020202] text-slate-300 overflow-hidden pt-28 pb-20 relative">
            {/* Background Lights */}
            <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff03_1px,_transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 locations-animate">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
                        <span className="text-xs font-semibold text-purple-200 tracking-wider uppercase">Strategic Regional Footprint</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                        Our Regional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Business Hubs</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                        We deliver customized, high-performance IT solutions tailored to the local market needs of India's leading startup, commercial, and financial ecosystems.
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 locations-animate">
                    {CITIES.map((city) => (
                        <Link
                            key={city.slug}
                            to={`/locations/${city.slug}`}
                            className="group relative rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-purple-500/20 p-8 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(168,85,247,0.05)]"
                        >
                            {/* Accent Glow on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-indigo-600/0 group-hover:from-purple-600/5 group-hover:to-indigo-600/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>

                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                                    {city.highlight}
                                </span>
                                <h2 className="text-2xl font-bold text-white mt-6 group-hover:text-purple-300 transition-colors">
                                    {city.name}
                                </h2>
                                <p className="text-sm font-semibold text-slate-300 mt-2">
                                    {city.tagline}
                                </p>
                                <p className="text-xs text-slate-400 mt-4 leading-relaxed line-clamp-3">
                                    {city.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {city.services.map((svc) => (
                                        <span key={svc} className="text-[9px] font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded text-slate-400">
                                            {svc}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                                    <span>Explore localized services</span>
                                    <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
