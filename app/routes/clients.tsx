import type { Route } from "./+types/clients";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Our Clients - Aarvitek Systems" },
        { name: "description", content: "Trusted by leading businesses across industries." },
    ];
}

export default function Clients() {
    return (
        <div className="pt-16 min-h-screen">
            <section className="bg-gradient-to-r from-cyan-600 to-blue-600 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Valued Clients</h1>
                    <p className="text-xl max-w-3xl mx-auto text-cyan-100">
                        We are proud to partner with businesses that are shaping the future.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Trusted by Industry Leaders</h2>
                        <p className="text-gray-600 dark:text-gray-400">From startups to enterprises, we deliver results that matter.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                                <div className="text-2xl font-bold text-gray-400 dark:text-gray-600">CLIENT {i}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to become our next success story?</h2>
                        <Link to="/contact" className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors">Work With Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
