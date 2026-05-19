import type { Route } from "./+types/cost-efficient";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Cost Efficient | Aarvitek Systems" },
        { name: "description", content: "Reduce manual labor and server costs through optimized tech stacks." },
    ];
}

export default function CostEfficient() {
    return (
        <div className="pt-16 min-h-screen bg-[#000000] text-slate-300">
            <section className="py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-[100%] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 space-y-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                <span className="text-sm font-medium text-emerald-200 tracking-wide">Business Benefit</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                                Cost <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Efficient</span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                Reduce unnecessary expenses by modernizing your tech stack. Optimized databases, streamlined cloud operations, and automated workflows mean you spend less on server costs and manual labor, massively improving your bottom line.
                            </p>
                            <div className="pt-4 flex gap-4">
                                <Link to="/contact" className="px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]">Optimize Costs</Link>
                                <Link to="/" className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all">Back to Home</Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative z-10">
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                                <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src="/images/continuous-optimization.png" alt="Cost Efficiency and Optimization" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
