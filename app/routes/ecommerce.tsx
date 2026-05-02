import type { Route } from "./+types/ecommerce";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "E-Commerce Solutions - Aarvitek Systems" },
        { name: "description", content: "Robust e-commerce platforms to grow your online business." },
    ];
}

export default function Ecommerce() {
    return (
        <div className="pt-16 min-h-screen">
            <section className="bg-gradient-to-r from-green-600 to-teal-600 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">E-Commerce Solutions</h1>
                    <p className="text-xl max-w-3xl mx-auto text-green-100">
                        Launch and scale your online store with powerful, secure, and user-friendly e-commerce platforms.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="border border-green-100 dark:border-green-900 rounded-xl p-6 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Shopify Expert Setup</h3>
                            <p className="text-gray-600 dark:text-gray-400">Get your store up and running quickly with our expert Shopify setup and customization services.</p>
                        </div>
                        <div className="border border-green-100 dark:border-green-900 rounded-xl p-6 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">WooCommerce Development</h3>
                            <p className="text-gray-600 dark:text-gray-400">Turn your WordPress site into a selling machine with a custom WooCommerce integration tailored to your needs.</p>
                        </div>
                        <div className="border border-green-100 dark:border-green-900 rounded-xl p-6 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Custom E-com Platforms</h3>
                            <p className="text-gray-600 dark:text-gray-400">For complex requirements, we build bespoke e-commerce solutions using Node.js, Next.js, and Stripe.</p>
                        </div>
                    </div>

                    <div className="bg-green-900 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden relative">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Start Selling Online Today</h2>
                            <p className="text-green-100 max-w-2xl mx-auto mb-8">
                                Don't let technical hurdles stop your sales. We handle the code so you can focus on your products.
                            </p>
                            <Link to="/contact" className="inline-block px-8 py-3 bg-white text-green-800 font-bold rounded-full hover:bg-green-50 transition-colors">
                                Launch My Store
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-500 rounded-full opacity-20 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-teal-500 rounded-full opacity-20 blur-3xl"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}
