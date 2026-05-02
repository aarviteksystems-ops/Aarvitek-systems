import type { Route } from "./+types/web-development";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Web Development Services - Aarvitek Systems" },
        { name: "description", content: "Custom web development solutions using the latest technologies." },
    ];
}

export default function WebDevelopment() {
    return (
        <div className="pt-16 min-h-screen">
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Web Development</h1>
                    <p className="text-xl max-w-3xl mx-auto text-blue-100">
                        Building scalable, secure, and high-performance web applications tailored to your business goals.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Engineering Excellence</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                At Aarvitek Systems, we leverage the power of modern frameworks and libraries to create web applications that are robust, fast, and easy to maintain. Whether you need a simple content management system or a complex enterprise platform, we have the expertise to deliver.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {['Full-Stack Development', 'API Design & Integration', 'Cloud Native Solutions', 'Progressive Web Apps (PWA)'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/contact" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">Start Your Project</Link>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Our Tech Stack</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'].map((tech) => (
                                    <div key={tech} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                                        <span className="font-semibold text-gray-800 dark:text-gray-200">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
