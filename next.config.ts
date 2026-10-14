import type { NextConfig } from "next";

const siteEnv = process.env.SITE_ENV?.trim().toLowerCase();
const isProduction = siteEnv === "production";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    // 60 : image de fond du hero (sous un voile sombre) ; 75 : valeur par défaut.
    qualities: [60, 75],
    // AVIF en priorité (plus léger), WebP sinon.
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // L'ancienne rubrique « Conseils pratiques » est devenue le blog.
    return [
      { source: "/conseils", destination: "/blog", permanent: true },
      { source: "/conseils/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      {
        source: "/:path*",
        // Hors production : noindex sur toutes les réponses (pages, images, fichiers).
        headers: isProduction ? security : [...security, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
