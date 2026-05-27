import type { Route } from "./+types/about";

import { generateMeta, generateJsonLd, getBreadcrumbSchema } from "../utils/seo-config";

export function meta({ }: Route.MetaArgs) {
    return [
        ...generateMeta({
            title: "About Us - Aarvitek Systems | High-Performance IT & Automation",
            description: "Learn more about Aarvitek Systems, our mission, vision, and the team driving digital transformation through custom web development and AI automation.",
            url: "/about",
        }),
        generateJsonLd({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Aarvitek Systems",
            "description": "Learn more about Aarvitek Systems, our mission, vision, and the team driving digital transformation through custom web development and AI automation."
        }),
        generateJsonLd(getBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "About Us", item: "/about" }
        ]))
    ];
}

export default function About() {
    return (
        <div className="pt-16 min-h-screen">
            <section className="bg-gray-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Aarvitek Systems</h1>
                    <p className="text-xl max-w-3xl mx-auto text-gray-300">
                        Driven by innovation, dedicated to excellence. We are your partners in digital transformation.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team collaborating" className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                At Aarvitek Systems, our mission is to empower businesses of all sizes with accessible, high-quality technology solutions. We believe that digital transformation shouldn't be complicated or prohibitively expensive.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                We strive to bridge the gap between complex technology and practical business needs, delivering results that drive real growth and efficiency for our clients.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Innovation", desc: "Constantly exploring new technologies to solve problems better." },
                            { title: "Integrity", desc: "Transparent, honest, and ethical in all our dealings." },
                            { title: "Customer Success", desc: "Your growth is our primary measure of success." }
                        ].map((value, i) => (
                            <div key={i} className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center hover:-translate-y-1 transition-transform">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
