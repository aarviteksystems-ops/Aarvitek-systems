export const SITE_NAME = "Aarvitek Systems";
export const SITE_URL = "https://aarviteksystems.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`;
export const COMPANY_PHONE = "+91 787 090 1336";
export const COMPANY_EMAIL = "aarvitexsystems@gmail.com";
export const SOCIAL_LINKS = [
    // Use placeholders or actual links when available
    "https://facebook.com/aarviteksystems",
    "https://twitter.com/aarviteksystems",
    "https://linkedin.com/company/aarviteksystems",
];

interface MetaOptions {
    title: string;
    description: string;
    url: string;
    image?: string;
    type?: string;
    canonical?: string;
    robots?: string;
}

export function generateMeta({
    title,
    description,
    url,
    image = DEFAULT_OG_IMAGE,
    type = "website",
    canonical,
    robots = "index, follow",
}: MetaOptions) {
    const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
    const canonicalUrl = canonical || fullUrl;

    return [
        { title },
        { name: "description", content: description },
        { name: "robots", content: robots },
        
        // Open Graph
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: fullUrl },
        { property: "og:image", content: image },
        { property: "og:type", content: type },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:locale", content: "en_IN" },
        
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        
        // Canonical
        { tagName: "link", rel: "canonical", href: canonicalUrl },
    ];
}

// JSON-LD Helpers

export function generateJsonLd(schema: any) {
    return {
        tagName: "script",
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify(schema),
        },
    };
}

export function getOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SITE_NAME,
        "url": SITE_URL,
        "logo": `${SITE_URL}/images/logo.png`, // Assuming a logo exists or will exist
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": COMPANY_PHONE,
            "contactType": "customer service",
            "email": COMPANY_EMAIL,
            "areaServed": "IN", // India
            "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": SOCIAL_LINKS
    };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.item.startsWith("http") ? crumb.item : `${SITE_URL}${crumb.item}`
        }))
    };
}
