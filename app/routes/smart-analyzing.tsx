import type { Route } from "./+types/smart-analyzing";
import { Link } from "react-router";

import { generateMeta, generateJsonLd, getBreadcrumbSchema } from "../utils/seo-config";

export function meta({ }: Route.MetaArgs) {
    return [
        ...generateMeta({
            title: "Smart Analyzing - How We Work | Aarvitek Systems",
            description: "Phase 1 of our process: Understanding your current architecture and future goals through smart analyzing and strategic discovery.",
            url: "/smart-analyzing",
        }),
        generateJsonLd(getBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Smart Analyzing", item: "/smart-analyzing" }
        ]))
    ];
}

export default function SmartAnalyzing() {
    return (
        <div className="pt-16 min-h-screen bg-[#000000] text-slate-300">
            <section className="py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-[100%] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 space-y-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
                                <span className="text-sm font-medium text-purple-200 tracking-wide">Phase 01</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                                Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Analyzing</span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                We begin every project by deeply understanding your current architecture, business objectives, and user needs. Through meticulous data analysis and strategic planning, we architect solutions that are purpose-built for your future goals.
                            </p>
                            <div className="pt-4 flex gap-4">
                                <Link to="/contact" className="px-8 py-4 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]">Consult With Us</Link>
                                <Link to="/" className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all">Back to Home</Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative z-10">
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                                <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src="/images/smart-analyzing.png" alt="Smart Analyzing and Data Strategy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
