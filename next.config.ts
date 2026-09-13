import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  assetPrefix: "/_portal_assets",
};

export default nextConfig;
