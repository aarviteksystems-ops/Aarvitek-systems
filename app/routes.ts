import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("clients", "routes/clients.tsx"),
    route("career", "routes/career.tsx"),
    route("web-development", "routes/web-development.tsx"),
    route("website-design", "routes/website-design.tsx"),
    route("graphic-design", "routes/graphic-design.tsx"),
    route("ecommerce", "routes/ecommerce.tsx"),
] satisfies RouteConfig;
