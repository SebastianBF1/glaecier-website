import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>; the workflow sets PAGES_BASE_PATH=/glaecier-website. Local dev uses "/".
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // /da/ → da/index.html, which GitHub Pages serves without extra config.
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 1080, 1600, 2560],
    imageSizes: [320],
  },
  // Danish is the primary language. In dev "/" redirects here; the static export uses public/index.html instead.
  ...(process.env.NODE_ENV === "development" && {
    async redirects() {
      return [{ source: "/", destination: "/da/", permanent: false }];
    },
  }),
};

export default nextConfig;
