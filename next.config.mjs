/** @type {import('next').NextConfig} */
const nextConfig = {
  // All visuals are local CSS/SVG — no remote image domains needed.
  async redirects() {
    return [
      {
        source: "/services/ecommerce-website",
        destination: "/services/full-stack-web-development",
        permanent: true,
      },
      {
        source: "/automations",
        destination: "/seo",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
