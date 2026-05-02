import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Link, NavLink, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("nav", { className: "fixed w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-20 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-2xl font-black tracking-tighter text-white", children: "AARVITEK" }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex space-x-8 items-center bg-white/5 px-6 py-2 rounded-full border border-white/10", children: [
        /* @__PURE__ */ jsx(NavLink, { to: "/", className: ({ isActive }) => `text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-slate-400"}`, children: "Home" }),
        /* @__PURE__ */ jsx(NavLink, { to: "/about", className: ({ isActive }) => `text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-slate-400"}`, children: "About Us" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxs("button", { className: "text-sm font-medium text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer", children: [
            "Services",
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-0 mt-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
            /* @__PURE__ */ jsx(Link, { to: "/web-development", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "Web Development" }),
            /* @__PURE__ */ jsx(Link, { to: "/website-design", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "Website Design" }),
            /* @__PURE__ */ jsx(Link, { to: "/graphic-design", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "Graphic Design" }),
            /* @__PURE__ */ jsx(Link, { to: "/ecommerce", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "E-Commerce" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(NavLink, { to: "/clients", className: ({ isActive }) => `text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-slate-400"}`, children: "Clients" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center", children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]", children: "Book a Call" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex md:hidden", children: /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(!isOpen), className: "text-slate-300 hover:text-white focus:outline-none", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: isOpen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }) })
    ] }) }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-black border-b border-white/10 shadow-2xl", children: /* @__PURE__ */ jsxs("div", { className: "px-4 pt-2 pb-6 space-y-1", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5", children: "Home" }),
      /* @__PURE__ */ jsx(Link, { to: "/about", className: "block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5", children: "About Us" }),
      /* @__PURE__ */ jsxs("div", { className: "py-2 pl-4", children: [
        /* @__PURE__ */ jsx("p", { className: "px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest", children: "Services" }),
        /* @__PURE__ */ jsx(Link, { to: "/web-development", className: "block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5", children: "Web Development" }),
        /* @__PURE__ */ jsx(Link, { to: "/website-design", className: "block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5", children: "Website Design" }),
        /* @__PURE__ */ jsx(Link, { to: "/graphic-design", className: "block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5", children: "Graphic Design" }),
        /* @__PURE__ */ jsx(Link, { to: "/ecommerce", className: "block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5", children: "E-Commerce" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/clients", className: "block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5", children: "Clients" }),
      /* @__PURE__ */ jsx(Link, { to: "/contact", className: "block w-full text-center mt-6 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]", children: "Book a Call" })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-[#050505] pt-24 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative rounded-[2rem] overflow-hidden mb-24", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 opacity-50" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "relative border border-white/10 bg-white/5 backdrop-blur-sm p-12 md:p-20 text-center rounded-[2rem]", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-bold text-white mb-6", children: [
          "Let Aarvitek handle IT so you can ",
          /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "Scale Faster" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-2xl mx-auto mb-10 text-lg", children: "We'll help you automate, build, and optimize your digital presence. Get back to what you do best—growing your business." }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "inline-block px-8 py-4 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]", children: "Book a discovery call" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-1", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "text-3xl font-black tracking-tighter text-white mb-6 block", children: "AARVITEK" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm leading-relaxed mb-8", children: "Empowering businesses with innovative IT solutions. We craft digital experiences that drive growth and success." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsxs("a", { href: "#", className: "w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Facebook" }),
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "#", className: "w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Twitter" }),
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-6", children: "Services" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/web-development", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Web Development" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/website-design", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Website Design" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/graphic-design", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Graphic Design" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/ecommerce", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "E-Commerce Solutions" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-6", children: "Company" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/portfolio", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Portfolio" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/terms", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Terms of Service" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-6", children: "Contact" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-slate-400", children: [
            /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5 text-purple-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "123 Tech Park, Innovation Street,",
              /* @__PURE__ */ jsx("br", {}),
              "Digital City, DC 10001"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm text-slate-400", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-purple-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
            /* @__PURE__ */ jsx("a", { href: "mailto:info@aarvitek.com", className: "hover:text-white transition-colors", children: "info@aarvitek.com" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm text-slate-400", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-purple-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
            /* @__PURE__ */ jsx("a", { href: "tel:+1234567890", className: "hover:text-white transition-colors", children: "+1 (234) 567-8900" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 px-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500 text-center md:text-left", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Aarvitek Systems. All rights reserved."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Inspired by Xtract Framer" })
    ] })
  ] }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "dark scroll-smooth",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx("main", {
        className: "min-h-screen pt-16",
        children
      }), /* @__PURE__ */ jsx(Footer, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta$8({}) {
  return [{
    title: "Aarvitek Systems - Intelligent IT & Automation"
  }, {
    name: "description",
    content: "Empowering businesses with top-tier Web Development, AI Automation, and Design."
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-purple-600/30 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8",
          children: [/* @__PURE__ */ jsx("span", {
            className: "flex h-2 w-2 rounded-full bg-purple-500"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-sm font-medium text-purple-200 tracking-wide",
            children: "New Digital Transformation Services"
          })]
        }), /* @__PURE__ */ jsxs("h1", {
          className: "text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1]",
          children: ["Intelligent Automation", /* @__PURE__ */ jsx("br", {}), "for ", /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
            children: "Modern Businesses"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium",
          children: "We specialize in crafting stunning websites, robust e-commerce platforms, and impactful tech solutions that drive growth and engagement."
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row justify-center gap-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/contact",
            className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
            children: "Get in touch"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/web-development",
            className: "px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all",
            children: "View services"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "py-12 border-y border-white/5 bg-white/[0.02]",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-center text-sm text-slate-500 font-semibold tracking-widest uppercase mb-8",
          children: "Trusted by innovatve companies worldwide"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-opacity duration-500",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "Acme Corp"
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "GlobalTech"
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "Innovate"
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "Stark Ind."
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "Wayne Ent."
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 lg:py-32 relative",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "Our Tech Solutions"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg max-w-2xl mx-auto",
            children: "Comprehensive IT infrastructure custom built for scale and efficiency."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-24",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col md:flex-row items-center gap-12 lg:gap-24",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-full md:w-1/2",
              children: /* @__PURE__ */ jsxs("div", {
                className: "aspect-video bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 rounded-[2rem] flex items-center justify-center relative overflow-hidden group",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors"
                }), /* @__PURE__ */ jsx("svg", {
                  className: "w-24 h-24 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "1",
                    d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  })
                })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full md:w-1/2 space-y-6",
              children: [/* @__PURE__ */ jsx("div", {
                className: "inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium",
                children: "Front-End & Back-End"
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-3xl md:text-4xl font-bold text-white",
                children: "Full-Stack Web Development"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-slate-400 text-lg leading-relaxed",
                children: "We build enterprise-grade, highly scalable web applications leveraging modern architectures. Performance optimization and clean code are at the heart of our engineering."
              }), /* @__PURE__ */ jsx("ul", {
                className: "space-y-3",
                children: ["React & Next.js Ecosystems", "Node.js Microservices", "High Performance & SEO"].map((item, i) => /* @__PURE__ */ jsxs("li", {
                  className: "flex items-center gap-3 text-slate-300",
                  children: [/* @__PURE__ */ jsx("svg", {
                    className: "w-5 h-5 text-purple-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M5 13l4 4L19 7"
                    })
                  }), item]
                }, i))
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-full md:w-1/2",
              children: /* @__PURE__ */ jsxs("div", {
                className: "aspect-video bg-gradient-to-bl from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-[2rem] flex items-center justify-center relative overflow-hidden group",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors"
                }), /* @__PURE__ */ jsx("svg", {
                  className: "w-24 h-24 text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "1",
                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  })
                })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full md:w-1/2 space-y-6",
              children: [/* @__PURE__ */ jsx("div", {
                className: "inline-block px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium",
                children: "UI/UX & Branding"
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-3xl md:text-4xl font-bold text-white",
                children: "Digital Identity & Design"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-slate-400 text-lg leading-relaxed",
                children: "Visually stunning and user-friendly designs that capture your brand essence and convert visitors into loyal customers through intuitive UX journeys."
              }), /* @__PURE__ */ jsxs(Link, {
                to: "/website-design",
                className: "inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition-colors group",
                children: ["Explore our design portfolio", /* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M17 8l4 4m0 0l-4 4m4-4H3"
                  })
                })]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 bg-[#050505] border-y border-white/5",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-center mb-16",
          children: /* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "How we work"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-4 gap-8",
          children: [{
            icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
            title: "Smart Analyzing",
            desc: "Understanding your current architecture and future goals."
          }, {
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
            title: "Agile Development",
            desc: "Iterative building with continuous feedback loops."
          }, {
            icon: "M13 10V3L4 14h7v7l9-11h-7z",
            title: "Seamless Integration",
            desc: "Zero downtime deployment and systems syncing."
          }, {
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            title: "Continuous Optimization",
            desc: "Monitoring, maintenance, and future-proofing."
          }].map((step, idx) => /* @__PURE__ */ jsxs("div", {
            className: "bg-white/5 border border-white/5 rounded-2xl p-8 hover:bg-white/10 transition-colors",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/10",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6 text-white",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: step.icon
                })
              })
            }), /* @__PURE__ */ jsxs("h3", {
              className: "text-xl font-bold text-white mb-3",
              children: ["0", idx + 1, ". ", step.title]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400",
              children: step.desc
            })]
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 lg:py-32",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-center mb-16",
          children: /* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "Why upgrade with Aarvitek?"
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "md:col-span-2 bg-[#050505] border border-white/10 rounded-3xl p-10 relative overflow-hidden group",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] group-hover:bg-purple-500/30 transition-all rounded-full"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-white mb-4 relative z-10",
              children: "Enhanced Productivity"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-lg relative z-10 max-w-md",
              children: "Automating repetitive manual tasks so your team can focus on complex, high-impact strategies."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-[#050505] border border-white/10 rounded-3xl p-10",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-white mb-4",
              children: "Scalability"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400",
              children: "Architecture built to handle massive traffic spikes without sweating."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-[#050505] border border-white/10 rounded-3xl p-10",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-white mb-4",
              children: "Cost Efficient"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400",
              children: "Reduce manual labor and server costs through optimized tech stacks."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "md:col-span-2 bg-[#050505] border border-white/10 rounded-3xl p-10 relative overflow-hidden group",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[80px] group-hover:bg-indigo-500/30 transition-all rounded-full"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-white mb-4 relative z-10",
              children: "24/7 Availability"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-lg relative z-10 max-w-md",
              children: "Our systems run flawlessly around the clock, ensuring business continuity."
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 bg-[#050505] border-y border-white/5",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "Simple, Transparent Pricing"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400",
            children: "Tailored solutions for businesses of all sizes."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto",
          children: [{
            name: "Starter",
            price: "Custom",
            popular: false
          }, {
            name: "Professional",
            price: "Custom",
            popular: true
          }, {
            name: "Enterprise",
            price: "Custom",
            popular: false
          }].map((tier, i) => /* @__PURE__ */ jsxs("div", {
            className: `rounded-3xl p-8 border ${tier.popular ? "border-purple-500 bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative" : "border-white/10 bg-white/5"}`,
            children: [tier.popular && /* @__PURE__ */ jsx("span", {
              className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
              children: "Popular"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-white mb-2",
              children: tier.name
            }), /* @__PURE__ */ jsx("div", {
              className: "text-4xl font-black text-white mb-6",
              children: tier.price
            }), /* @__PURE__ */ jsx("ul", {
              className: "space-y-4 mb-8",
              children: ["Custom Development", "Technical Support", "Monthly Retainer"].map((f, idx) => /* @__PURE__ */ jsxs("li", {
                className: "flex gap-3 text-slate-300 text-sm",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: `w-5 h-5 shrink-0 ${tier.popular ? "text-purple-400" : "text-slate-500"}`,
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M5 13l4 4L19 7"
                  })
                }), f]
              }, idx))
            }), /* @__PURE__ */ jsx("button", {
              className: `w-full py-3 rounded-xl font-semibold transition-colors ${tier.popular ? "bg-purple-600 text-white hover:bg-purple-500" : "bg-white/10 text-white hover:bg-white/20"}`,
              children: "Get a Quote"
            })]
          }, i))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 lg:py-32",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-center mb-16",
          children: /* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "Frequently Asked Questions"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "space-y-4",
          children: [{
            q: "How long does a typical project take?",
            a: "Depending on scale, most initial MVP web applications take between 4 to 8 weeks to launch."
          }, {
            q: "Do you provide ongoing support?",
            a: "Yes, we offer monthly maintenance retainers to keep systems updated, secure, and optimized."
          }, {
            q: "What tech stacks do you specialize in?",
            a: "We primarily work with React, Next.js, Node.js, and modern CSS frameworks like Tailwind."
          }].map((faq, i) => /* @__PURE__ */ jsxs("div", {
            className: "border border-white/10 bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex justify-between items-center",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "font-semibold text-white text-lg",
                children: faq.q
              }), /* @__PURE__ */ jsx("svg", {
                className: "w-5 h-5 text-slate-500 group-hover:text-white transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M19 9l-7 7-7-7"
                })
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-4 text-slate-400 hidden group-hover:block transition-all",
              children: faq.a
            })]
          }, i))
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
function meta$7({}) {
  return [{
    title: "About Us - Aarvitek Systems"
  }, {
    name: "description",
    content: "Learn more about our mission, vision, and the team behind Aarvitek Systems."
  }];
}
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gray-900 text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "About Aarvitek Systems"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-gray-300",
          children: "Driven by innovation, dedicated to excellence. We are your partners in digital transformation."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20",
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("img", {
              src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              alt: "Team collaborating",
              className: "rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold text-gray-900 dark:text-white mb-6",
              children: "Our Mission"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mb-6 leading-relaxed",
              children: "At Aarvitek Systems, our mission is to empower businesses of all sizes with accessible, high-quality technology solutions. We believe that digital transformation shouldn't be complicated or prohibitively expensive."
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mb-6 leading-relaxed",
              children: "We strive to bridge the gap between complex technology and practical business needs, delivering results that drive real growth and efficiency for our clients."
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center mb-12",
          children: /* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-gray-900 dark:text-white mb-4",
            children: "Our Core Values"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8",
          children: [{
            title: "Innovation",
            desc: "Constantly exploring new technologies to solve problems better."
          }, {
            title: "Integrity",
            desc: "Transparent, honest, and ethical in all our dealings."
          }, {
            title: "Customer Success",
            desc: "Your growth is our primary measure of success."
          }].map((value, i) => /* @__PURE__ */ jsxs("div", {
            className: "p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center hover:-translate-y-1 transition-transform",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-3",
              children: value.title
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: value.desc
            })]
          }, i))
        })]
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function meta$6({}) {
  return [{
    title: "Contact Us - Aarvitek Systems"
  }, {
    name: "description",
    content: "Get in touch with us for your web development and design needs."
  }];
}
const contact = UNSAFE_withComponentProps(function Contact() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-blue-600 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "Get In Touch"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-blue-100",
          children: "Have a project in mind? We'd love to hear from you."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-sm",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-bold text-gray-900 dark:text-white mb-6",
              children: "Send us a Message"
            }), /* @__PURE__ */ jsxs("form", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "name",
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Name"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    id: "name",
                    className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                    placeholder: "John Doe"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "email",
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Email"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "email",
                    id: "email",
                    className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                    placeholder: "john@example.com"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "subject",
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  children: "Subject"
                }), /* @__PURE__ */ jsxs("select", {
                  id: "subject",
                  className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                  children: [/* @__PURE__ */ jsx("option", {
                    children: "General Inquiry"
                  }), /* @__PURE__ */ jsx("option", {
                    children: "Project Quote"
                  }), /* @__PURE__ */ jsx("option", {
                    children: "Support"
                  }), /* @__PURE__ */ jsx("option", {
                    children: "Other"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "message",
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  children: "Message"
                }), /* @__PURE__ */ jsx("textarea", {
                  id: "message",
                  rows: 4,
                  className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                  placeholder: "Tell us about your project..."
                })]
              }), /* @__PURE__ */ jsx("button", {
                type: "submit",
                className: "w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/30",
                children: "Send Message"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8 lg:pl-12",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-bold text-gray-900 dark:text-white mb-6",
                children: "Contact Information"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-8",
                children: "We are available during regular business hours to discuss your needs. Reach out to us via email, phone, or visit our office."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 flex-shrink-0",
                  children: /* @__PURE__ */ jsxs("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: [/* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    }), /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    })]
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-bold text-gray-900 dark:text-white",
                    children: "Our Office"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: ["123 Tech Park, Innovation Street", /* @__PURE__ */ jsx("br", {}), "Digital City, DC 10001"]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-bold text-gray-900 dark:text-white",
                    children: "Email Us"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "info@aarvitek.com"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "support@aarvitek.com"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-bold text-gray-900 dark:text-white",
                    children: "Call Us"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "+1 (234) 567-8900"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-500 text-sm",
                    children: "Mon-Fri: 9am - 6pm EST"
                  })]
                })]
              })]
            })]
          })]
        })
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({}) {
  return [{
    title: "Our Clients - Aarvitek Systems"
  }, {
    name: "description",
    content: "Trusted by leading businesses across industries."
  }];
}
const clients = UNSAFE_withComponentProps(function Clients() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-r from-cyan-600 to-blue-600 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "Our Valued Clients"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-cyan-100",
          children: "We are proud to partner with businesses that are shaping the future."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-gray-900 dark:text-white mb-4",
            children: "Trusted by Industry Leaders"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 dark:text-gray-400",
            children: "From startups to enterprises, we deliver results that matter."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-8",
          children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ jsx("div", {
            className: "flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow",
            children: /* @__PURE__ */ jsxs("div", {
              className: "text-2xl font-bold text-gray-400 dark:text-gray-600",
              children: ["CLIENT ", i]
            })
          }, i))
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-20 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 md:p-12 text-center",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
            children: "Ready to become our next success story?"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/contact",
            className: "inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors",
            children: "Work With Us"
          })]
        })]
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: clients,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [{
    title: "Careers - Aarvitek Systems"
  }, {
    name: "description",
    content: "Join our team of innovators and creators."
  }];
}
const career = UNSAFE_withComponentProps(function Career() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-r from-orange-500 to-red-500 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "Join Our Team"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-orange-100",
          children: "Build the future of technology with us. We are always looking for talented individuals."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-12 mb-16",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold text-gray-900 dark:text-white mb-6",
              children: "Why Join Aarvitek?"
            }), /* @__PURE__ */ jsx("ul", {
              className: "space-y-4",
              children: ["Flexible remote work options", "Competitive salary & equity", "Continuous learning budget", "Health & wellness benefits"].map((item, i) => /* @__PURE__ */ jsxs("li", {
                className: "flex items-center gap-3",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-gray-700 dark:text-gray-300",
                  children: item
                })]
              }, i))
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-4",
              children: "Our Culture"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 leading-relaxed",
              children: "We foster a culture of curiosity, collaboration, and ownership. We believe in taking calculated risks and learning from failures."
            })]
          })]
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-8",
          children: "Open Positions"
        }), /* @__PURE__ */ jsx("div", {
          className: "space-y-4",
          children: [{
            title: "Senior React Developer",
            type: "Full-time",
            loc: "Remote"
          }, {
            title: "UI/UX Designer",
            type: "Full-time",
            loc: "Hybrid"
          }, {
            title: "Backend Engineer (Node.js)",
            type: "Contract",
            loc: "Remote"
          }].map((job, i) => /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-blue-500 transition-colors group",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors",
                children: job.title
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400",
                children: [/* @__PURE__ */ jsx("span", {
                  children: job.type
                }), /* @__PURE__ */ jsx("span", {
                  children: "•"
                }), /* @__PURE__ */ jsx("span", {
                  children: job.loc
                })]
              })]
            }), /* @__PURE__ */ jsx(Link, {
              to: "/contact",
              className: "mt-4 md:mt-0 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-center",
              children: "Apply Now"
            })]
          }, i))
        })]
      })
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: career,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [{
    title: "Web Development Services - Aarvitek Systems"
  }, {
    name: "description",
    content: "Custom web development solutions using the latest technologies."
  }];
}
const webDevelopment = UNSAFE_withComponentProps(function WebDevelopment() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "Custom Web Development"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-blue-100",
          children: "Building scalable, secure, and high-performance web applications tailored to your business goals."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold text-gray-900 dark:text-white mb-6",
              children: "Engineering Excellence"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mb-6 leading-relaxed",
              children: "At Aarvitek Systems, we leverage the power of modern frameworks and libraries to create web applications that are robust, fast, and easy to maintain. Whether you need a simple content management system or a complex enterprise platform, we have the expertise to deliver."
            }), /* @__PURE__ */ jsx("ul", {
              className: "space-y-4 mb-8",
              children: ["Full-Stack Development", "API Design & Integration", "Cloud Native Solutions", "Progressive Web Apps (PWA)"].map((item, i) => /* @__PURE__ */ jsxs("li", {
                className: "flex items-center gap-3",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-gray-700 dark:text-gray-300 font-medium",
                  children: item
                })]
              }, i))
            }), /* @__PURE__ */ jsx(Link, {
              to: "/contact",
              className: "inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors",
              children: "Start Your Project"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-6",
              children: "Our Tech Stack"
            }), /* @__PURE__ */ jsx("div", {
              className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
              children: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"].map((tech) => /* @__PURE__ */ jsx("div", {
                className: "p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700",
                children: /* @__PURE__ */ jsx("span", {
                  className: "font-semibold text-gray-800 dark:text-gray-200",
                  children: tech
                })
              }, tech))
            })]
          })]
        })
      })
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: webDevelopment,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "Website Design - Aarvitek Systems"
  }, {
    name: "description",
    content: "Creative and responsive website design services."
  }];
}
const websiteDesign = UNSAFE_withComponentProps(function WebsiteDesign() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-r from-purple-600 to-pink-600 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "Creative Website Design"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-purple-100",
          children: "Crafting visually stunning and user-centric digital experiences that captivate your audience."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-all",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-3",
              children: "Responsive Design"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "We ensure your website looks perfect on every device, from desktops to smartphones, providing a seamless experience for all users."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-all",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-lg flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-3",
              children: "UI/UX Focus"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Our designs are grounded in user experience principles, ensuring intuitive navigation and clear calls-to-action that drive conversions."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-all",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-3",
              children: "Makeover & Redesign"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Already have a site? We can modernize its look and feel, improving performance and aesthetics without losing your core content."
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-16 text-center",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/contact",
            className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors",
            children: "Get a Design Consultation"
          })
        })]
      })
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: websiteDesign,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Graphic Design Services - Aarvitek Systems"
  }, {
    name: "description",
    content: "Professional graphic design and branding solutions."
  }];
}
const graphicDesign = UNSAFE_withComponentProps(function GraphicDesign() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-r from-pink-500 to-rose-500 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "Professional Graphic Design"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-pink-100",
          children: "Visual storytelling that builds brand identity and connects with your audience."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-12",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex gap-4",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600",
                children: /* @__PURE__ */ jsx("span", {
                  className: "font-bold text-xl",
                  children: "1"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold text-gray-900 dark:text-white mb-2",
                  children: "Logo & Branding"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 dark:text-gray-400",
                  children: "Creating memorable logos and comprehensive brand style guides that define your business identity."
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex gap-4",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600",
                children: /* @__PURE__ */ jsx("span", {
                  className: "font-bold text-xl",
                  children: "2"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold text-gray-900 dark:text-white mb-2",
                  children: "Marketing Materials"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 dark:text-gray-400",
                  children: "Brochures, flyers, business cards, and social media assets consistent with your brand voice."
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex gap-4",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600",
                children: /* @__PURE__ */ jsx("span", {
                  className: "font-bold text-xl",
                  children: "3"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold text-gray-900 dark:text-white mb-2",
                  children: "Digital Illustrations"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 dark:text-gray-400",
                  children: "Custom illustrations and infographics to explain complex concepts visually."
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl flex flex-col justify-center items-center text-center",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 dark:text-white mb-6",
              children: "Need a custom design?"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mb-8 max-w-md",
              children: "Our design team is ready to bring your ideas to life. Let's create something specific for your campaign."
            }), /* @__PURE__ */ jsx(Link, {
              to: "/contact",
              className: "px-8 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors",
              children: "Contact Our Designers"
            })]
          })]
        })
      })
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: graphicDesign,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "E-Commerce Solutions - Aarvitek Systems"
  }, {
    name: "description",
    content: "Robust e-commerce platforms to grow your online business."
  }];
}
const ecommerce = UNSAFE_withComponentProps(function Ecommerce() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-r from-green-600 to-teal-600 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "E-Commerce Solutions"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-green-100",
          children: "Launch and scale your online store with powerful, secure, and user-friendly e-commerce platforms."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "border border-green-100 dark:border-green-900 rounded-xl p-6 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-3",
              children: "Shopify Expert Setup"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Get your store up and running quickly with our expert Shopify setup and customization services."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "border border-green-100 dark:border-green-900 rounded-xl p-6 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-3",
              children: "WooCommerce Development"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Turn your WordPress site into a selling machine with a custom WooCommerce integration tailored to your needs."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "border border-green-100 dark:border-green-900 rounded-xl p-6 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-3",
              children: "Custom E-com Platforms"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "For complex requirements, we build bespoke e-commerce solutions using Node.js, Next.js, and Stripe."
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "bg-green-900 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden relative",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "relative z-10",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold mb-4",
              children: "Start Selling Online Today"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-green-100 max-w-2xl mx-auto mb-8",
              children: "Don't let technical hurdles stop your sales. We handle the code so you can focus on your products."
            }), /* @__PURE__ */ jsx(Link, {
              to: "/contact",
              className: "inline-block px-8 py-3 bg-white text-green-800 font-bold rounded-full hover:bg-green-50 transition-colors",
              children: "Launch My Store"
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-500 rounded-full opacity-20 blur-3xl"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-teal-500 rounded-full opacity-20 blur-3xl"
          })]
        })]
      })
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ecommerce,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B2xPDlin.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BvwjPg5_.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": ["/assets/root-DRdDv3gZ.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DytF2S94.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-bVyaMsuU.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-D__fUAPf.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/clients": { "id": "routes/clients", "parentId": "root", "path": "clients", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/clients-DswuvKa9.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/career": { "id": "routes/career", "parentId": "root", "path": "career", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/career-B1S9PgDF.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/web-development": { "id": "routes/web-development", "parentId": "root", "path": "web-development", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/web-development-BHLevdAH.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/website-design": { "id": "routes/website-design", "parentId": "root", "path": "website-design", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/website-design-CJ87NZS3.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/graphic-design": { "id": "routes/graphic-design", "parentId": "root", "path": "graphic-design", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/graphic-design-C-_Cmigo.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/ecommerce": { "id": "routes/ecommerce", "parentId": "root", "path": "ecommerce", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ecommerce-3eN_U28j.js", "imports": ["/assets/chunk-WWGJGFF6-YiCRyqzI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-913bfa2a.js", "version": "913bfa2a", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/clients": {
    id: "routes/clients",
    parentId: "root",
    path: "clients",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/career": {
    id: "routes/career",
    parentId: "root",
    path: "career",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/web-development": {
    id: "routes/web-development",
    parentId: "root",
    path: "web-development",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/website-design": {
    id: "routes/website-design",
    parentId: "root",
    path: "website-design",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/graphic-design": {
    id: "routes/graphic-design",
    parentId: "root",
    path: "graphic-design",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/ecommerce": {
    id: "routes/ecommerce",
    parentId: "root",
    path: "ecommerce",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
