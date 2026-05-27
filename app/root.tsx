import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { getOrganizationSchema, generateJsonLd } from "./utils/seo-config";

export const meta: Route.MetaFunction = () => {
  return [
    { name: "theme-color", content: "#000000" },
    { name: "format-detection", content: "telephone=no" },
    generateJsonLd(getOrganizationSchema()),
  ];
};


export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Dock } from "./components/Dock";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CalendlyModal } from "./components/CalendlyModal";
import { FloatingEnquiryForm } from "./components/FloatingEnquiryForm";
import { useLocation } from "react-router";

export function Layout({ children }: { children: React.ReactNode }) {
  let location;
  try {
    location = useLocation();
  } catch (e) {
    // Falls back if called outside RouterProvider
  }

  const isPromo = location?.pathname === "/promo";

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {!isPromo && <Navbar />}
        <main className={`min-h-screen ${isPromo ? 'pt-0' : 'pt-16'}`}>
          {children}
        </main>
        {!isPromo && <WhatsAppButton />}
        {!isPromo && <CalendlyModal />}
        {!isPromo && <FloatingEnquiryForm />}
        {!isPromo && <Dock />}
        {!isPromo && <Footer />}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
