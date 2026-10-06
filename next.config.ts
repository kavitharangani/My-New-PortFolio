import type { NextConfig } from "next";

const repoName = "My-New-PortFolio";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const basePath = isGithubActions ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  // Exposed so plain links to files in /public (e.g. the CV) include the GitHub Pages prefix.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
};

export default nextConfig;
