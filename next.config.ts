import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.studiodireto.com.br",
      },
      {
        protocol: "https",
        hostname: "xyz.systemprime.com.br",
      },
      {
        protocol: "https",
        hostname: "xyzcoworking.com",
      },
    ],
  },
  reactStrictMode: true,
  async headers() {
    if (process.env.NEXT_PUBLIC_SITE_KEY !== "florianopolis") {
      return [];
    }

    return [
      {
        source: "/:prefix(google)?/tabela-de-precos/:suffix(google)?",
        headers: [{ key: "X-Robots-Tag", value: "googlebot: noindex" }],
      },
    ];
  },
  async rewrites() {
    return [
      // Suporta /google no início: /google, /google/servicos
      {
        source: "/google",
        destination: "/",
      },
      {
        source: "/google/:path*",
        destination: "/:path*",
      },
      // Suporta /google no final: /servicos/google, /servicos/sessao-fotografica/google
      {
        source: "/:path*/google",
        destination: "/:path*",
      },
    ];
  },
  env: {
    NEXT_PUBLIC_SITE_KEY: process.env.NEXT_PUBLIC_SITE_KEY,
  },
};

export default nextConfig;
