/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,
  basePath: isProd ? "/portfolio-website" : "",
  assetPrefix: isProd ? "/portfolio-website/" : "",

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',

  images: {
    unoptimized: true, // FIXME
  },

  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.(md|yml)$/,
      type: "asset/source",
    });
    return cfg;
  },
};

export default nextConfig;
