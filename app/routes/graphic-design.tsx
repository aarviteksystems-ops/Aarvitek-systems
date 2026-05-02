import type { Route } from "./+types/graphic-design";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Graphic Design Services - Aarvitek Systems" },
        { name: "description", content: "Professional graphic design and branding solutions." },
    ];
}

export default function GraphicDesign() {
    return (
        <div className="pt-16 min-h-screen">
            <section className="bg-gradient-to-r from-pink-500 to-rose-500 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Graphic Design</h1>
                    <p className="text-xl max-w-3xl mx-auto text-pink-100">
                        Visual storytelling that builds brand identity and connects with your audience.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600">
                                    <span className="font-bold text-xl">1</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Logo & Branding</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Creating memorable logos and comprehensive brand style guides that define your business identity.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600">
                                    <span className="font-bold text-xl">2</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Marketing Materials</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Brochures, flyers, business cards, and social media assets consistent with your brand voice.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600">
                                    <span className="font-bold text-xl">3</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Digital Illustrations</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Custom illustrations and infographics to explain complex concepts visually.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Need a custom design?</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">Our design team is ready to bring your ideas to life. Let's create something specific for your campaign.</p>
                            <Link to="/contact" className="px-8 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors">Contact Our Designers</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
